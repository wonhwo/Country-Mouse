'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminGate from '@/components/admin/AdminGate';
import { FAVORITES } from '@/data/favorites';
import { fetchAllPlaylogsAdmin, importLegacyPlaylogs } from '@/lib/playlogs-store';

export default function AdminPlaylogsClient() {
  const [playlogs, setPlaylogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    fetchAllPlaylogsAdmin()
      .then(setPlaylogs)
      .catch((err) => {
        const code = err?.code || '';
        if (code === 'permission-denied') {
          setError(
            'Firestore 권한 오류입니다. Firebase 콘솔 → 규칙 탭에서 playlogs 가 포함된 firestore.rules 를 게시하세요.',
          );
        } else {
          setError(err.message || '목록 불러오기 실패');
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const onImport = async () => {
    if (!confirm(`기존 favorites.js ${FAVORITES.length}개를 Firestore로 가져올까요?`)) return;
    setImporting(true);
    setError('');
    setMessage('');
    try {
      const count = await importLegacyPlaylogs();
      setMessage(`${count}개를 가져왔습니다.`);
      load();
    } catch (err) {
      const code = err?.code || '';
      if (code === 'permission-denied') {
        setError(
          'Firestore 권한 오류입니다. Firebase 콘솔 규칙에 playlogs 컬렉션이 포함된 firestore.rules 를 게시하세요.',
        );
      } else {
        setError(err.message || '가져오기 실패');
      }
    } finally {
      setImporting(false);
    }
  };

  return (
    <AdminGate>
      <div className="admin-notes-toolbar">
        <Link className="btn-primary" href="/admin/favorites/new">
          새 항목
        </Link>
        <button type="button" className="btn-outline" onClick={onImport} disabled={importing}>
          {importing ? '가져오는 중…' : '기존 플레이 로그 가져오기'}
        </button>
      </div>

      {message && <p className="note-editor-success">{message}</p>}
      {error && <p className="account-card-error">{error}</p>}

      {loading ? (
        <p className="page-desc">불러오는 중…</p>
      ) : playlogs.length === 0 ? (
        <p className="account-card-desc">
          Firestore에 항목이 없습니다. 「기존 플레이 로그 가져오기」 또는 「새 항목」으로 시작하세요.
        </p>
      ) : (
        <div className="admin-notes-list">
          {playlogs.map((entry) => (
            <article key={entry.id} className="account-card admin-note-row">
              <div>
                <div className="account-card-label">{entry.num}</div>
                <h2 className="account-card-title" style={{ fontSize: 22 }}>
                  {entry.title}
                </h2>
                <p className="account-card-desc">
                  {entry.dev} · {entry.published ? '공개' : '비공개'}
                </p>
              </div>
              <div className="note-editor-actions">
                <Link className="btn-outline" href={`/admin/favorites/${entry.id}/edit`}>
                  수정
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminGate>
  );
}
