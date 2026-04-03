import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-12 text-center">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <p className="font-bold text-lg text-ehaco-text mb-2">{title}</p>
      <p className="text-sm text-muted mb-5">{subtitle}</p>
      {action}
    </div>
  );
}
