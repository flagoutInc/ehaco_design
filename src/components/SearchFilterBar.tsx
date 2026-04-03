import type { ReactNode } from 'react';

interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  children?: ReactNode;
}

export default function SearchFilterBar({ searchValue, onSearchChange, placeholder = '検索...', children }: SearchFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4 border-b border-ehaco-border">
      <div className="flex items-center flex-1 bg-ehaco-bg rounded-xl border border-ehaco-border px-3 gap-2 w-full sm:w-auto">
        <svg className="h-4 w-4 text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 py-2.5 text-sm outline-none bg-transparent"
        />
      </div>
      {children}
    </div>
  );
}
