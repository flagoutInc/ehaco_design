import { Link } from 'react-router-dom';

interface SettingsItemLink {
  to: string;
  href?: undefined;
  icon: string;
  title: string;
  desc: string;
  external?: undefined;
}

interface SettingsItemExternal {
  to?: undefined;
  href: string;
  icon: string;
  title: string;
  desc: string;
  external: true;
}

type SettingsItem = SettingsItemLink | SettingsItemExternal;

const settingsItems: SettingsItem[] = [
  {
    to: '/mypage/account',
    icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z',
    title: 'アカウント',
    desc: 'メールアドレス・会社情報・業種・職種の変更',
  },
  {
    to: '/mypage/profile',
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    title: 'プロフィール',
    desc: '表示名・プロフィール画像',
  },
  {
    to: '/mypage/notification-settings',
    icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
    title: 'お知らせ',
    desc: '新着イベント・おすすめイベントの配信設定',
  },
  {
    href: 'https://support.ehaco.net/',
    icon: 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z',
    title: 'ヘルプ',
    desc: '使い方・よくある質問',
    external: true,
  },
];

export default function SettingsPage() {
  return (
    <div className="fade-in">
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text">設定</h1>
        </div>

        <div className="space-y-3">
          {settingsItems.map((item) => {
            const inner = (<>
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base text-ehaco-text group-hover:text-accent transition">{item.title}</p>
                <p className="text-sm text-muted mt-0.5">{item.desc}</p>
              </div>
              <svg className="w-5 h-5 text-muted group-hover:text-accent transition flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                {item.external
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                }
              </svg>
            </>);
            const cls = "bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 flex items-center gap-5 card-hover group block";
            return item.href ? (
              <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
            ) : (
              <Link key={item.to} to={item.to} className={cls}>{inner}</Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
