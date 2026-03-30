import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notifications as notifData, user } from '../data/dummy';

const notificationTypeColors = {
  event: 'bg-accent',
  reminder: 'bg-amber-500',
  recommend: 'bg-emerald-500',
  organizer: 'bg-primary-light',
  system: 'bg-muted',
};

export default function Header() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  const [readIds, setReadIds] = useState(new Set());
  const unreadCount = notifData.filter((n) => !n.read && !readIds.has(n.id)).length;

  const markAllRead = () => {
    setReadIds(new Set(notifData.map((n) => n.id)));
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-ehaco-border/50 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/ehaco_design/ehaco-logo.png" alt="ehaco!" className="h-8 md:h-9 object-contain" />
        </Link>

        {/* Center nav (PC) */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="relative text-sm font-medium text-muted hover:text-ehaco-text after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
          >
            イベントを探す
          </Link>
          <a
            href="https://ehaco.net/service/participants"
            className="relative text-sm font-medium text-muted hover:text-ehaco-text after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
          >
            ehaco!とは
          </a>
          <a
            href="#"
            className="relative text-sm font-medium text-muted hover:text-ehaco-text after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
          >
            掲載希望の方
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Notification bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setNotifOpen((prev) => !prev);
                setUserMenuOpen(false);
              }}
              className="relative rounded-xl p-2 text-muted hover:bg-gray-100 hover:text-ehaco-text transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {notifOpen && (
              <div className="absolute right-0 top-full mt-3 w-[calc(100vw-2rem)] max-w-96 overflow-hidden rounded-2xl border border-ehaco-border bg-white shadow-2xl md:w-96">
                <div className="flex items-center justify-between border-b border-ehaco-border px-5 py-3.5">
                  <h3 className="font-semibold text-ehaco-text">お知らせ</h3>
                  <button onClick={markAllRead} className="text-xs font-medium text-accent transition hover:text-accent-light">
                    すべて既読にする
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifData.slice(0, 5).map((notif) => {
                    const isRead = notif.read || readIds.has(notif.id);
                    return (
                      <div
                        key={notif.id}
                        className={`flex gap-3 border-b border-ehaco-border/50 px-5 py-4 transition last:border-b-0 hover:bg-gray-50 ${
                          !isRead ? 'bg-accent/5' : ''
                        }`}
                      >
                        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notificationTypeColors[notif.type] || 'bg-muted'}`} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-ehaco-text">{notif.title}</p>
                          <p className="mt-0.5 line-clamp-2 text-sm text-muted">{notif.message}</p>
                          <p className="mt-1 text-xs text-muted/70">{notif.dateRelative}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-ehaco-border px-5 py-3 text-center">
                  <Link
                    to="/mypage/notifications"
                    className="text-sm font-medium text-accent transition hover:text-accent-light"
                    onClick={() => setNotifOpen(false)}
                  >
                    すべてのお知らせを見る
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User menu (PC) */}
          <div className="relative hidden md:block" ref={userMenuRef}>
            <button
              onClick={() => {
                setUserMenuOpen((prev) => !prev);
                setNotifOpen(false);
              }}
              className="flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-3 text-ehaco-text hover:bg-gray-100 transition-colors"
            >
              <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-lg object-cover" />
              <span className="text-sm font-medium">{user.name}</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-ehaco-border bg-white py-2 shadow-2xl">
                {[
                  { to: '/mypage/dashboard', label: 'ダッシュボード', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4' },
                  { to: '/mypage/notifications', label: 'お知らせ', icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0' },
                  { to: '/mypage/profile', label: 'プロフィール', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
                  { to: '/mypage/settings', label: '設定', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.212-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z' },
                ].map(({ to, label, icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-ehaco-text transition hover:bg-gray-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <svg className="h-4 w-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                    {label}
                  </Link>
                ))}
                <div className="my-1 border-t border-ehaco-border" />
                <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition hover:bg-gray-50">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  ログアウト
                </a>
              </div>
            )}
          </div>

          {/* Hamburger button (mobile) */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-xl p-2 text-ehaco-text hover:bg-gray-100 transition-colors md:hidden"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`overflow-hidden md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? 'max-h-[500px] opacity-100 bg-white border-t border-ehaco-border/50'
            : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="space-y-1 px-4 py-3">
          <Link
            to="/"
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ehaco-text hover:bg-gray-50 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            イベントを探す
          </Link>
          <a
            href="https://ehaco.net/service/participants"
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ehaco-text hover:bg-gray-50 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            ehaco!とは
          </a>
          <a
            href="#"
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ehaco-text hover:bg-gray-50 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            掲載希望の方
          </a>
        </nav>

        <div className="mx-4 border-t border-ehaco-border/50" />

        <div className="px-4 py-3">
          <div className="mb-3 flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <p className="text-sm font-medium text-ehaco-text">{user.name}</p>
              <p className="text-xs text-muted">{user.email}</p>
            </div>
          </div>
          <nav className="space-y-1">
            {['ダッシュボード', 'お知らせ', 'プロフィール', '設定'].map((label, i) => {
              const paths = ['/mypage/dashboard', '/mypage/notifications', '/mypage/profile', '/mypage/settings'];
              return (
                <Link
                  key={label}
                  to={paths[i]}
                  className="block rounded-xl px-3 py-2.5 text-sm text-ehaco-text hover:bg-gray-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mx-4 border-t border-ehaco-border/50" />

        <div className="px-4 py-3">
          <a
            href="#"
            className="block rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-gray-50 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            ログアウト
          </a>
        </div>
      </div>
    </header>
  );
}
