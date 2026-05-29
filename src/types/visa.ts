export interface VisaType {
  id: string;
  name: string;
  waitTime: string | null;
  fees: number | null;
  requiredDocuments: string | null;
  allowedNationalities: unknown | null; // Can be an array of strings
  destinationId: string;
}
