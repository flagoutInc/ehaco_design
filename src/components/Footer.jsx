import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Color bar */}
      <div className="h-1 bg-gradient-to-r from-accent via-primary-light to-accent" />

      {/* Newsletter CTA */}
      <div className="bg-primary-light/30">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10 text-center">
          <h3 className="text-lg md:text-xl font-black text-white mb-2">最新イベント情報をお届け</h3>
          <p className="text-sm text-white/70 mb-5">メールアドレスを登録して、おすすめイベント情報を受け取りましょう</p>
          <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="メールアドレスを入力"
              className="flex-1 rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
            />
            <button className="shrink-0 rounded-lg bg-accent hover:bg-accent-light text-white font-medium px-5 py-2.5 text-sm transition">
              登録する
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-left">
          {/* Column 1: Logo & description & SNS */}
          <div>
            <Link to="/" className="text-2xl font-black tracking-tight text-white">
              ehaco!
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              ehaco!は、ビジネスに役立つウェビナー・セミナー・イベント情報を
              まとめて検索できるプラットフォームです。最新のトレンドや
              スキルアップに役立つイベントを見つけましょう。
            </p>
            {/* SNS icons */}
            <div className="mt-5 flex items-center gap-3">
              {/* X (Twitter) */}
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Service links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">サービス</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/search"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  イベントを探す
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  ehaco!とは
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  掲載希望の方
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">サポート</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  利用規約
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 transition hover:text-white"
                >
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/20 pt-6 text-center">
          <p className="text-xs text-white/50">
            &copy; 2026 ehaco! All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
