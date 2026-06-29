'use client';

import { useEffect, useState } from 'react';
import AdminGate from '@/components/admin/AdminGate';
import {
  deleteGuestbookEntry,
  fetchAllGuestbookAdmin,
  setGuestbookApproved,
} from '@/lib/guestbook-store';

export default function AdminGuestbookClient() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busyId, setBusyId] = useState(null);

  const load = () => {
    setLoading(true);
    fetchAllGuestbookAdmin()
      .then(setEntries)
      .catch((err) => setError(err.message || '목록 불러오기 실패'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const onApprove = async (id, approved) => {
    setBusyId(id);
    setError('');
    setMessage('');
    try {
      await setGuestbookApproved(id, approved);
      setMessage(approved ? '공개했습니다.' : '비공개로 바꿨습니다.');
      load();
    } catch (err) {
      setError(err.message || '저장 실패');
    } finally {
      setBusyId(null);
    }
  };

  const onDelete = async (id) => {
    if (!confirm('이 방명록을 삭제할까요?')) return;
    setBusyId(id);
    setError('');
    setMessage('');
    try {
      await deleteGuestbookEntry(id);
      setMessage('삭제했습니다.');
      load();
    } catch (err) {
      setError(err.message || '삭제 실패');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminGate>
      {error && <p className="account-card-error">{error}</p>}
      {message && <p className="guestbook-notice">{message}</p>}

      {loading ? (
        <p className="page-desc">불러오는 중…</p>
      ) : entries.length === 0 ? (
        <p className="page-desc">방명록이 없습니다.</p>
      ) : (
        <div className="admin-notes-list">
          {entries.map((entry) => (
            <article key={entry.id} className="admin-note-row account-card">
              <div>
                <div className="account-card-label">{entry.date || '날짜 없음'}</div>
                <h2 className="account-card-title">{entry.name}</h2>
                <p className="account-card-desc">{entry.message}</p>
                <p className="account-card-desc">
                  상태: {entry.approved ? '공개' : '승인 대기'}
                  {entry.githubLogin ? ` · @${entry.githubLogin}` : ''}
                </p>
              </div>
              <div className="account-card-actions">
                {!entry.approved ? (
                  <button
                    className="btn-primary account-card-action"
                    type="button"
                    disabled={busyId === entry.id}
                    onClick={() => onApprove(entry.id, true)}
                  >
                    공개
                  </button>
                ) : (
                  <button
                    className="btn-outline account-card-action"
                    type="button"
                    disabled={busyId === entry.id}
                    onClick={() => onApprove(entry.id, false)}
                  >
                    비공개
                  </button>
                )}
                <button
                  className="btn-ghost account-card-action"
                  type="button"
                  disabled={busyId === entry.id}
                  onClick={() => onDelete(entry.id)}
                >
                  삭제
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminGate>
  );
}
