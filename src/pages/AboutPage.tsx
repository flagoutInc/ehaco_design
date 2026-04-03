import { Link } from 'react-router-dom';

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface Persona {
  role: string;
  need: string;
  icon: string;
}

interface EventExample {
  title: string;
  organizer: string;
  format: string;
}

interface FAQ {
  q: string;
  a: string;
}

const features: Feature[] = [
  {
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z',
    title: 'テクノロジーで次の一手を',
    desc: 'AI活用、DX推進、クラウド、セキュリティ。ビジネスに直結するテーマだけ。',
  },
  {
    icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
    title: 'すべて無料',
    desc: '視聴も申込もアーカイブも無料。スキマ時間に参加できます。',
  },
  {
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    title: '現場のプロが登壇',
    desc: '成果を出している企業の担当者から直接学べます。',
  },
];

const personas: Persona[] = [
  { role: 'IT部門マネージャー', need: 'AI導入やクラウド移行の最新事例を知りたい', icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25' },
  { role: '経営企画・DX推進', need: '他社の成功事例から自社のDX戦略のヒントを得たい', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605' },
  { role: 'マーケ・営業', need: 'リード獲得や集客のトレンドをキャッチアップしたい', icon: 'M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z' },
];

const eventExamples: EventExample[] = [
  { title: 'AI駆動開発の現在地｜システム開発会社が明かす「開発舞台裏」の全貌', organizer: 'テックファーム株式会社', format: 'オンライン（Zoom）' },
  { title: 'エンジニア採用の市場トレンドとAI活用度合いで変わる求人訴求方法', organizer: 'ファインディ株式会社', format: 'アーカイブ配信' },
  { title: 'DXを成功に導く「顧客起点」の獲得 — 顧客の潜在ニーズを発掘する企業の実践術', organizer: 'DXナレッジ株式会社', format: 'オンライン（Zoom）' },
  { title: 'エンジニアとAIが共創するハイブリッド組織を機能させるピープルマネジメント', organizer: '株式会社ラクスパートナーズ', format: 'アーカイブ配信' },
];

const faqs: FAQ[] = [
  { q: '本当に無料ですか？', a: 'はい。イベントの検索・申込・視聴・アーカイブ閲覧まで、すべて無料で利用できます。' },
  { q: 'どんなイベントがありますか？', a: 'AI活用、DX推進、クラウド、セキュリティ、組織づくりなど、テクノロジー領域のウェビナー・セミナーが中心です。' },
  { q: 'アーカイブ配信はいつまで見れますか？', a: 'イベントによって異なりますが、多くのアーカイブは数ヶ月〜1年間視聴可能です。' },
  { q: '退会はできますか？', a: 'はい。マイページのアカウント設定からいつでも退会できます。' },
];

export default function AboutPage(): React.ReactElement {
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
            時代を先どる、<br />次の一手が見つかる。
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-8">
            AI活用・DX推進・組織づくり。<br className="hidden md:block" />
            現場のプロの知見が、ビジネスのヒントになる。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link to="/register" className="btn-gradient font-medium px-8 py-3.5 rounded-xl text-base shadow-lg hover:shadow-xl transition-all active:scale-[0.97]">
              無料で始める
            </Link>
            <Link to="/" className="border border-white/30 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/10 transition text-base">
              イベントを探す
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['AI活用', 'DX推進', 'クラウド', 'セキュリティ', 'データ分析', '組織づくり'].map((t) => (
              <Link key={t} to="/" className="text-sm font-medium text-white/70 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition">{t}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-ehaco-bg rounded-2xl p-6 md:p-8 text-center">
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

      {/* ── Personas ── */}
      <section className="py-16 bg-ehaco-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight text-center mb-10">こんな方におすすめ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {personas.map((p) => (
              <div key={p.role} className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                  </svg>
                </div>
                <p className="font-bold text-base text-ehaco-text mb-1">{p.role}</p>
                <p className="text-sm text-muted leading-relaxed">{p.need}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why ehaco! ── */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-center mb-10">よくあるイベントサイトとの違い</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-white/5 p-6">
              <p className="text-sm text-white/40 mb-3">よくある課題</p>
              <ul className="space-y-3 text-base text-white/60">
                <li className="flex items-start gap-3"><span className="text-white/20 shrink-0">—</span>イベントが多すぎて自分に合うものが見つからない</li>
                <li className="flex items-start gap-3"><span className="text-white/20 shrink-0">—</span>一般向けのセミナーばかりで実務に役立たない</li>
                <li className="flex items-start gap-3"><span className="text-white/20 shrink-0">—</span>業種や立場でフィルターできない</li>
              </ul>
            </div>
            <div className="rounded-xl bg-accent/20 ring-1 ring-accent/30 p-6">
              <p className="text-sm text-accent-light font-bold mb-3">ehaco! なら</p>
              <ul className="space-y-3 text-base text-white">
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-accent-light shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>テクノロジー領域の実務テーマに特化</li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-accent-light shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>業種・企業規模・職種であなたに合うイベントを検索</li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-accent-light shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>成果を出している企業の実務者が登壇</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Event Examples ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight text-center mb-3">こんなイベントが開催されています</h2>
          <p className="text-base text-muted text-center mb-10">実際にehaco!で公開されたイベントの一部です</p>
          <div className="space-y-3">
            {eventExamples.map((e) => (
              <div key={e.title} className="bg-ehaco-bg rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-base text-ehaco-text line-clamp-2 leading-snug">{e.title}</p>
                  <p className="text-sm text-muted mt-1">{e.organizer}</p>
                </div>
                <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full shrink-0 w-fit">{e.format}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-accent hover:text-accent-light font-medium transition">すべてのイベントを見る →</Link>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 bg-ehaco-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight text-center mb-12">かんたん4ステップ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['メールアドレスを登録', '認証メールで本人確認', '会員情報を入力', 'イベントを探す'].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-6xl font-black text-accent/20 mb-2">{i + 1}</div>
                <p className="text-base font-medium text-ehaco-text leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight text-center mb-10">よくある質問</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-ehaco-bg rounded-xl p-5">
                <p className="font-bold text-base text-ehaco-text mb-2">Q. {faq.q}</p>
                <p className="text-base text-muted leading-relaxed">{faq.a}</p>
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
            <p className="font-bold text-base text-ehaco-text">時代の最前線を、イベントで届けませんか？</p>
          </div>
          <Link to="/for-organizers" className="text-sm text-accent hover:text-accent-light font-medium transition shrink-0">
            詳細はこちら →
          </Link>
        </div>
      </section>
    </div>
  );
}
