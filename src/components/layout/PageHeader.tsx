type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="border-b border-brand-border bg-gradient-to-b from-brand-surface-alt to-brand-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-lg text-brand-muted leading-relaxed">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
