
export type KycUserData = {
  id: string;
  name: string;
  email: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Additional Info Required' | 'Expired';
  submittedDate: string;
  completedDate?: string;
  risk: 'Low' | 'Medium' | 'High' | 'Unknown';
  documentType: string;
  nationality?: string;
  reviewedBy?: string;
  notes?: string;
  documentExpiry?: string;
};

// Extended KYC status statistics
export type KycStats = {
  pending: number;
  approved: number;
  rejected: number;
  additionalInfo: number;
  expired: number;
  totalUsers: number;
  completionRate: string;
  avgProcessingTime: string;
  highRiskRate: string;
};

// KYC provider options
export type KycProvider = {
  value: string;
  label: string;
};
