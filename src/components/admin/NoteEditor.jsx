'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getNote } from '@/data/notes';
import { blocksToText, formatNoteDate, resolveNote, slugify } from '@/lib/note-utils';
import { fetchNoteBySlug, saveNote } from '@/lib/notes-store';

const TAGS = ['시스템', '전투', '엔진', '노트'];

export default function NoteEditor({ slug: initialSlug = '' }) {
  const router = useRouter();
  const isEdit = Boolean(initialSlug);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState(initialSlug);
  const [tag, setTag] = useState('노트');
  const [excerpt, setExcerpt] = useState('');
  const [date, setDate] = useState(formatNoteDate());
  const [read, setRead] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isEdit) return;

    fetchNoteBySlug(initialSlug)
      .then((remote) => {
        const note = resolveNote(remote, initialSlug, getNote);
        if (!note) {
          setError('노트를 찾을 수 없습니다.');
          return;
        }
        setTitle(note.title);
        setSlug(note.id);
        setTag(note.tag);
        setExcerpt(note.excerpt);
        setDate(note.date);
        setRead(note.read);
        setBodyText(blocksToText(note.body));
        setPublished(note.published);
      })
      .catch((err) => setError(err.message || '불러오기 실패'))
      .finally(() => setLoading(false));
  }, [initialSlug, isEdit]);

  const onTitleChange = (value) => {
    setTitle(value);
    if (!isEdit && !slug) setSlug(slugify(value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    try {
      const savedSlug = await saveNote({
        slug: slug || slugify(title),
        title,
        tag,
        excerpt,
        date,
        read,
        bodyText,
        published,
        isEdit,
      });
      setMessage(published ? '저장·발행했습니다.' : '초안으로 저장했습니다.');
      router.push(`/admin/notes/${savedSlug}/edit`);
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
          value={slug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          required
          readOnly={isEdit}
        />
      </label>

      <div className="note-editor-row">
        <label className="note-editor-field">
          <span>태그</span>
          <select value={tag} onChange={(e) => setTag(e.target.value)}>
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="note-editor-field">
          <span>날짜</span>
          <input value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="note-editor-field">
          <span>분량</span>
          <input value={read} onChange={(e) => setRead(e.target.value)} placeholder="자동" />
        </label>
      </div>

      <label className="note-editor-field">
        <span>요약 (excerpt)</span>
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} required />
      </label>

      <label className="note-editor-field">
        <span>본문</span>
        <textarea
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          rows={16}
          required
          placeholder={'첫 단락은 lead로 표시됩니다.\n\n## 소제목\n\n일반 문단\n\n> 인용문'}
        />
      </label>

      <label className="note-editor-check">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        <span>발행 (체크해야 /notes 에 공개)</span>
      </label>

      <div className="note-editor-actions">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? '저장 중…' : published ? '저장·발행' : '초안 저장'}
        </button>
        {published && slug && (
          <Link className="btn-outline" href={`/notes/${slug}`} target="_blank">
            미리보기
          </Link>
        )}
        <Link className="btn-ghost" href="/admin/notes">
          목록으로
        </Link>
      </div>
    </form>
  );
}
