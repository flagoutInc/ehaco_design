type TabControlProps = {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  variant?: 'pill' | 'underline';
  /** Optional render function for badge/count after the label */
  renderSuffix?: (tab: string) => React.ReactNode;
};

export default function TabControl({
  tabs,
  activeTab,
  onTabChange,
  variant = 'pill',
  renderSuffix,
}: TabControlProps) {
  if (variant === 'underline') {
    return (
      <div className="flex gap-1 sm:gap-4 border-b border-ehaco-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`pb-3 px-2 text-base font-medium transition relative whitespace-nowrap ${
              activeTab === tab
                ? 'text-accent'
                : 'text-gray-500 hover:text-ehaco-text'
            }`}
          >
            {tab}
            {renderSuffix?.(tab)}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
            )}
          </button>
        ))}
      </div>
    );
  }

  // pill variant (default)
  return (
    <div className="flex items-center gap-1 bg-white rounded-xl border border-ehaco-border p-0.5 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 text-sm rounded-lg transition ${
            activeTab === tab
              ? 'bg-accent text-white font-medium shadow-sm'
              : 'text-muted hover:text-ehaco-text'
          }`}
        >
          {tab}
          {renderSuffix?.(tab)}
        </button>
      ))}
    </div>
  );
}
