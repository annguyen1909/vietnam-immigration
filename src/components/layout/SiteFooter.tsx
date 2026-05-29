import Link from 'next/link';
import TrustBadges from '@/components/trust/TrustBadges';

const columns = [
  {
    title: 'Apply',
    links: [
      { label: 'Start application', href: '/apply' },
      { label: 'Visa fees', href: '/fees' },
      { label: 'Processing times', href: '/processing' },
      { label: 'Check status', href: '/applications' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'Requirements by country', href: '/check-requirement' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Troubleshooting', href: '/troubleshooting' },
      { label: 'Travel news', href: '/blog' },
      { label: 'Embassies', href: '/embassy' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of service', href: '/terms' },
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Refund policy', href: '/refund-policy' },
      { label: 'Disclaimers', href: '/disclaimers' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-brand-border bg-brand-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-xl font-bold text-white">Vietnam eVisa</p>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Professional online assistance for Vietnam entry visas. Clear pricing, guided
              applications, and support when you need it.
            </p>
            <p className="mt-4 text-sm text-white/80">
              <span className="text-brand-accent-light font-medium">US</span> +1 323 286 4541
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-accent-light">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/75 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <TrustBadges layout="row" variant="dark" />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Vietnam Official eVisa Immigration Assistance Service.
            Private service — not affiliated with the Government of Vietnam.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-white/60">
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/cookie-policy" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
