import { Link, useParams } from 'react-router-dom';
import { events } from '../data/dummy';

export default function ApplyCompletePage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id)) || events[0];

  return (
    <div className="min-h-screen bg-ehaco-bg pb-12 fade-in">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text mb-3">
          お申し込みが完了しました
        </h1>
        <p className="text-muted mb-8">
          確認メールをご登録のメールアドレスに送信しました。<br />
          当日のご参加をお待ちしております。
        </p>

        {/* Event summary card */}
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 mb-8 text-left">
          <div className="flex gap-4 items-start mb-4">
            <img src={event.image} alt={event.title} className="w-24 h-[4.5rem] rounded-lg object-cover flex-shrink-0" />
            <div className="min-w-0">
              <h2 className="font-bold text-ehaco-text line-clamp-2 leading-snug">{event.title}</h2>
              <p className="text-sm text-muted mt-1">{event.organizer}</p>
            </div>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
            <dt className="font-medium text-muted">日時</dt>
            <dd className="text-ehaco-text">{event.date}</dd>
            <dt className="font-medium text-muted">会場</dt>
            <dd className="text-ehaco-text">{event.location}</dd>
            <dt className="font-medium text-muted">受付番号</dt>
            <dd className="text-ehaco-text font-mono">EH-2026-{String(Math.floor(Math.random() * 9000 + 1000))}</dd>
          </dl>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/mypage/events"
            className="btn-gradient font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.97] text-center">
            申込済みイベントを見る
          </Link>
          <Link to="/"
            className="border border-ehaco-border text-ehaco-text font-medium px-8 py-3 rounded-xl hover:border-accent hover:text-accent transition text-center">
            イベントを探す
          </Link>
        </div>
      </div>
    </div>
  );
}
