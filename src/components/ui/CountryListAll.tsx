import { countries } from '@/data/countries';
import CountryListItem from '@/components/ui/CountryListItem';

// Group countries by first letter
const grouped = countries.reduce(
  (acc, country) => {
    const letter = country.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(country);
    return acc;
  },
  {} as Record<string, typeof countries>
);

export default function CountryListAll() {
  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-2">
      <h2 className="text-3xl font-extrabold text-[#ffb400] mb-8 text-center drop-shadow">
        All Countries
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.keys(grouped)
          .sort()
          .map((letter) => (
            <div key={letter} className="min-w-[120px] flex-1">
              <h3 className="text-2xl font-bold text-white mb-4 border-b-2 border-brand-accent pb-1 text-center">
                {letter}
              </h3>
              <ul className="flex flex-col gap-3">
                {grouped[letter].map((country) => (
                  <li key={country.code + country.name}>
                    <CountryListItem country={country} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
