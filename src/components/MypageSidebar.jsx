import { Link } from 'react-router-dom';

const navItems = [
  {
    key: 'dashboard',
    label: 'ダッシュボード',
    to: '/mypage/dashboard',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4',
  },
  {
    key: 'notifications',
    label: 'お知らせ',
    to: '/mypage/notifications',
    icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
  },
  {
    key: 'profile',
    label: 'プロフィール',
    to: '/mypage/profile',
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
  },
  {
    key: 'settings',
    label: '設定',
    to: '/mypage/settings',
    icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.212-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z',
  },
];

export default function MypageSidebar({ activePage }) {
  return (
    <>
      {/* PC: horizontal tabs at top */}
      <div className="relative border-b border-ehaco-border hidden sm:block">
        <div className="overflow-x-auto scrollbar-hide">
          <nav className="flex min-w-max">
            {navItems.map((item) => {
              const isActive = activePage === item.key;
              return (
                <Link
                  key={item.key}
                  to={item.to}
                  className={`shrink-0 px-5 py-3.5 text-base font-medium transition-colors relative ${
                    isActive
                      ? 'font-semibold text-accent border-b border-accent'
                      : 'text-muted hover:text-ehaco-text'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-ehaco-bg to-transparent md:hidden" />
      </div>

      {/* Mobile: fixed bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-ehaco-border pb-[env(safe-area-inset-bottom)] sm:hidden">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activePage === item.key;
            return (
              <Link
                key={item.key}
                to={item.to}
                className={`flex flex-col items-center gap-1 py-2 px-3 min-w-0 transition-colors ${
                  isActive ? 'text-accent' : 'text-muted'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
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
