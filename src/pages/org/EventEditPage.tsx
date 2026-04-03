import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orgEvents } from '../../data/orgDummy';

export default function EventEditPage() {
  const { id } = useParams<{ id: string }>();
  const event = orgEvents.find((e) => String(e.id) === id) || orgEvents[0];

  const [form, setForm] = useState({
    eventName: event.title,
    date: event.date,
    deadline: event.deadline,
    eventImagePreview: event.image || '',
  });

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      set('eventImagePreview', URL.createObjectURL(file));
    }
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      '公開中': 'bg-green-100 text-green-700 border-green-200',
      '公開前': 'bg-blue-100 text-blue-700 border-blue-200',
      '終了': 'bg-gray-100 text-gray-500 border-gray-200',
      '下書き': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles['下書き']}`}
      >
        {status}
      </span>
    );
  };

  const sectionClass =
    'bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-6 md:p-8 space-y-5';
  const labelClass = 'block text-sm font-medium text-ehaco-text mb-1.5';
  const inputClass =
    'w-full rounded-lg border border-ehaco-border bg-white px-4 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition';

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">
            イベント編集
          </h1>
          <p className="text-sm text-muted mt-2 pl-5">
            {event.eventNo} - {event.title}
          </p>
        </div>
        <Link to={`/org/events/${id}/preview`}
          className="shrink-0 self-start sm:self-auto inline-flex items-center gap-2 border border-ehaco-border text-ehaco-text text-sm font-medium px-4 py-2 rounded-lg hover:border-accent hover:text-accent transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          プレビュー
        </Link>
      </div>

      <div className="space-y-6">
        {/* 1. 基本情報 */}
        <section className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text flex items-center gap-2">
            <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            基本情報
          </h2>

          <div>
            <label className={labelClass}>イベント名</label>
            <input
              type="text"
              className={inputClass}
              value={form.eventName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('eventName', e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>開催日時</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-muted mb-1 block">開催日</span>
                <input
                  type="text"
                  className={inputClass}
                  value={form.date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('date', e.target.value)}
                />
              </div>
              <div>
                <span className="text-xs text-muted mb-1 block">申込締切</span>
                <input
                  type="text"
                  className={inputClass}
                  value={form.deadline}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('deadline', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>イベント画像</label>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-ehaco-border rounded-xl py-8 cursor-pointer hover:border-accent/50 transition group">
              {form.eventImagePreview ? (
                <img
                  src={form.eventImagePreview}
                  alt="プレビュー"
                  className="max-h-40 rounded-lg object-contain"
                />
              ) : (
                <>
                  <svg
                    className="w-10 h-10 text-muted/50 group-hover:text-accent transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 16v-8m-4 4h8m5 4V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z"
                    />
                  </svg>
                  <span className="text-sm text-muted">クリックして画像をアップロード</span>
                </>
              )}
              <span className="text-xs text-muted/50">推奨サイズ: 1,100px x 339px</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </section>

        {/* 2. チケット情報 */}
        <section className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text flex items-center gap-2">
            <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
            </svg>
            チケット情報
          </h2>

          {event.tickets.length > 0 ? (
            <div className="space-y-3">
              {event.tickets.map((ticket, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 ring-1 ring-ehaco-border/50 rounded-xl"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ehaco-text">{ticket.name}</p>
                    <p className="text-xs text-muted mt-0.5">定員: {ticket.capacity}名</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-ehaco-text">
                      定員 {ticket.capacity}名
                    </p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted">
                合計定員: {event.tickets.reduce((sum, t) => sum + t.capacity, 0)}名 / 申込者数: {event.applicants}名
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted">チケットが設定されていません</p>
          )}
        </section>

        {/* 3. ステータス */}
        <section className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text flex items-center gap-2">
            <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ステータス
          </h2>

          <div className="flex items-center gap-4">
            <div>
              <span className="text-sm text-muted mr-3">現在のステータス:</span>
              {statusBadge(event.status)}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {['下書き', '公開前', '公開中', '終了'].map((s) => (
              <button
                key={s}
                className={`text-xs font-medium px-4 py-2 rounded-lg border transition ${
                  s === event.status
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-ehaco-border text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* 参加者への連絡 */}
        <Link to={`/org/events/${id}/messages`}
          className="flex items-center justify-between p-5 bg-white rounded-2xl ring-1 ring-ehaco-border/50 hover:shadow-md transition group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-sm text-ehaco-text group-hover:text-accent transition">参加者への連絡</p>
              <p className="text-xs text-muted">申込者にメールを送信・送信履歴を確認</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-muted group-hover:text-accent transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </Link>

        {/* Bottom actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 pb-8">
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-3 border border-ehaco-border hover:border-accent hover:text-accent rounded-lg shadow-sm text-sm font-semibold text-ehaco-text transition"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={() => { alert('保存しました'); window.location.hash = '/org/events'; }}
            className="w-full sm:w-auto px-8 py-3 btn-gradient shadow-sm rounded-lg text-sm font-semibold transition cursor-pointer active:scale-[0.97]"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
