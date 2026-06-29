'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminGate from '@/components/admin/AdminGate';
import { useAuth } from '@/context/AuthContext';
import { getFirebaseConfigSummary } from '@/lib/firebase';
import { diagnoseFirestoreAccess, fetchAllNotesAdmin, importLegacyNotes } from '@/lib/notes-store';

export default function AdminNotesClient() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);
  const [checking, setChecking] = useState(false);

  const runDiagnosis = async () => {
    if (!user?.uid) {
      setDiagnosis(null);
      setChecking(false);
      return;
    }
    setChecking(true);
    try {
      const result = await diagnoseFirestoreAccess(user.uid);
      setDiagnosis(result);
    } catch (err) {
      setDiagnosis({
        steps: [{ name: '진단', ok: false, detail: err.message || '실패' }],
        ready: false,
      });
    } finally {
      setChecking(false);
    }
  };

  const load = () => {
    setLoading(true);
    fetchAllNotesAdmin()
      .then(setNotes)
      .catch((err) => setError(err.message || '목록 불러오기 실패'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    runDiagnosis();
  }, [user?.uid]);

  const onImport = async () => {
    if (!confirm('기존 notes.js 8편을 Firestore로 가져올까요?')) return;
    setImporting(true);
    setError('');
    setMessage('');
    try {
      const count = await importLegacyNotes();
      setMessage(`${count}편을 가져왔습니다.`);
      load();
      runDiagnosis();
    } catch (err) {
      const code = err?.code || '';
      if (code === 'permission-denied' || code === 'auth/missing') {
        setError(err.message || 'Firestore 권한 오류');
      } else {
        setError(err.message || '가져오기 실패');
      }
      runDiagnosis();
    } finally {
      setImporting(false);
    }
  };

  const copyUid = async () => {
    if (!user?.uid) return;
    await navigator.clipboard.writeText(user.uid);
    setMessage('Firebase UID를 복사했습니다.');
  };

  const firestoreReady = diagnosis?.ready === true;

  const configSummary = getFirebaseConfigSummary();

  return (
    <AdminGate>
      <div className="admin-notes-toolbar">
        <Link className="btn-primary" href="/admin/notes/new">
          새 노트
        </Link>
        <button
          type="button"
          className="btn-outline"
          onClick={onImport}
          disabled={importing || checking}
        >
          {importing ? '가져오는 중…' : '기존 노트 가져오기'}
        </button>
      </div>

      {message && <p className="note-editor-success">{message}</p>}
      {error && <p className="account-card-error">{error}</p>}

      {user?.uid && (
        <div className="account-card" style={{ marginBottom: 24 }}>
          <div className="account-card-label">Firestore 연결 진단</div>
          <p className="account-card-desc">
            문서 경로: <code>admins/{user.uid}</code>
          </p>
          <p className="account-card-desc">
            전체 상태:{' '}
            {checking
              ? '확인 중… (최대 25초)'
              : firestoreReady
                ? '정상 — 가져오기 가능'
                : diagnosis
                  ? '문제 있음 — 아래 항목 확인'
                  : '대기 중'}
          </p>

          {diagnosis?.steps?.length > 0 && (
            <ul className="account-card-desc" style={{ marginTop: 12, paddingLeft: 20 }}>
              {diagnosis.steps.map((step) => (
                <li key={step.name}>
                  {step.ok ? '✓' : '✗'} {step.name}: {step.detail}
                </li>
              ))}
            </ul>
          )}

          <div className="note-editor-actions" style={{ marginTop: 16 }}>
            <button type="button" className="btn-ghost" onClick={copyUid}>
              UID 복사
            </button>
            <button type="button" className="btn-ghost" onClick={runDiagnosis} disabled={checking}>
              {checking ? '확인 중…' : '권한 다시 확인'}
            </button>
          </div>

          {!firestoreReady && !checking && (
            <ol className="account-card-desc" style={{ marginTop: 16, paddingLeft: 20 }}>
              <li>
                Vercel env가 <strong>Production</strong>에 모두 있는지 확인 후 Redeploy
              </li>
              <li>
                <code>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</code> ={' '}
                <code>{configSummary.expectedAuthDomain || '프로젝트ID.firebaseapp.com'}</code>
              </li>
              <li>Firebase → Authentication → Authorized domains에 배포 도메인 추가</li>
              <li>Firebase → App Check → Firestore 강제 적용이 켜져 있으면 끄기(또는 앱 연동)</li>
              <li>브라우저 개발자도구 → Network → <code>firestore.googleapis.com</code> 요청 상태 확인</li>
              <li>규칙 게시 후 로그아웃 → 재로그인 → 「권한 다시 확인」</li>
            </ol>
          )}
        </div>
      )}

      {loading ? (
        <p className="page-desc">불러오는 중…</p>
      ) : notes.length === 0 ? (
        <p className="account-card-desc">
          Firestore에 노트가 없습니다. 진단이 전부 ✓이면 「기존 노트 가져오기」를 누르세요.
        </p>
      ) : (
        <div className="admin-notes-list">
          {notes.map((note) => (
            <article key={note.id} className="account-card admin-note-row">
              <div>
                <div className="account-card-label">{note.tag}</div>
                <h2 className="account-card-title" style={{ fontSize: 22 }}>
                  {note.title}
                </h2>
                <p className="account-card-desc">
                  {note.date} · {note.published ? '발행' : '초안'}
                </p>
              </div>
              <div className="note-editor-actions">
                <Link className="btn-outline" href={`/admin/notes/${note.id}/edit`}>
                  수정
                </Link>
                {note.published && (
                  <Link className="btn-ghost" href={`/notes/${note.id}`} target="_blank">
                    보기
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminGate>
  );
}
