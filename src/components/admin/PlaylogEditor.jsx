'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFavorite } from '@/data/favorites';
import { parseLines, formatPlaylogNum, resolvePlaylog } from '@/lib/playlog-utils';
import { fetchPlaylogById, savePlaylog } from '@/lib/playlogs-store';

function linesFromArray(arr = []) {
  return arr.join('\n');
}

export default function PlaylogEditor({ entryId: initialId = '' }) {
  const router = useRouter();
  const isEdit = Boolean(initialId);

  const [num, setNum] = useState('');
  const [id, setId] = useState(initialId);
  const [title, setTitle] = useState('');
  const [dev, setDev] = useState('');
  const [playtime, setPlaytime] = useState('');
  const [icon, setIcon] = useState('');
  const [quote, setQuote] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [sortOrder, setSortOrder] = useState('1');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fillForm = (entry) => {
    setNum(entry.num);
    setId(entry.id || entry.num);
    setTitle(entry.title);
    setDev(entry.dev);
    setPlaytime(entry.playtime);
    setIcon(entry.icon || '');
    setQuote(entry.quote);
    setTagsText(linesFromArray(entry.tags));
    setSortOrder(String(entry.sortOrder ?? (parseInt(entry.num, 10) || 1)));
    setPublished(entry.published ?? true);
  };

  useEffect(() => {
    if (!isEdit) return;

    const legacy = getFavorite(initialId);
    if (legacy) {
      fillForm({ ...legacy, id: legacy.num, published: true });
      setLoading(false);
    }

    fetchPlaylogById(initialId)
      .then((remote) => {
        const entry = resolvePlaylog(remote, initialId, getFavorite);
        if (!entry) {
          if (!legacy) setError('항목을 찾을 수 없습니다.');
          return;
        }
        fillForm(entry);
      })
      .catch((err) => setError(err.message || '불러오기 실패'))
      .finally(() => setLoading(false));
  }, [initialId, isEdit]);

  const onNumChange = (value) => {
    const formatted = formatPlaylogNum(value);
    setNum(formatted);
    if (!isEdit) {
      setId(formatted);
      setSortOrder(String(parseInt(formatted, 10) || 1));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    try {
      const savedId = await savePlaylog({
        id: id || formatPlaylogNum(num),
        num: formatPlaylogNum(num || id),
        title,
        dev,
        playtime,
        icon,
        quote,
        tagsText,
        sortOrder,
        published,
        isEdit,
      });
      setMessage(published ? '저장·공개했습니다.' : '초안으로 저장했습니다.');
      router.push(`/admin/favorites/${savedId}/edit`);
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
        <span>번호 (01, 02…)</span>
        <input value={num} onChange={(e) => onNumChange(e.target.value)} required />
      </label>

      <label className="note-editor-field">
        <span>문서 ID</span>
        <input value={id} readOnly={isEdit} onChange={(e) => setId(formatPlaylogNum(e.target.value))} required />
      </label>

      <label className="note-editor-field">
        <span>게임 제목</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <label className="note-editor-field">
        <span>개발사 · 연도</span>
        <input value={dev} onChange={(e) => setDev(e.target.value)} placeholder="Capcom · 시리즈" required />
      </label>

      <label className="note-editor-field">
        <span>플레이 시간</span>
        <input value={playtime} onChange={(e) => setPlaytime(e.target.value)} placeholder="2000시간+" required />
      </label>

      <label className="note-editor-field">
        <span>아이콘 경로</span>
        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="/assets/favorites/monster-hunter.jpg"
        />
      </label>

      <label className="note-editor-field">
        <span>한 줄 감상</span>
        <textarea value={quote} onChange={(e) => setQuote(e.target.value)} rows={5} required />
      </label>

      <label className="note-editor-field">
        <span>태그 (한 줄에 하나)</span>
        <textarea value={tagsText} onChange={(e) => setTagsText(e.target.value)} rows={3} />
      </label>

      <label className="note-editor-field">
        <span>목록 순서</span>
        <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} min="0" />
      </label>

      <label className="note-editor-check">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        <span>공개 (체크해야 /favorites 에 표시)</span>
      </label>

      <div className="note-editor-actions">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? '저장 중…' : published ? '저장·공개' : '초안 저장'}
        </button>
        {published && (
          <Link className="btn-outline" href="/favorites" target="_blank">
            미리보기
          </Link>
        )}
        <Link className="btn-ghost" href="/admin/favorites">
          목록으로
        </Link>
      </div>
    </form>
  );
}
