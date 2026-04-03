type StatusBadgeProps = {
  label: string;
  colorMap: Record<string, string>;
  className?: string;
};

export default function StatusBadge({ label, colorMap, className = '' }: StatusBadgeProps) {
  const colors = colorMap[label] || 'bg-gray-100 text-gray-700';
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${colors} ${className}`}>
      {label}
    </span>
  );
}
