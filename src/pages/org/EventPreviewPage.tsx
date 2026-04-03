import { Link, useParams } from 'react-router-dom';
import { orgEvents } from '../../data/orgDummy';
import { speakers } from '../../data/dummy';

export default function EventPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const event = orgEvents.find((e) => e.id === Number(id)) || orgEvents[0];

  return (
    <div className="fade-in">
      {/* Top bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link to={`/org/events/${id}/edit`} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          編集画面に戻る
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-medium">プレビューモード</span>
        </div>
      </div>

      {/* Preview frame */}
      <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 overflow-hidden">
        {/* Banner */}
        <img src={event.image} alt={event.title} className="w-full h-48 md:h-64 object-cover" />

        <div className="p-6 md:p-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {((event as Record<string, unknown>).tags as string[] || ['DX推進', 'データ分析']).map((tag: string) => (
              <span key={tag} className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-lg">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text mb-4 leading-tight">{event.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-muted mb-6">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              オンライン（Zoom）
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              定員 {event.capacity}名
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left content */}
            <div className="flex-1">
              <section className="mb-6">
                <h2 className="text-lg font-bold text-ehaco-text mb-3 pl-3 border-l-4 border-accent">イベント概要</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  デジタルトランスフォーメーション（DX）が企業の競争力を左右する時代において、データの活用は避けて通れない経営課題となっています。
                  本セミナーでは、DX推進の最前線で活躍する専門家が、データ活用戦略の立案から実行までの具体的なプロセスを解説します。
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-bold text-ehaco-text mb-3 pl-3 border-l-4 border-accent">こんな方におすすめ</h2>
                <div className="bg-accent/5 rounded-xl p-4">
                  <ul className="space-y-2">
                    {['DX推進を担当している方', 'データ活用に課題を感じている経営者・管理職', 'AIや機械学習を業務に活用したい方'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-bold text-ehaco-text mb-3 pl-3 border-l-4 border-accent">講師紹介</h2>
                <div className="space-y-4">
                  {speakers.slice(0, 2).map((speaker) => (
                    <div key={speaker.name} className="flex gap-4 items-start p-4 bg-white rounded-xl ring-1 ring-ehaco-border/50">
                      <img src={speaker.photo} alt={speaker.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <p className="font-bold text-ehaco-text text-sm">{speaker.name}</p>
                        <p className="text-xs text-muted mb-1">{speaker.title}</p>
                        <p className="text-xs text-gray-600 line-clamp-2">{speaker.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right sidebar preview */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-gray-50 rounded-xl border border-ehaco-border p-5">
                <p className="font-bold text-ehaco-text mb-3">一般参加</p>
                <div className="flex items-center justify-between text-xs text-muted mb-1">
                  <span>{event.applicants}/{event.capacity}名</span>
                  <span>{Math.round((event.applicants / event.capacity) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${Math.round((event.applicants / event.capacity) * 100)}%` }} />
                </div>
                <div className="btn-gradient text-center font-medium py-3 rounded-xl opacity-75 cursor-not-allowed">
                  このイベントに申し込む
                </div>
                <p className="text-[10px] text-center text-muted mt-2">※ プレビューのためボタンは無効です</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
