import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { events, speakers } from '../data/dummy';

export default function EventDetailPage() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const event = events.find((e) => e.id === Number(id)) || events[0];
  const relatedEvents = events.filter((e) => e.id !== event.id).slice(0, 2);

  if (!event) return null;

  const capacityUsed = event.capacity - event.remaining;
  const capacityPercent = Math.round((capacityUsed / event.capacity) * 100);

  return (
    <div className="min-h-screen bg-ehaco-bg pb-20 lg:pb-0 fade-in">
      {/* Full-bleed banner image */}
      <img
        src="https://placehold.co/1400x500/0f172a/white?text=DX+Seminar"
        alt={event.title}
        loading="lazy"
        className="w-full h-[240px] md:h-[360px] object-cover"
      />

      {/* Title & meta card overlapping the image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg ring-1 ring-ehaco-border/50 p-6 md:p-8">
          {/* Back link */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ehaco-text transition-colors mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            戻る
          </button>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-ehaco-text mb-4 leading-tight">{event.title}</h1>

          {/* Organizer */}
          <div className="flex items-center gap-3 mb-5">
            <img
              src={event.organizerLogo}
              alt={event.organizer}
              loading="lazy"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-muted">主催者 {event.organizer}</span>
          </div>

          {/* Date / Location / Capacity */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
            <span className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {event.date}
            </span>
            <span className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </span>
            <span className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              定員 {event.capacity}名
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* 2-column layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="flex-1 max-w-3xl min-w-0">
            {/* Event Overview */}
            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ehaco-text mb-4 pl-3 border-l-4 border-accent">
                イベント概要
              </h2>
              <div className="text-base leading-relaxed text-gray-600 space-y-4">
                <p>
                  デジタルトランスフォーメーション（DX）が企業の競争力を左右する時代において、データの活用は避けて通れない経営課題となっています。
                  本セミナーでは、DX推進の最前線で活躍する専門家が、データ活用戦略の立案から実行までの具体的なプロセスを解説します。
                </p>
                <p>
                  先進企業の成功事例を交えながら、組織全体でデータドリブンな意思決定を実現するためのフレームワークや、
                  AI・機械学習を活用した業務効率化の最新アプローチについてもご紹介します。
                  経営層からIT部門、事業部門まで幅広い方々にご参加いただける内容です。
                </p>
                <p>
                  セミナー後半では、参加者同士のディスカッションタイムも設けております。
                  同じ課題を抱える他社の担当者との情報交換の場としてもぜひご活用ください。
                </p>
              </div>
            </section>

            {/* Recommended For */}
            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ehaco-text mb-4 pl-3 border-l-4 border-accent">
                こんな方におすすめ
              </h2>
              <div className="bg-accent/5 rounded-2xl p-4 md:p-6">
                <ul className="space-y-3">
                  {[
                    'DX推進を担当している方',
                    'データ活用に課題を感じている経営者・管理職',
                    'データドリブン経営に関心のある方',
                    'AIや機械学習を業務に活用したい方',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Event Details Table */}
            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ehaco-text mb-4 pl-3 border-l-4 border-accent">
                開催概要
              </h2>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 text-sm">
                <dt className="font-bold text-ehaco-text">日時</dt>
                <dd className="text-gray-600">{event.date}</dd>

                <dt className="font-bold text-ehaco-text">会場</dt>
                <dd className="text-gray-600">{event.location}</dd>

                <dt className="font-bold text-ehaco-text">定員</dt>
                <dd className="text-gray-600">200名（先着順）</dd>

                <dt className="font-bold text-ehaco-text">申込締切</dt>
                <dd className="text-gray-600">{event.deadline}</dd>

                <dt className="font-bold text-ehaco-text">主催</dt>
                <dd className="text-gray-600">{event.organizer}</dd>
              </dl>
            </section>

            {/* Speakers */}
            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ehaco-text mb-4 pl-3 border-l-4 border-accent">
                講師紹介
              </h2>
              <div className="space-y-4 md:space-y-6">
                {speakers.map((speaker) => (
                  <div key={speaker.name} className="flex flex-col sm:flex-row items-start gap-5 md:gap-6 p-4 md:p-5 bg-white rounded-2xl ring-1 ring-ehaco-border/50">
                    <img
                      src={speaker.photo}
                      alt={speaker.name}
                      loading="lazy"
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex-shrink-0 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-ehaco-text text-base md:text-lg">{speaker.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{speaker.title}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{speaker.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Privacy Notice */}
            <section className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ehaco-text mb-4 pl-3 border-l-4 border-accent">
                個人情報の取り扱い
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                お申し込み時にご入力いただいた個人情報は、本セミナーの運営およびご連絡の目的にのみ使用いたします。
                第三者への提供は、法令に基づく場合を除き、ご本人の同意なく行いません。
                個人情報の取り扱いに関する詳細は、主催者のプライバシーポリシーをご確認ください。
              </p>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-96 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Ticket Card */}
              <div className="bg-white rounded-2xl shadow-lg ring-1 ring-ehaco-border/50 overflow-hidden">
                <div className="p-6 md:p-8">
                  {/* Favorite Button */}
                  <div className="flex justify-end mb-3">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`flex items-center gap-1.5 text-sm transition-colors ${
                        isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                      }`}
                      aria-label="お気に入り"
                    >
                      <svg
                        className="w-5 h-5"
                        fill={isFavorite ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      お気に入り
                    </button>
                  </div>

                  {/* Deadline Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-xs font-medium px-2.5 py-1 rounded-full">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      申込締切 {event.deadline}
                    </span>
                  </div>

                  {/* Remaining seats */}
                  <div className="mb-4">
                    <p className="font-bold text-ehaco-text mb-1">一般参加</p>
                    <p className="text-sm text-gray-500">
                      残り<span className="font-bold text-ehaco-text">{event.remaining}</span>席
                    </p>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>{capacityUsed}/{event.capacity}名</span>
                      <span>{capacityPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${capacityPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to={`/event/${event.id}/apply`} className="hidden lg:block w-full btn-gradient text-lg font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-[0.97] text-center">
                    このイベントに申し込む
                  </Link>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="bg-white rounded-2xl border border-ehaco-border p-5">
                <p className="text-sm font-bold text-ehaco-text mb-3">シェアする</p>
                <div className="flex items-center gap-2">
                  {[
                    { label: 'X', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', fill: true },
                    { label: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', fill: true },
                    { label: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', fill: true },
                    { label: 'リンク', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', fill: false },
                  ].map((s) => (
                    <button key={s.label} className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-ehaco-text transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill={s.fill ? 'currentColor' : 'none'} stroke={s.fill ? 'none' : 'currentColor'} strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                      </svg>
                      <span className="text-[10px]">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Organizer Card */}
              <div className="bg-white rounded-2xl border border-ehaco-border p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={event.organizerLogo}
                    alt={event.organizer}
                    loading="lazy"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-bold text-ehaco-text text-sm">{event.organizer}</p>
                    <p className="text-xs text-gray-500">1,234 フォロワー</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full border border-ehaco-border text-ehaco-text text-sm font-medium rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer">
                    フォローする
                  </button>
                  <Link to="/organizer/1" className="w-full block text-sm text-gray-500 hover:text-accent transition-colors py-1 cursor-pointer text-center">
                    主催者ページを見る
                  </Link>
                </div>
              </div>

              {/* Related Events */}
              <div className="bg-white rounded-2xl border border-ehaco-border p-5">
                <h3 className="font-bold text-ehaco-text mb-4">関連イベント</h3>
                <div className="space-y-4">
                  {relatedEvents.map((relEvent) => (
                    <Link
                      key={relEvent.id}
                      to={`/event/${relEvent.id}`}
                      className="flex gap-3 group"
                    >
                      <img
                        src={relEvent.image}
                        alt={relEvent.title}
                        loading="lazy"
                        className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ehaco-text group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                          {relEvent.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{relEvent.dateShort}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-ehaco-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg z-40 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-sm font-medium ${event.remaining <= 10 ? 'text-red-500' : 'text-muted'}`}>
                残り{event.remaining}席
              </span>
            </div>
            <p className="text-sm text-muted flex items-center gap-1">
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              締切 {event.deadline}
            </p>
          </div>
          <Link to={`/event/${event.id}/apply`} className="btn-gradient font-bold px-6 py-3 rounded-xl shrink-0 active:scale-[0.97] text-center">
            申し込む
          </Link>
        </div>
      </div>
    </div>
  );
}
