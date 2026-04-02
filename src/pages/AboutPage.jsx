import { Link } from 'react-router-dom';

const features = [
  {
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z',
    title: 'AI・エンジニア採用に特化',
    desc: 'AI活用、DX推進、組織づくり。テクノロジー領域のビジネス課題に絞ったイベントだけ。',
  },
  {
    icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
    title: 'すべて無料',
    desc: '視聴も申込もアーカイブも無料。スキマ時間にオンラインで参加できます。',
  },
  {
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    title: '実務者が登壇',
    desc: 'ファインディ、ネオキャリア、ラクスなど。現場で成果を出している企業の実務者から直接学べます。',
  },
];

const topics = [
  'AI活用', 'DX推進', 'クラウド',
  'セキュリティ', 'データ分析', '組織づくり',
];

const steps = ['メールアドレスを登録', '認証メールで本人確認', '会員情報を入力', 'イベントを探す'];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ehaco-bg fade-in">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/80 to-accent/20" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <span className="text-4xl md:text-5xl font-black tracking-tight inline-block mb-5">
            <span className="text-[#4FC3F7]">e</span>haco<span className="text-[#4DB6AC]">!</span>
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight mb-5">
            時代を先どる、<br />
            課題解決型イベント。
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-8">
            AI活用・DX推進・組織づくり。<br className="hidden md:block" />
            テクノロジー領域の実務者から学べるイベント検索サイト。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="btn-gradient font-medium px-8 py-3.5 rounded-xl text-base shadow-lg hover:shadow-xl transition-all active:scale-[0.97]">
              無料で始める
            </Link>
            <Link to="/" className="border border-white/30 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/10 transition text-base">
              イベントを探す
            </Link>
          </div>
        </div>
      </section>

      {/* ── Topics ── */}
      <section className="py-8 border-b border-ehaco-border bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted mr-2">話題のテーマ:</span>
            {topics.map((t) => (
              <Link key={t} to="/" className="text-sm font-medium text-accent bg-accent/5 hover:bg-accent/10 px-3 py-1.5 rounded-full transition">{t}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why ehaco! ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-1.5">WHY EHACO!</p>
            <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight">ビジネスに特化したイベント検索</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-ehaco-bg p-6">
              <p className="text-sm text-muted mb-3">よくある課題</p>
              <ul className="space-y-3 text-base text-muted">
                <li className="flex items-start gap-3"><span className="text-muted/40 shrink-0">—</span>イベントが多すぎて自分に合うものが見つからない</li>
                <li className="flex items-start gap-3"><span className="text-muted/40 shrink-0">—</span>一般向けのセミナーばかりで実務に役立たない</li>
                <li className="flex items-start gap-3"><span className="text-muted/40 shrink-0">—</span>業種や立場でフィルターできない</li>
              </ul>
            </div>
            <div className="rounded-xl bg-accent/5 ring-2 ring-accent/20 p-6">
              <p className="text-sm text-accent font-bold mb-3">ehaco! なら</p>
              <ul className="space-y-3 text-base text-ehaco-text">
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>エンジニア採用・AI活用など実務テーマに特化</li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>業種・企業規模・職種であなたに合うイベントを検索</li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>成果を出している企業の実務者が登壇</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 md:py-20 bg-ehaco-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-1.5">FEATURES</p>
            <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight">ehaco! の特長</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="text-center p-6 md:p-8">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-ehaco-text mb-2">{f.title}</h3>
                <p className="text-base text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-1.5">HOW TO USE</p>
            <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight">かんたん4ステップ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="bg-ehaco-bg rounded-xl p-5 text-center ring-1 ring-ehaco-border/50">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-base mx-auto mb-3">{i + 1}</div>
                <p className="text-sm font-medium text-ehaco-text leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-section-tint border-y border-ehaco-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3 text-ehaco-text">まずは覗いてみませんか</h2>
          <p className="text-muted mb-8 text-base">会員登録は無料。アーカイブ配信ならいつでも視聴できます。</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="btn-gradient font-bold px-8 py-3.5 rounded-xl text-base shadow-lg hover:shadow-xl transition-all active:scale-[0.97]">
              無料で始める
            </Link>
            <Link to="/" className="border border-ehaco-border text-ehaco-text font-medium px-8 py-3.5 rounded-xl hover:border-accent hover:text-accent transition text-base">
              イベントを探す
            </Link>
          </div>
        </div>
      </section>

      {/* ── For organizers ── */}
      <section className="py-10 bg-section-warm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-muted text-sm">イベント主催者の方へ</p>
            <p className="font-bold text-base text-ehaco-text">ehaco! でイベント集客を加速しませんか？</p>
          </div>
          <Link to="/for-organizers" className="text-sm text-accent hover:text-accent-light font-medium transition shrink-0">
            詳細はこちら →
          </Link>
        </div>
      </section>
    </div>
  );
}
