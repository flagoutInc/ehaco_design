import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1: Logo & description */}
          <div>
            <Link to="/" className="text-xl font-bold text-white">
              ehaco!
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              ehaco!は、ビジネスに役立つウェビナー・セミナー・イベント情報を
              まとめて検索できるプラットフォームです。最新のトレンドや
              スキルアップに役立つイベントを見つけましょう。
            </p>
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
