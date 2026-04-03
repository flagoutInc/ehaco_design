import { useState, useRef, useEffect } from 'react'
import OrgSidebar from './OrgSidebar'

function OrgUserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition">
        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-ehaco-border shadow-xl py-1 z-50">
          <a href="#/org/company" className="flex items-center gap-2 px-4 py-2.5 text-sm text-ehaco-text hover:bg-gray-50 transition" onClick={() => setOpen(false)}>
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.212-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            企業設定
          </a>
          <div className="my-1 border-t border-ehaco-border" />
          <a href="#/org/login" className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50 transition" onClick={() => setOpen(false)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
            ログアウト
          </a>
        </div>
      )}
    </div>
  );
}

interface OrgPageProps {
  activePage: string;
  children: React.ReactNode;
}

function OrgPage({ activePage, children }: OrgPageProps) {
  return (
    <div className="min-h-screen bg-ehaco-bg">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-ehaco-border/50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 lg:pl-60">
          <div className="flex items-center gap-3">
            <a href="#/org/dashboard" className="flex items-center">
              <img src="/ehaco_design/ehaco-logo.png" alt="ehaco!" className="h-7 object-contain" />
            </a>
            <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-md">主催者管理</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#/org/notifications" className="relative text-muted hover:text-ehaco-text transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">2</span>
            </a>
            <a href="#/" className="text-xs text-muted hover:text-accent transition flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              参加者サイト
            </a>
            <OrgUserMenu />
          </div>
        </div>
      </header>
      <OrgSidebar activePage={activePage} />
      <main className="pt-14 lg:pl-56">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 pb-20 lg:pb-0">
          {children}
        </div>
      </main>
    </div>
  )
}

export default OrgPage
