import type { ReactNode } from 'react';

export type FilterKey = 'category' | 'area' | 'format';

export interface FilterDef {
  key: FilterKey;
  label: string;
  type: 'checkbox' | 'radio';
  options: string[];
}

/** Extends FilterDef with getter/setter/toggle so switch statements become map lookups. */
export interface FilterDefWithAccessors extends FilterDef {
  /** Current selected values (array for checkbox, single-element array for radio). */
  getSelected: () => string[];
  /** Whether a specific option is currently selected. */
  isSelected: (option: string) => boolean;
  /** Toggle an option on/off (radio: toggles to 'すべて' if already selected). */
  toggle: (option: string) => void;
  /** Clear this filter group entirely. */
  clear: () => void;
  /** Number of active selections in this group. */
  getCount: () => number;
}

interface FilterModalProps {
  filterDef: FilterDefWithAccessors;
  filteredCount: number;
  onClose: () => void;
}

export default function FilterModal({ filterDef, filteredCount, onClose }: FilterModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel: half-sheet on mobile, centered on desktop */}
      <div className="relative w-full max-h-[70vh] rounded-t-2xl md:h-auto md:max-h-[80vh] md:max-w-lg md:mx-4 bg-white md:rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ehaco-border shrink-0">
          <h2 className="text-lg font-black text-ehaco-text">{filterDef.label}</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-muted hover:text-ehaco-text transition-colors rounded-lg hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Options */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="space-y-1">
            {filterDef.options.map((option) => {
              const checked = filterDef.isSelected(option);
              return (
                <label
                  key={option}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors ${
                    checked ? 'bg-accent/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type={filterDef.type === 'radio' ? 'radio' : 'checkbox'}
                    name={filterDef.key}
                    checked={checked}
                    onChange={() => filterDef.toggle(option)}
                    className="w-5 h-5 rounded border-ehaco-border text-accent focus:ring-accent"
                  />
                  <span className={`text-sm ${checked ? 'font-semibold text-accent' : 'text-ehaco-text'}`}>
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t border-ehaco-border shrink-0">
          <button
            onClick={() => filterDef.clear()}
            className="flex-1 py-2.5 border border-ehaco-border rounded-xl text-sm text-muted hover:bg-gray-50 transition font-medium"
          >
            クリア
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-light transition"
          >
            適用する（{filteredCount}件）
          </button>
        </div>
      </div>
    </div>
  );
}
