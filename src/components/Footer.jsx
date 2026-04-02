import { useState } from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'ehaco!について',
    links: [
      { label: 'ehaco!とは', to: '/about' },
      { label: 'イベント掲載', to: '/for-organizers' },
      { label: '運営会社', to: '/company' },
      { label: '会員登録', to: '/register' },
      { label: '主催者登録', to: '/org/register' },
    ],
  },
  {
    title: 'サポート',
    links: [
      { label: '参加者向け利用規約', to: '/terms' },
      { label: '主催者向け利用規約', to: '/terms/organizer' },
      { label: '個人情報の取り扱い', to: '/privacy' },
      { label: 'お問合せ（利用者）', href: 'https://40j2oa.share-na2.hsforms.com/2Ot6344zATAmokI3CPqJZ6w' },
      { label: 'お問合せ（主催者）', href: 'https://40j2oa.share-na2.hsforms.com/2-yS1GfZ_SXCk-YxFEd4Q0w' },
    ],
  },
];

const socialLinks = [
  { label: 'X', href: 'https://x.com/ehaco_net', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'Facebook', href: 'https://www.facebook.com/ehaco.net', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/ehaco', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
];

function AccordionSection({ title, links }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/10 md:border-none">
      {/* Mobile: accordion toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 md:hidden"
      >
        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">{title}</h3>
        <svg
          className={`w-4 h-4 text-white/40 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {/* PC: always visible title */}
      <h3 className="hidden md:block mb-4 text-sm font-semibold text-white/70 uppercase tracking-wider">{title}</h3>
      {/* Links */}
      <ul className={`space-y-4 overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 md:!pb-0 ${
        open ? 'max-h-60 opacity-100 pb-4' : 'max-h-0 opacity-0'
      }`}>
        {links.map(({ label, href, to }) => (
          <li key={label}>
            {to ? (
              <Link to={to} className="text-sm md:text-base text-white/40 transition hover:text-white">{label}</Link>
            ) : (
              <a href={href} className="text-sm md:text-base text-white/40 transition hover:text-white">{label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-16 md:px-6">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-10 text-left">
          {/* Column 1: Logo & description & SNS */}
          <div className="pb-6 md:pb-0">
            <Link to="/">
              <span className="text-3xl font-black text-white tracking-tight"><span className="text-[#4FC3F7]">e</span>haco<span className="text-[#4DB6AC]">!</span></span>
            </Link>
            <p className="mt-4 text-base leading-relaxed text-white/40">
              テクノロジー領域の
              ウェビナー・イベント検索サイト
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Columns 2-3: Accordion on mobile, static on PC */}
          {sections.map((section) => (
            <AccordionSection key={section.title} title={section.title} links={section.links} />
          ))}
        </div>

        <div className="mt-8 md:mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-xs md:text-sm text-white/40">&copy; 2026 ehaco! All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
