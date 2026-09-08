export const VIETNAM_ENTRY_AIRPORTS = [
  'Cat Bi Airport Border Gate',
  'Cam Ranh Airport Border Gate',
  'Can Tho Airport Border Gate',
  'Da Nang Airport Border Gate',
  'Noi Bai Airport Border Gate',
  'Phu Quoc Airport Border Gate',
  'Phu Bai Airport Border Gate',
  'Tan Son Nhat Airport Border Gate',
  'Van Don Airport Border Gate',
  'Tho Xuan Airport Border Gate',
  'Dong Hoi Airport Border Gate',
  'Phu Cat Airport Border Gate',
  'Lien Khuong Airport Border Gate',
  'Vinh Airport Border Gate',
] as const;

export function isVietnamEntryAirport(value: string): boolean {
  return (VIETNAM_ENTRY_AIRPORTS as readonly string[]).includes(value);
}
