import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ehaco! カスタムMarkdownコンポーネント
export const mdComponents = {
  // チェックリスト: accent背景カードにチェックマーク付き
  ul({ children, className }) {
    const items = Array.isArray(children) ? children : [children];
    const hasCheckbox = items.some((c) => {
      const inner = c?.props?.children;
      if (!Array.isArray(inner)) return false;
      return inner.some((el) => el?.props?.type === 'checkbox');
    });
    if (hasCheckbox) {
      return (
        <div className="bg-accent/5 rounded-2xl p-4 md:p-6 not-prose">
          <ul className="space-y-3">{children}</ul>
        </div>
      );
    }
    return <ul className={className}>{children}</ul>;
  },
  li({ children, checked }) {
    if (checked !== null && checked !== undefined) {
      return (
        <li className="flex items-start gap-3 text-sm text-gray-700 list-none">
          <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
          <span>{children}</span>
        </li>
      );
    }
    return <li>{children}</li>;
  },
  // checkbox非表示（チェックマークSVGで代替）
  input({ type, checked, ...props }) {
    if (type === 'checkbox') return null;
    return <input type={type} checked={checked} {...props} />;
  },
  // テーブル: ehaco仕様
  table({ children }) {
    return (
      <div className="not-prose">
        <table className="w-full text-sm">{children}</table>
      </div>
    );
  },
  thead({ children }) {
    return (
      <thead className="border-b-2 border-ehaco-border">
        {children}
      </thead>
    );
  },
  th({ children }) {
    return <th className="py-2.5 px-3 text-left text-xs font-bold text-ehaco-text uppercase tracking-wider">{children}</th>;
  },
  tr({ children }) {
    return <tr className="border-b border-ehaco-border/50">{children}</tr>;
  },
  td({ children }) {
    return <td className="py-3 md:py-4 px-3 align-top">{children}</td>;
  },
  // 引用: accent左ボーダー + 薄い背景
  blockquote({ children }) {
    return (
      <blockquote className="not-prose border-l-4 border-accent bg-accent/5 rounded-r-xl px-5 py-4 text-sm text-muted leading-relaxed my-6">
        {children}
      </blockquote>
    );
  },
};

// Markdownをehaco仕様で描画するコンポーネント
export default function MarkdownRenderer({ children, className = '' }) {
  return (
    <div className={`prose prose-ehaco max-w-none text-base leading-relaxed ${className}`}>
      <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {children}
      </Markdown>
    </div>
  );
}
