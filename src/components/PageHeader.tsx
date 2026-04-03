type PageHeaderProps = {
  title: string;
  subtitle?: string;
  /** 'admin' = plain h1 + subtitle; 'org' = left accent border, larger responsive text */
  variant?: 'admin' | 'org';
};

export default function PageHeader({ title, subtitle, variant = 'admin' }: PageHeaderProps) {
  if (variant === 'org') {
    return (
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-muted mt-1 pl-5">{subtitle}</p>}
      </div>
    );
  }

  // admin variant (default)
  return (
    <div>
      <h1 className="text-2xl font-black text-ehaco-text">{title}</h1>
      {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
    </div>
  );
}
