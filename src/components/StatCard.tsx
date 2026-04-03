import { Link } from 'react-router-dom';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  to?: string;
  className?: string;
}

export default function StatCard({ label, value, change, to, className }: StatCardProps) {
  const content = (
    <>
      <p className="text-sm text-muted">{label}</p>
      <p className="text-3xl font-black text-ehaco-text mt-1">{value}</p>
      {change && (
        <p className="text-xs font-medium text-emerald-600 mt-1">{change}</p>
      )}
    </>
  );

  const baseClass = `bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm p-5 ${className || ''}`;

  if (to) {
    return (
      <Link to={to} className={`${baseClass} hover:shadow-md hover:ring-accent/30 transition-all`}>
        {content}
      </Link>
    );
  }

  return <div className={baseClass}>{content}</div>;
}
