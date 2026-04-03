import { Link } from 'react-router-dom';

export default function ForOrganizersPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-ehaco-bg fade-in">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/80 to-accent/20" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <span className="text-4xl md:text-5xl font-black tracking-tight inline-block mb-4"><span className="text-[#4FC3F7]">e</span>haco<span className="text-[#4DB6AC]">!</span></span>
          <p className="text-sm font-semibold text-accent-light uppercase tracking-widest mb-4">FOR ORGANIZERS</p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-5">
            時代の最前線を、<br />イベントで届ける。
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-10">
            AI活用・DX推進・組織づくり。<br />
            テクノロジー領域の知見をイベントで届けて、質の高いリードを獲得。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/org/register" className="btn-gradient font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.97]">
              無料で始める
            </Link>
            <Link to="/org/login" className="border border-white/30 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 transition">
              ログイン
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3-step flow ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight">3ステップで完結</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {([
              { step: '1', title: 'イベントを作成', desc: '管理画面からタイトル・日時・詳細を入力して公開。5分で完了。', icon: 'M12 4.5v15m7.5-7.5h-15' },
              { step: '2', title: '参加者が申し込む', desc: '参加者は会員情報で申込。業種・規模・職種が自動で記録されます。', icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
              { step: '3', title: 'リードをExcelで取得', desc: '申込者データをワンクリックでダウンロード。すぐに営業活動へ。', icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' },
            ] as { step: string; title: string; desc: string; icon: string }[]).map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <div className="text-xs font-bold text-accent mb-2">STEP {item.step}</div>
                <h3 className="font-bold text-lg text-ehaco-text mb-2">{item.title}</h3>
                <p className="text-base text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="py-16 bg-ehaco-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight">参加者を深く理解できる</h2>
            <p className="text-base text-muted mt-2">ehaco!の会員は登録時に業種や立場を入力しています。<br className="hidden md:block" />イベント後、参加者の属性に基づいた分析やフォローアップが可能です。</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {([
              { title: '属性で分析', desc: '参加者の業種・企業規模・職種の傾向を把握。次回の企画に活かせます。' },
              { title: 'Excelエクスポート', desc: '申込者一覧をワンクリックでダウンロード。CRMへの取り込みも簡単。' },
              { title: 'アンケートで深掘り', desc: 'イベント後のアンケートで具体的な関心やニーズをヒアリング。' },
            ] as { title: string; desc: string }[]).map((item) => (
              <div key={item.title} className="bg-white rounded-xl ring-1 ring-ehaco-border/50 p-5">
                <h3 className="font-bold text-base text-ehaco-text mb-1">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Management features ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight">その他の管理機能</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([
              { title: 'アンケート', desc: '参加者に最大3問まで。単一選択・複数選択で定量データを収集。' },
              { title: 'ターゲット設定', desc: '業種・規模・職種で対象者を絞り込み。狙った層にリーチ。' },
              { title: 'フォロワー通知', desc: 'フォロワーにイベント公開を自動通知。リピーター獲得に。' },
              { title: 'アーカイブ配信対応', desc: '録画配信にも対応。リアルタイムで参加できない層も取り込める。' },
            ] as { title: string; desc: string }[]).map((f) => (
              <div key={f.title} className="flex gap-4 items-start p-5 rounded-xl ring-1 ring-ehaco-border/50">
                <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="font-bold text-base text-ehaco-text">{f.title}</p>
                  <p className="text-sm text-muted mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/org/dashboard" className="text-sm text-accent hover:text-accent-light font-medium transition">管理画面のデモを見る →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-section-tint border-t border-ehaco-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3 text-ehaco-text">次のイベントで試してみませんか</h2>
          <p className="text-muted mb-8 text-base">アカウント作成は無料。最短5分でイベントページを公開できます。</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/org/register" className="btn-gradient font-bold px-8 py-3.5 rounded-xl text-base shadow-lg hover:shadow-xl transition-all active:scale-[0.97]">
              無料で始める
            </Link>
            <Link to="/about" className="border border-ehaco-border text-ehaco-text font-medium px-8 py-3.5 rounded-xl hover:border-accent hover:text-accent transition text-base">
              参加者向けサイトを見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
