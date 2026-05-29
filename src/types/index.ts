export interface AddOn {
  addOnId: string;
  addOnName: string;
  type: string;
  pricePerPax: number;
}

export interface Passenger {
  id: string;
  fullName: string;
  nationality: string;
  passportNumber: string;
  dateOfBirth: string;
  gender: string;
  addOns?: AddOn[];
  originalGovernmentFee?: number;
  originalServiceFee?: number;
}

export interface AdditionalChargeDetail {
  type: string;
  name: string;
  pricePerPax: number;
  quantity: number;
  amount: number;
  passengerIds: string[];
}

export type UrgencyValue = '' | 'super_urgent_24h' | 'urgent_48h';

export interface ApplicationData {
  applicationId?: string;
  accountId?: string;
  status?: string;
  paymentStatus?: string;
  total?: number;
  destinationId: string;
  visaTypeId: string;
  passengerCount: number;
  urgency?: UrgencyValue;
  stayingStart?: string;
  stayingEnd?: string;
  fullName: string;
  email: string;
  areaCode: string;
  phoneNumber: string;
  gender: string;
  passengers: Passenger[]; // Define passenger type later
  documents: unknown[]; // Define document type later
  paymentMethod: string;
  passengerIds?: string[]; // Add passengerIds to store the IDs
  CardHolder?: {
    // Add CardHolder details
    name: string;
    cardType: string;
    cardNumber: string;
  };
  visa?: VisaType;
  updatedAt?: string;
}

export interface VisaType {
  id: string;
  name: string;
  waitTime: string | null;
  fees: number | null;
  requiredDocuments: string | null;
  allowedNationalities: string[] | null; // Can be an array of strings
  destinationId: string;
}
