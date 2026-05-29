/**
 * @deprecated Static VIETNAM_VISA_TYPES removed — visa types are loaded from the database.
 * Use `getVietnamVisaTypes()` from `@/lib/vietnamVisa` (server) or `/api/destinations/vietnam/visa-types` (client).
 */
export {
  getVisaMaxStayDays,
  matchVisaTypeFromQuery,
  deriveApplyQueryFromVisaId,
  buildVisaTypesContent,
  buildVisaTypesFaqStay,
  type VietnamVisaTypeView,
} from '@/lib/vietnamVisa';
