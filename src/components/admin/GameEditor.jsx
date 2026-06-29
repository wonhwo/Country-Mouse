'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getGame } from '@/data/games';
import { linksToText, resolveGame, slugify } from '@/lib/game-utils';
import { fetchGameById, saveGame } from '@/lib/games-store';

const ENGINE_KEYS = [
  { value: 'unreal', label: 'Unreal' },
  { value: 'unity', label: 'Unity' },
  { value: 'web', label: 'Web' },
];

const STATUSES = [
  { value: 'released', label: '완료/출시' },
  { value: 'dev', label: '개발 중' },
];

function linesFromArray(arr = []) {
  return arr.join('\n');
}

function paragraphsFromArray(arr = []) {
  return arr.join('\n\n');
}

export default function GameEditor({ gameId: initialId = '' }) {
  const router = useRouter();
  const isEdit = Boolean(initialId);

  const [title, setTitle] = useState('');
  const [id, setId] = useState(initialId);
  const [engine, setEngine] = useState('Unreal 5');
  const [engineKey, setEngineKey] = useState('unreal');
  const [status, setStatus] = useState('released');
  const [statusLabel, setStatusLabel] = useState('');
  const [award, setAward] = useState('');
  const [tagline, setTagline] = useState('');
  const [stackText, setStackText] = useState('');
  const [longDescText, setLongDescText] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [started, setStarted] = useState('');
  const [role, setRole] = useState('');
  const [linksText, setLinksText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [screenshotsText, setScreenshotsText] = useState('');
  const [sortOrder, setSortOrder] = useState('0');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fillForm = (game) => {
    setTitle(game.title);
    setId(game.id);
    setEngine(game.engine);
    setEngineKey(game.engineKey);
    setStatus(game.status);
    setStatusLabel(game.statusLabel);
    setAward(game.award || '');
    setTagline(game.tagline);
    setStackText(linesFromArray(game.stack));
    setLongDescText(paragraphsFromArray(game.longDesc));
    setHighlightsText(linesFromArray(game.highlights));
    setStarted(game.started);
    setRole(game.role);
    setLinksText(linksToText(game.links));
    setVideoUrl(game.videoUrl || '');
    setThumbnail(game.thumbnail || '');
    setScreenshotsText(linesFromArray(game.screenshots));
    setSortOrder(String(game.sortOrder ?? 0));
    setPublished(game.published);
  };

  useEffect(() => {
    if (!isEdit) return;

    const legacy = getGame(initialId);
    if (legacy) {
      fillForm({ ...legacy, published: true, sortOrder: 0 });
      setLoading(false);
    }

    fetchGameById(initialId)
      .then((remote) => {
        const game = resolveGame(remote, initialId, getGame);
        if (!game) {
          if (!legacy) setError('게임을 찾을 수 없습니다.');
          return;
        }
        fillForm(game);
      })
      .catch((err) => setError(err.message || '불러오기 실패'))
      .finally(() => setLoading(false));
  }, [initialId, isEdit]);

  const onTitleChange = (value) => {
    setTitle(value);
    if (!isEdit && !id) setId(slugify(value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    try {
      const savedId = await saveGame({
        id: id || slugify(title),
        title,
        engine,
        engineKey,
        status,
        statusLabel,
        award,
        tagline,
        stackText,
        longDescText,
        highlightsText,
        started,
        role,
        linksText,
        videoUrl,
        thumbnail,
        screenshotsText,
        sortOrder,
        published,
        isEdit,
      });
      setMessage(published ? '저장·공개했습니다.' : '초안으로 저장했습니다.');
      router.push(`/admin/games/${savedId}/edit`);
    } catch (err) {
      setError(err.message || '저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="page-desc">불러오는 중…</p>;

  return (
    <form className="note-editor" onSubmit={onSubmit}>
      {error && <p className="account-card-error">{error}</p>}
      {message && <p className="note-editor-success">{message}</p>}

      <label className="note-editor-field">
        <span>제목</span>
        <input value={title} onChange={(e) => onTitleChange(e.target.value)} required />
      </label>

      <label className="note-editor-field">
        <span>slug (URL)</span>
        <input
          value={id}
          onChange={(e) => setId(slugify(e.target.value))}
          required
          readOnly={isEdit}
        />
      </label>

      <div className="note-editor-row">
        <label className="note-editor-field">
          <span>엔진 표시</span>
          <input value={engine} onChange={(e) => setEngine(e.target.value)} required />
        </label>
        <label className="note-editor-field">
          <span>필터</span>
          <select value={engineKey} onChange={(e) => setEngineKey(e.target.value)}>
            {ENGINE_KEYS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label className="note-editor-field">
          <span>상태</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="note-editor-row">
        <label className="note-editor-field">
          <span>상태 라벨</span>
          <input
            value={statusLabel}
            onChange={(e) => setStatusLabel(e.target.value)}
            placeholder="완료 · 엑스포 시연"
            required
          />
        </label>
        <label className="note-editor-field">
          <span>시작</span>
          <input value={started} onChange={(e) => setStarted(e.target.value)} />
        </label>
        <label className="note-editor-field">
          <span>목록 순서</span>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            min="0"
          />
        </label>
      </div>

      <label className="note-editor-field">
        <span>한 줄 소개 (tagline)</span>
        <textarea value={tagline} onChange={(e) => setTagline(e.target.value)} rows={2} required />
      </label>

      <label className="note-editor-field">
        <span>수상 · 성과</span>
        <input value={award} onChange={(e) => setAward(e.target.value)} />
      </label>

      <label className="note-editor-field">
        <span>역할</span>
        <input value={role} onChange={(e) => setRole(e.target.value)} required />
      </label>

      <label className="note-editor-field">
        <span>스택 (한 줄에 하나)</span>
        <textarea value={stackText} onChange={(e) => setStackText(e.target.value)} rows={3} />
      </label>

      <label className="note-editor-field">
        <span>상세 설명 (단락은 빈 줄로 구분)</span>
        <textarea value={longDescText} onChange={(e) => setLongDescText(e.target.value)} rows={8} />
      </label>

      <label className="note-editor-field">
        <span>하이라이트 (한 줄에 하나)</span>
        <textarea
          value={highlightsText}
          onChange={(e) => setHighlightsText(e.target.value)}
          rows={5}
        />
      </label>

      <label className="note-editor-field">
        <span>링크 (한 줄에 라벨|URL)</span>
        <textarea
          value={linksText}
          onChange={(e) => setLinksText(e.target.value)}
          rows={3}
          placeholder="Steam|https://..."
        />
      </label>

      <label className="note-editor-field">
        <span>YouTube URL</span>
        <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
      </label>

      <label className="note-editor-field">
        <span>썸네일 경로</span>
        <input
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="/assets/games/.../thumbnail.jpg"
        />
      </label>

      <label className="note-editor-field">
        <span>스크린샷 경로 (한 줄에 하나)</span>
        <textarea
          value={screenshotsText}
          onChange={(e) => setScreenshotsText(e.target.value)}
          rows={4}
        />
      </label>

      <label className="note-editor-check">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        <span>공개 (체크해야 /games 에 표시)</span>
      </label>

      <div className="note-editor-actions">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? '저장 중…' : published ? '저장·공개' : '초안 저장'}
        </button>
        {published && id && (
          <Link className="btn-outline" href={`/games/${id}`} target="_blank">
            미리보기
          </Link>
        )}
        <Link className="btn-ghost" href="/admin/games">
          목록으로
        </Link>
      </div>
    </form>
  );
}
