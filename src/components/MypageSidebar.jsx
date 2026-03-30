import { Link } from 'react-router-dom';

const navItems = [
  { key: 'dashboard', label: 'ダッシュボード', to: '/mypage/dashboard' },
  { key: 'notifications', label: 'お知らせ', to: '/mypage/notifications' },
  { key: 'profile', label: 'プロフィール', to: '/mypage/profile' },
  { key: 'settings', label: '設定', to: '/mypage/settings' },
];

export default function MypageSidebar({ activePage }) {
  return (
    <div className="relative border-b border-[#e2e8f0]">
      <div className="overflow-x-auto scrollbar-hide">
        <nav className="flex min-w-max">
          {navItems.map((item) => {
            const isActive = activePage === item.key;
            return (
              <Link
                key={item.key}
                to={item.to}
                className={`shrink-0 px-4 py-3 text-sm transition-colors relative ${
                  isActive
                    ? 'font-semibold text-[#6366f1] border-b-2 border-[#6366f1]'
                    : 'text-[#64748b] hover:text-ehaco-text'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Right fade gradient for scroll hint on mobile */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-ehaco-bg to-transparent md:hidden" />
    </div>
  );
}
