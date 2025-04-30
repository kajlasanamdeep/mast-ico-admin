
import { KycUserData, KycStats, KycProvider } from "@/types/kyc";

// Expanded KYC data for the table
export const kycUsers: KycUserData[] = [
  {
    id: "INV-001",
    name: "John Smith",
    email: "john.smith@example.com",
    status: "Approved",
    submittedDate: "2025-03-15",
    completedDate: "2025-03-18",
    risk: "Low",
    documentType: "Passport",
    nationality: "United States",
    reviewedBy: "Sarah Adams",
    notes: "All documents valid and verified",
    documentExpiry: "2028-03-15"
  },
  {
    id: "INV-002",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    status: "Pending",
    submittedDate: "2025-04-20",
    risk: "Unknown",
    documentType: "Driver's License",
    nationality: "Canada",
    notes: "Awaiting document verification"
  },
  {
    id: "INV-003",
    name: "Michael Davis",
    email: "mdavis@example.com",
    status: "Additional Info Required",
    submittedDate: "2025-04-10",
    risk: "Medium",
    documentType: "National ID",
    nationality: "United Kingdom",
    reviewedBy: "Daniel Lee",
    notes: "Address verification needed"
  },
  {
    id: "INV-004",
    name: "Sarah Wilson",
    email: "swilson@example.com",
    status: "Rejected",
    submittedDate: "2025-04-05",
    completedDate: "2025-04-08",
    risk: "High",
    documentType: "Passport",
    nationality: "Australia",
    reviewedBy: "Mark Thompson",
    notes: "Documents appear to be tampered"
  },
  {
    id: "INV-005",
    name: "Robert Brown",
    email: "rbrown@example.com",
    status: "Approved",
    submittedDate: "2025-03-25",
    completedDate: "2025-03-28",
    risk: "Low",
    documentType: "Driver's License",
    nationality: "Germany",
    reviewedBy: "Lisa Wang",
    notes: "All clear",
    documentExpiry: "2027-03-25"
  },
  {
    id: "INV-006",
    name: "Jennifer Lee",
    email: "jlee@example.com",
    status: "Pending",
    submittedDate: "2025-04-25",
    risk: "Unknown",
    documentType: "National ID",
    nationality: "Singapore",
    notes: "Waiting for AML check completion"
  },
  {
    id: "INV-007",
    name: "David Miller",
    email: "dmiller@example.com",
    status: "Expired",
    submittedDate: "2024-10-15",
    completedDate: "2024-10-18",
    risk: "Medium",
    documentType: "Passport",
    nationality: "France",
    reviewedBy: "John Peterson",
    notes: "Documents expired, needs renewal",
    documentExpiry: "2025-01-15"
  },
  {
    id: "INV-008",
    name: "Maria Rodriguez",
    email: "mrodriguez@example.com",
    status: "Approved",
    submittedDate: "2025-04-02",
    completedDate: "2025-04-05",
    risk: "Low",
    documentType: "National ID",
    nationality: "Spain",
    reviewedBy: "Alex Johnson",
    notes: "Verified through secondary sources",
    documentExpiry: "2030-04-02"
  },
  {
    id: "INV-009",
    name: "James Wilson",
    email: "jwilson@example.com",
    status: "Additional Info Required",
    submittedDate: "2025-04-18",
    risk: "Medium",
    documentType: "Driver's License",
    nationality: "New Zealand",
    reviewedBy: "Emily Chen",
    notes: "Need additional proof of address"
  },
  {
    id: "INV-010",
    name: "Anna Kowalski",
    email: "akowalski@example.com",
    status: "Pending",
    submittedDate: "2025-04-27",
    risk: "Unknown",
    documentType: "Passport",
    nationality: "Poland",
    notes: "First-time verification in progress"
  }
];

// Extended KYC status statistics
export const kycStats: KycStats = {
  pending: 3,
  approved: 3,
  rejected: 1,
  additionalInfo: 2,
  expired: 1,
  totalUsers: 10,
  completionRate: '40%',
  avgProcessingTime: '2.5 days',
  highRiskRate: '10%'
};

// KYC provider options
export const kycProviders: KycProvider[] = [
  { value: "veriff", label: "Veriff" },
  { value: "jumio", label: "Jumio" },
  { value: "onfido", label: "Onfido" },
  { value: "shufti", label: "Shufti Pro" },
  { value: "sumsub", label: "Sum&Substance" },
  { value: "trulioo", label: "Trulioo" },
  { value: "idology", label: "IDology" }
];
