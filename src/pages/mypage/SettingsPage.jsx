import { Link } from 'react-router-dom';

const settingsItems = [
  {
    to: '/mypage/account',
    icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z',
    title: 'アカウント設定',
    desc: 'メールアドレス・パスワードの変更、外部アカウント連携、アカウント削除',
  },
  {
    to: '/mypage/notification-settings',
    icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
    title: 'お知らせ設定',
    desc: 'サイト内通知・メール通知のオン/オフ、メール通知の頻度設定',
  },
  {
    to: '/mypage/profile',
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    title: 'プロフィール編集',
    desc: 'お名前・所属・自己紹介・興味のあるカテゴリの編集',
  },
];

export default function SettingsPage() {
  return (
    <div className="fade-in">

      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="h-1.5 w-16 bg-accent rounded-full mb-4" />
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text">設定</h1>
        </div>

        <div className="space-y-4">
          {settingsItems.map((item) => (
            <Link key={item.to} to={item.to}
              className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 flex items-center gap-5 card-hover group block">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base text-ehaco-text group-hover:text-accent transition">{item.title}</p>
                <p className="text-sm text-muted mt-1">{item.desc}</p>
              </div>
              <svg className="w-4 h-4 text-muted group-hover:text-accent transition flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
