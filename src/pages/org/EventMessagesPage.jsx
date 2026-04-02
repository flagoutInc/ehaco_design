import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { orgEvents } from '../../data/orgDummy';

const sentMessages = [
  { id: 1, subject: '開催日時変更のお知らせ', body: '参加者の皆様\n\nいつもお世話になっております。本イベントの開催日時が以下の通り変更となりましたのでお知らせいたします。\n\n変更前: 4月15日（水）14:00〜16:00\n変更後: 4月16日（木）14:00〜16:00\n\nご迷惑をおかけいたしますが、何卒よろしくお願いいたします。', sentAt: '2026年4月10日 14:30', recipients: 147 },
  { id: 2, subject: '参加URLのご案内', body: '参加者の皆様\n\n明日開催のセミナーの参加URLをお送りいたします。\n\nZoom URL: https://zoom.us/j/xxxxxxxxx\nパスコード: 123456\n\n開始10分前からご入室いただけます。当日のご参加をお待ちしております。', sentAt: '2026年4月14日 9:00', recipients: 147 },
];

export default function EventMessagesPage() {
  const { id } = useParams();
  const event = orgEvents.find((e) => String(e.id) === id) || orgEvents[0];
  const [tab, setTab] = useState('compose');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [expandedMsg, setExpandedMsg] = useState(null);

  const inputClass = 'w-full rounded-lg border border-ehaco-border bg-white px-4 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition';

  return (
    <div className="fade-in">
      <div className="mb-6">
        <Link to={`/org/events/${id}/edit`} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          イベント編集に戻る
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4 mb-2">参加者への連絡</h1>
      <p className="text-sm text-muted pl-5 mb-6">{event.title}</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[{ key: 'compose', label: '新規作成' }, { key: 'history', label: '送信履歴' }].map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
              tab === t.key ? 'bg-accent text-white shadow-sm' : 'bg-white text-muted ring-1 ring-ehaco-border hover:ring-accent/30 hover:text-accent'
            }`}>{t.label}</button>
        ))}
      </div>

      {/* Compose */}
      {tab === 'compose' && (
        <div className="max-w-3xl">
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 md:p-8 space-y-5">
            <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
              <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <p className="text-sm text-ehaco-text">送信先: <span className="font-bold">{event.applicants}名</span>の申込者全員</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ehaco-text mb-1.5">件名</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass} placeholder="例）開催日時変更のお知らせ" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ehaco-text mb-1.5">本文</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} className={`${inputClass} min-h-[200px] resize-none`} placeholder="参加者に伝えたい内容を入力" />
            </div>
            <div className="flex justify-end">
              <button onClick={() => alert('メールを送信しました')}
                className="inline-flex items-center gap-2 btn-gradient font-medium text-sm px-6 py-2.5 rounded-lg shadow-sm transition cursor-pointer active:scale-[0.97]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                送信
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {tab === 'history' && (
        <div className="max-w-3xl">
          {sentMessages.length > 0 ? (
            <div className="space-y-3">
              {sentMessages.map((msg) => (
                <div key={msg.id} className="bg-white rounded-xl ring-1 ring-ehaco-border/50 overflow-hidden">
                  <button onClick={() => setExpandedMsg(expandedMsg === msg.id ? null : msg.id)}
                    className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-gray-50 transition cursor-pointer">
                    <div>
                      <p className="font-bold text-base text-ehaco-text">{msg.subject}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted">
                        <span>{msg.sentAt}</span>
                        <span>{msg.recipients}名に送信</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-medium text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full">送信済み</span>
                      <svg className={`w-4 h-4 text-muted transition-transform ${expandedMsg === msg.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </button>
                  {expandedMsg === msg.id && (
                    <div className="px-5 pb-5 border-t border-ehaco-border">
                      <pre className="text-sm text-ehaco-text whitespace-pre-wrap leading-relaxed mt-4 bg-ehaco-bg rounded-lg p-4">{msg.body}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-12 text-center">
              <p className="font-bold text-lg text-ehaco-text mb-2">送信履歴はありません</p>
              <p className="text-sm text-muted">参加者にメールを送信すると、ここに履歴が表示されます</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
