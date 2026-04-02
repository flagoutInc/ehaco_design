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
      { label: 'お問合せ（利用者）', to: '/contact' },
      { label: 'お問合せ（主催者）', to: '/contact/organizer' },
    ],
  },
];

const socialLinks = [
  { label: 'X', href: 'https://x.com/ehaco2024', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'Facebook', href: 'https://www.facebook.com/ehaco/', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Instagram', href: 'https://www.instagram.com/ehaco_2024/', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCS9LJ8rmQalrNjsvJs0haLA', path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/showcase/ehaco/', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
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
              AI活用・DX推進・組織づくり。<br />
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
