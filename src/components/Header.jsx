import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notifications as notifData, user } from '../data/dummy';

const notificationTypeColors = {
  event: 'bg-accent',
  reminder: 'bg-amber-500',
  recommend: 'bg-emerald-500',
  organizer: 'bg-primary-light',
  system: 'bg-gray-400',
};

export default function Header() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  const [readIds, setReadIds] = useState(new Set());
  const unreadCount = notifData.filter((n) => !n.read && !readIds.has(n.id)).length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Close mobile menu on route change (resize)
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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg' : 'bg-primary'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tight text-white">
          ehaco!
        </Link>

        {/* Center nav (PC) */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/search"
            className="relative text-sm text-white/90 transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
          >
            イベントを探す
          </Link>
          <a
            href="#"
            className="relative text-sm text-white/90 transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
          >
            ehaco!とは
          </a>
          <a
            href="#"
            className="relative text-sm text-white/90 transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
          >
            掲載希望の方
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notification bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setNotifOpen((prev) => !prev);
                setUserMenuOpen(false);
              }}
              className="relative rounded-full p-2 text-white transition hover:bg-white/10"
            >
              {/* Bell icon */}
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] max-w-96 overflow-hidden rounded-xl border border-ehaco-border bg-white shadow-xl md:w-96">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-ehaco-border px-4 py-3">
                  <h3 className="font-semibold text-ehaco-text">お知らせ</h3>
                  <button
                    onClick={markAllRead}
                    className="text-xs text-accent transition hover:text-accent-light"
                  >
                    すべて既読にする
                  </button>
                </div>

                {/* List */}
                <div className="max-h-80 overflow-y-auto">
                  {notifData.slice(0, 5).map((notif) => {
                    const isRead = notif.read || readIds.has(notif.id);
                    return (
                    <div
                      key={notif.id}
                      className={`flex gap-3 border-b border-ehaco-border px-4 py-4 transition last:border-b-0 hover:bg-gray-50 ${
                        !isRead ? 'bg-blue-50' : ''
                      }`}
                    >
                      {/* Type indicator */}
                      <span
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                          notificationTypeColors[notif.type] || 'bg-gray-400'
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-ehaco-text">
                          {notif.title}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-sm text-gray-600">
                          {notif.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {notif.dateRelative}
                        </p>
                      </div>
                    </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-ehaco-border px-4 py-2.5 text-center">
                  <Link
                    to="/mypage/notifications"
                    className="text-sm text-accent transition hover:text-accent-light"
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
              className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-white transition hover:bg-white/10"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm">{user.name}</span>
            </button>

            {/* User dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-ehaco-border bg-white py-1 shadow-xl">
                <Link
                  to="/mypage/dashboard"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-ehaco-text transition hover:bg-gray-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                  </svg>
                  ダッシュボード
                </Link>
                <Link
                  to="/mypage/events"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-ehaco-text transition hover:bg-gray-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  申込済みイベント
                </Link>
                <Link
                  to="/mypage/favorites"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-ehaco-text transition hover:bg-gray-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  お気に入り
                </Link>
                <Link
                  to="/mypage/account"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-ehaco-text transition hover:bg-gray-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  アカウント設定
                </Link>
                <Link
                  to="/mypage/notification-settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-ehaco-text transition hover:bg-gray-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  お知らせ設定
                </Link>

                {/* Divider */}
                <div className="my-1 border-t border-ehaco-border" />

                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition hover:bg-gray-50"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  ログアウト
                </a>
              </div>
            )}
          </div>

          {/* Hamburger button (mobile) */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-full p-2 text-white transition hover:bg-white/10 md:hidden"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`overflow-hidden border-t border-white/20 md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
          {/* Nav links */}
          <nav className="space-y-1 px-4 py-3">
            <Link
              to="/search"
              className="block rounded-lg px-3 py-2.5 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              イベントを探す
            </Link>
            <a
              href="#"
              className="block rounded-lg px-3 py-2.5 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              ehaco!とは
            </a>
            <a
              href="#"
              className="block rounded-lg px-3 py-2.5 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              掲載希望の方
            </a>
          </nav>

          {/* Divider */}
          <div className="mx-4 border-t border-white/20" />

          {/* User section */}
          <div className="px-4 py-3">
            <div className="mb-3 flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-white/60">{user.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              <Link
                to="/mypage/dashboard"
                className="block rounded-lg px-3 py-2.5 text-sm text-white/90 transition hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                ダッシュボード
              </Link>
              <Link
                to="/mypage/events"
                className="block rounded-lg px-3 py-2.5 text-sm text-white/90 transition hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                申込済みイベント
              </Link>
              <Link
                to="/mypage/favorites"
                className="block rounded-lg px-3 py-2.5 text-sm text-white/90 transition hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                お気に入り
              </Link>
              <Link
                to="/mypage/account"
                className="block rounded-lg px-3 py-2.5 text-sm text-white/90 transition hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                アカウント設定
              </Link>
              <Link
                to="/mypage/notification-settings"
                className="block rounded-lg px-3 py-2.5 text-sm text-white/90 transition hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                お知らせ設定
              </Link>
            </nav>
          </div>

          {/* Divider */}
          <div className="mx-4 border-t border-white/20" />

          <div className="px-4 py-3">
            <a
              href="#"
              className="block rounded-lg px-3 py-2.5 text-sm text-red-300 transition hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              ログアウト
            </a>
          </div>
        </div>
    </header>

  );
}
