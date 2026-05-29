import Link from 'next/link';

const resources = [
  {
    href: '/apply',
    title: 'Apply for Vietnam eVisa',
    description: 'Start your application online with guided support and secure payment.',
  },
  {
    href: '/check-requirement',
    title: 'Check visa requirements by country',
    description: 'See eligibility, documents, and fees for your nationality.',
  },
  {
    href: '/faq/vietnam-evisa-requirements',
    title: 'Complete eVisa requirements guide',
    description: 'Documents, photo rules, visa types, and step-by-step checklist.',
  },
  {
    href: '/faq/24-hour-vietnam-evisa',
    title: 'Urgent & express processing',
    description: 'What to do when you need a visa before your departure date.',
  },
  {
    href: '/fees',
    title: 'Visa fees & pricing',
    description: 'Government fees plus transparent service fees—no hidden charges.',
  },
];

export default function BlogVisaResources() {
  return (
    <aside
      className="mt-10 rounded-lg border-2 border-brand-primary bg-brand-surface p-6"
      aria-label="Vietnam eVisa resources"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-2">Planning your trip to Vietnam?</h2>
      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
        Sort out your entry visa before flights and hotels. These pages answer the questions
        travelers ask most often.
      </p>
      <ul className="space-y-3">
        {resources.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-md border border-gray-200 bg-white px-4 py-3 hover:border-brand-primary transition-colors"
            >
              <span className="font-semibold text-brand-primary">{item.title}</span>
              <span className="block text-sm text-gray-600 mt-0.5">{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
