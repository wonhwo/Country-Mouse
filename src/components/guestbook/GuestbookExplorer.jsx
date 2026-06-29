'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import { useAuth } from '@/context/AuthContext';
import { useGuestbook } from '@/hooks/useGuestbook';
import { submitGuestbookEntry } from '@/lib/guestbook-store';

export default function GuestbookExplorer() {
  const { configured, user, githubLogin, loading: authLoading, error: authError, loginWithGithub } =
    useAuth();
  const { entries, loading } = useGuestbook();
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!githubLogin) return;

    setSubmitting(true);
    setError('');
    setNotice('');

    try {
      await submitGuestbookEntry({ message, githubLogin });
      setMessage('');
      setNotice('남겨 주셔서 감사합니다. 확인 후 공개됩니다.');
    } catch (err) {
      setError(err.message || '등록에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="container-narrow">
        <Reveal>
          <div className="guestbook-form">
            <div className="guestbook-form-head">
              <h2 className="guestbook-form-title">한 줄 남기기</h2>
              <p className="guestbook-form-desc">
                GitHub 로그인 후 작성할 수 있습니다. 승인 후 공개됩니다.
              </p>
            </div>

            {authLoading ? (
              <p className="page-desc">로그인 상태 확인 중…</p>
            ) : !configured ? (
              <p className="page-desc">Firebase 설정이 필요합니다.</p>
            ) : !user ? (
              <>
                {authError && <p className="guestbook-error">{authError}</p>}
                <button className="btn-primary" type="button" onClick={loginWithGithub}>
                  GitHub로 로그인하고 남기기
                </button>
              </>
            ) : (
              <form onSubmit={onSubmit}>
                <p className="guestbook-signed-in">
                  <span className="guestbook-label">작성자</span>
                  <strong>@{githubLogin}</strong>
                </p>
                <label className="guestbook-field">
                  <span className="guestbook-label">메시지</span>
                  <textarea
                    className="guestbook-textarea"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    maxLength={500}
                    rows={4}
                    placeholder="짧게 남겨 주세요"
                    required
                  />
                </label>
                {error && <p className="guestbook-error">{error}</p>}
                {notice && <p className="guestbook-notice">{notice}</p>}
                <button className="btn-primary" type="submit" disabled={submitting}>
                  {submitting ? '등록 중…' : '남기기'}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <div className="guestbook-list">
          {loading ? (
            <p className="page-desc">불러오는 중…</p>
          ) : entries.length === 0 ? (
            <p className="page-desc">아직 공개된 방명록이 없습니다.</p>
          ) : (
            entries.map((entry, i) => (
              <Reveal key={entry.id} delay={i * 50}>
                <article className="guestbook-entry">
                  <div className="guestbook-entry-meta">
                    <span className="guestbook-entry-name">@{entry.name}</span>
                    <span className="guestbook-entry-dot" />
                    <span className="guestbook-entry-date">{entry.date}</span>
                  </div>
                  <p className="guestbook-entry-message">{entry.message}</p>
                </article>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
