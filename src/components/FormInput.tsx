interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export function FormInput({ label, type = 'text', placeholder, value, onChange, required, className }: FormInputProps) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-muted mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-ehaco-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
      />
    </div>
  );
}

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
  rows?: number;
}

export function FormTextarea({ label, placeholder, value, onChange, required, className, rows = 4 }: FormTextareaProps) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-muted mb-1">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full border border-ehaco-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition resize-none"
      />
    </div>
  );
}
