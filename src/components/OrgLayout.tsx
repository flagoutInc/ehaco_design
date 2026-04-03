import { Link, Outlet } from 'react-router-dom';
import OrgSidebar from './OrgSidebar';

type Props = {
  activePage: string;
};

export default function OrgLayout({ activePage }: Props) {
  return (
    <div className="min-h-screen bg-ehaco-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-ehaco-border/50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 lg:pl-60">
          <div className="flex items-center gap-3">
            <Link to="/org/events" className="flex items-center">
              <img src="/ehaco_design/ehaco-logo.png" alt="ehaco!" className="h-7 object-contain" />
            </Link>
            <span className="text-xs font-medium text-muted bg-accent/10 text-accent px-2 py-0.5 rounded-md">主催者管理</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs text-muted hover:text-accent transition flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              参加者サイト
            </Link>
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <OrgSidebar activePage={activePage} />

      {/* Main content */}
      <main className="pt-14 lg:pl-56">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
