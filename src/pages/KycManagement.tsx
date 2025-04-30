
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  ShieldCheck, 
  User, 
  FileSearch, 
  Lock,
  AlertTriangle,
  Clock,
  Calendar,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the type for KYC user data
type KycUserData = {
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

// Expanded KYC data for the table
const kycUsers: KycUserData[] = [
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
const kycStats = {
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
const kycProviders = [
  { value: "veriff", label: "Veriff" },
  { value: "jumio", label: "Jumio" },
  { value: "onfido", label: "Onfido" },
  { value: "shufti", label: "Shufti Pro" },
  { value: "sumsub", label: "Sum&Substance" },
  { value: "trulioo", label: "Trulioo" },
  { value: "idology", label: "IDology" }
];

const KycManagement = () => {
  const { toast } = useToast();
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleConfigureClick = () => {
    toast({
      title: "KYC Provider Configuration",
      description: "KYC provider settings are being updated.",
    });
  };

  const handleEarlyAccessClick = () => {
    toast({
      title: "Early Access Request Sent",
      description: "You'll be notified when more features become available.",
    });
  };

  const handleDetailsClick = (userId: string) => {
    toast({
      title: "Viewing User Details",
      description: `Loading verification details for ${userId}`,
    });
  };

  // Filter users based on search term
  const filteredUsers = kycUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">KYC/AML Management</h1>
          <p className="text-muted-foreground">Verify investor identities and maintain compliance</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Configure KYC Provider</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Configure KYC Provider</DialogTitle>
                <DialogDescription>
                  Connect your KYC/AML verification provider and set verification requirements.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <FormLabel>KYC Provider</FormLabel>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    {kycProviders.map(provider => (
                      <option key={provider.value} value={provider.value}>{provider.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <FormLabel>API Key</FormLabel>
                  <Input type="password" placeholder="Enter your provider API key" />
                </div>
                <div className="grid gap-2">
                  <FormLabel>Webhook URL</FormLabel>
                  <Input type="text" placeholder="https://your-app.com/api/kyc/webhook" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="required" defaultChecked />
                    <label
                      htmlFor="required"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Require KYC before investment
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="aml" defaultChecked />
                    <label
                      htmlFor="aml"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enable AML screening
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleConfigureClick}>Save Configuration</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Verifications</CardTitle>
            <User className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kycStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              KYC submissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Verification Rate</CardTitle>
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kycStats.completionRate}</div>
            <p className="text-xs text-muted-foreground">
              {kycStats.approved} approved of {kycStats.totalUsers} total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <FileSearch className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kycStats.pending + kycStats.additionalInfo}</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Rejection Rate</CardTitle>
            <Shield className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((kycStats.rejected / kycStats.totalUsers) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              {kycStats.rejected} rejected applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kycStats.avgProcessingTime}</div>
            <p className="text-xs text-muted-foreground">
              Average verification time
            </p>
          </CardContent>
        </Card>
      </div>

      {showDetails ? (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 w-full max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, email or ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Badge variant="outline" className="gap-1 px-3 py-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Badge>
            </div>
            <div className="text-muted-foreground text-sm">
              Showing {filteredUsers.length} of {kycUsers.length} verifications
            </div>
          </div>
          
          <Table>
            <TableCaption>A list of KYC/AML verifications for your investors.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Investor ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Document Type</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    <div>
                      <div>{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`
                      ${user.status === 'Approved' ? 'bg-green-100 text-green-800' : ''}
                      ${user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${user.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
                      ${user.status === 'Additional Info Required' ? 'bg-blue-100 text-blue-800' : ''}
                      ${user.status === 'Expired' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`
                      ${user.risk === 'Low' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                      ${user.risk === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                      ${user.risk === 'High' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                      ${user.risk === 'Unknown' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                    `}>
                      {user.risk}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.submittedDate}</TableCell>
                  <TableCell>{user.documentType}</TableCell>
                  <TableCell>{user.nationality || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleDetailsClick(user.id)}>View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-end space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className="min-h-[300px] flex items-center justify-center border border-dashed border-border rounded-lg p-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium">KYC/AML Dashboard</h3>
            <p className="text-muted-foreground mt-2">Click "Show Details" to view verification data or request early access for more features.</p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <Button variant="outline" onClick={handleEarlyAccessClick}>Request Early Access</Button>
              <Button onClick={() => setShowDetails(true)}>Show Verification Data</Button>
            </div>
          </div>
        </div>
      )}

      {/* Risk Assessment Section */}
      {showDetails && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Risk Assessment Overview</CardTitle>
            <CardDescription>Monitor KYC/AML risk levels across your investor base</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-medium">Low Risk</span>
                  <span className="text-green-600 font-semibold">30%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-medium">Medium Risk</span>
                  <span className="text-yellow-600 font-semibold">20%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-medium">High Risk</span>
                  <span className="text-red-600 font-semibold">10%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between p-2 border rounded-md bg-yellow-50 border-yellow-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="text-sm text-yellow-700 font-medium">2 users flagged for enhanced due diligence</span>
              </div>
              <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700">Review</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KycManagement;
