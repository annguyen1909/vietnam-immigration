import { prisma } from '@/lib/prisma';
import type { VisaType } from '@/types/visa';

export const VIETNAM_DESTINATION_ID = 'vietnam';

export type VietnamVisaTypeView = VisaType & {
  applyQuery: string;
  category: 'Tourist' | 'Business';
  entry: 'Single Entry' | 'Multiple Entries';
  durationDays: number;
  govFee: number;
};

/** Normalize waitTime for display (fastest → slowest). */
export function formatStandardWaitTime(waitTime: string | null | undefined): string {
  if (!waitTime?.trim()) return '—';

  const trimmed = waitTime.trim();
  const inverted =
    /^from\s+3\s+working\s+days?\s+to\s+1\s+working\s+day$/i.test(trimmed) ||
    /^3\s+working\s+days?\s+to\s+1\s+working\s+day$/i.test(trimmed);

  if (inverted) return 'From 1 working day to 3 working days';

  return trimmed;
}

export function getVisaMaxStayDays(visaName: string): number {
  const match = visaName.match(/(\d+)\s*days?/i);
  if (match) return parseInt(match[1], 10);
  return 90;
}

/**
 * Parse a visa type's requiredDocuments field into a clean list.
 * The DB stores it as a JSON array string (e.g. '["Passport","Photo"]'),
 * but legacy rows may hold plain/comma-separated text.
 */
export function parseRequiredDocuments(value: string | null | undefined): string[] {
  if (!value?.trim()) return [];
  const trimmed = value.trim();

  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => {
          if (typeof item === 'string') return item;
          if (item && typeof item === 'object' && 'name' in item) {
            return String((item as { name: unknown }).name);
          }
          return String(item);
        })
        .map((s) => s.trim())
        .filter(Boolean);
    }
  } catch {
    // Not JSON — fall through to plain-text handling.
  }

  return trimmed.includes(',')
    ? trimmed
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [trimmed];
}

export function deriveApplyQueryFromVisaId(id: string): string {
  const base = id.replace(/^vietnam-/, '').replace(/-90-days$/, '');
  return base || id;
}

export function parseVisaUiFields(
  id: string,
  name: string,
  fees: number | null
): Pick<VietnamVisaTypeView, 'applyQuery' | 'category' | 'entry' | 'durationDays' | 'govFee'> {
  const lower = name.toLowerCase();
  return {
    applyQuery: deriveApplyQueryFromVisaId(id),
    category: lower.includes('business') ? 'Business' : 'Tourist',
    entry: lower.includes('multiple') ? 'Multiple Entries' : 'Single Entry',
    durationDays: getVisaMaxStayDays(name),
    govFee: fees ?? 0,
  };
}

export function toVietnamVisaTypeView(row: VisaType): VietnamVisaTypeView {
  return {
    ...row,
    ...parseVisaUiFields(row.id, row.name, row.fees),
  };
}

export async function getVisaTypesByDestination(
  destinationId: string = VIETNAM_DESTINATION_ID
): Promise<VietnamVisaTypeView[]> {
  const rows = await prisma.visaType.findMany({
    where: { destinationId },
    select: {
      id: true,
      name: true,
      fees: true,
      waitTime: true,
      requiredDocuments: true,
      allowedNationalities: true,
      destinationId: true,
    },
    orderBy: { fees: 'asc' },
  });

  return rows.map(toVietnamVisaTypeView);
}

export async function getVietnamVisaTypes(): Promise<VietnamVisaTypeView[]> {
  return getVisaTypesByDestination(VIETNAM_DESTINATION_ID);
}

export function buildVisaTypesContent(visaTypes: VietnamVisaTypeView[]) {
  return visaTypes.map((v) => ({
    name: v.name,
    description: `${v.entry} for ${v.durationDays} days. Government fee $${v.govFee}.`,
  }));
}

export function buildVisaTypesFaqStay(visaTypes: VietnamVisaTypeView[]): string {
  return visaTypes
    .map((v) => `**${v.name}:** Up to ${v.durationDays} days, ${v.entry.toLowerCase()}.`)
    .join('\n');
}

/** Match ?type= query param to a DB visa type (no static fallback list). */
export function matchVisaTypeFromQuery(
  visaTypes: { id: string; name: string }[],
  query: string
): { id: string; name: string } | undefined {
  const q = query.toLowerCase().replace(/_/g, '-');

  const exactId = visaTypes.find((v) => v.id === q || v.id.endsWith(q));
  if (exactId) return exactId;

  const byApplyQuery = visaTypes.find((v) => deriveApplyQueryFromVisaId(v.id) === q);
  if (byApplyQuery) return byApplyQuery;

  const isMultiple = q.includes('multiple');
  const isSingle = q.includes('single');
  const isBusiness = q.includes('business');
  const isTourist = q.includes('tourist');

  if (isTourist || isBusiness || isMultiple || isSingle) {
    return visaTypes.find((v) => {
      const name = v.name.toLowerCase();
      if (isBusiness && !name.includes('business')) return false;
      if (isTourist && !name.includes('tourist')) return false;
      if (isMultiple && !name.includes('multiple')) return false;
      if (isSingle && name.includes('multiple')) return false;
      return true;
    });
  }

  return visaTypes.find((v) => v.name.toLowerCase().includes(q) || v.id.includes(q));
}
