import Image from 'next/image';
import Link from 'next/link';
import { isIndexableCountrySlug } from '@/lib/seo';
import { countryNameToSlug } from '@/lib/countrySlug';

type CountryListItemProps = {
  country: { name: string; code: string };
};

const baseClassName = 'flex items-center gap-3 bg-white rounded-lg shadow p-2 transition';

export default function CountryListItem({ country }: CountryListItemProps) {
  const slug = countryNameToSlug(country.name);
  const indexable = isIndexableCountrySlug(slug);
  const flagCode = country.code.toLowerCase();

  const content = (
    <>
      <Image
        src={`https://flagcdn.com/w40/${flagCode}.png`}
        alt={`${country.name} flag`}
        width={32}
        height={24}
        className={`rounded shadow transition-transform ${indexable ? 'group-hover:scale-110' : ''}`}
      />
      <span
        className={`text-brand-ink font-medium ${indexable ? 'group-hover:text-[var(--brand-primary)] transition-colors' : ''}`}
      >
        {country.name}
      </span>
    </>
  );

  if (indexable) {
    return (
      <Link
        href={`/check-requirement/${slug}`}
        className={`${baseClassName} group cursor-pointer hover:shadow-lg`}
      >
        {content}
      </Link>
    );
  }

  return (
    <span
      className={`${baseClassName} cursor-default opacity-90`}
      aria-disabled="true"
      title="Use the eligibility checker above to view requirements"
    >
      {content}
    </span>
  );
}
