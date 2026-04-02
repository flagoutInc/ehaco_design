import { Link } from 'react-router-dom';

const allNavItems = [
  { key: 'dashboard', label: 'ダッシュボード', to: '/mypage/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4', mobile: true },
  { key: 'events', label: 'イベント', to: '/mypage/events', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5', mobile: true },
  { key: 'favorites', label: 'お気に入り', to: '/mypage/favorites', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', mobile: true },
  { key: 'following', label: 'フォロー', to: '/mypage/following', icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z', mobile: false },
  { key: 'settings', label: '設定', to: '/mypage/settings', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.212-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z', mobile: true },
];

const mobileItems = allNavItems.filter((i) => i.mobile);

export default function MypageSidebar({ activePage }) {
  return (
    <>
      {/* PC: horizontal tabs */}
      <div className="relative border-b border-ehaco-border hidden sm:block">
        <div className="overflow-x-auto scrollbar-hide">
          <nav className="flex min-w-max">
            {allNavItems.map((item) => {
              const isActive = activePage === item.key;
              const cls = `shrink-0 px-5 py-3.5 text-sm font-medium transition-colors relative ${
                isActive ? 'font-semibold text-accent border-b border-accent' : 'text-muted hover:text-ehaco-text'
              }`;
              const inner = (
                <>
                  {item.label}
                  {item.href && <svg className="w-3 h-3 inline-block ml-1 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>}
                </>
              );
              return item.href ? (
                <a key={item.key} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <Link key={item.key} to={item.to} className={cls}>{inner}</Link>
              );
            })}
          </nav>
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-ehaco-bg to-transparent md:hidden" />
      </div>

      {/* Mobile: fixed bottom nav (3 items) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-ehaco-border pb-[env(safe-area-inset-bottom)] sm:hidden">
        <div className="flex items-center justify-around">
          {mobileItems.map((item) => {
            const isActive = activePage === item.key;
            return (
              <Link key={item.key} to={item.to}
                className={`flex flex-col items-center gap-1 py-3 px-4 min-w-0 transition-colors ${isActive ? 'text-accent' : 'text-muted'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="text-xs font-medium truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
