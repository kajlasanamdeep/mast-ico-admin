
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
import { 
  Shield, 
  ShieldCheck, 
  User, 
  FileSearch, 
  Lock 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the type for KYC user data
type KycUserData = {
  id: string;
  name: string;
  email: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Additional Info Required';
  submittedDate: string;
  completedDate?: string;
  risk: 'Low' | 'Medium' | 'High' | 'Unknown';
  documentType: string;
};

// Dummy KYC data for the table
const kycUsers: KycUserData[] = [
  {
    id: "INV-001",
    name: "John Smith",
    email: "john.smith@example.com",
    status: "Approved",
    submittedDate: "2025-03-15",
    completedDate: "2025-03-18",
    risk: "Low",
    documentType: "Passport"
  },
  {
    id: "INV-002",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    status: "Pending",
    submittedDate: "2025-04-20",
    risk: "Unknown",
    documentType: "Driver's License"
  },
  {
    id: "INV-003",
    name: "Michael Davis",
    email: "mdavis@example.com",
    status: "Additional Info Required",
    submittedDate: "2025-04-10",
    risk: "Medium",
    documentType: "National ID"
  },
  {
    id: "INV-004",
    name: "Sarah Wilson",
    email: "swilson@example.com",
    status: "Rejected",
    submittedDate: "2025-04-05",
    completedDate: "2025-04-08",
    risk: "High",
    documentType: "Passport"
  },
  {
    id: "INV-005",
    name: "Robert Brown",
    email: "rbrown@example.com",
    status: "Approved",
    submittedDate: "2025-03-25",
    completedDate: "2025-03-28",
    risk: "Low",
    documentType: "Driver's License"
  },
  {
    id: "INV-006",
    name: "Jennifer Lee",
    email: "jlee@example.com",
    status: "Pending",
    submittedDate: "2025-04-25",
    risk: "Unknown",
    documentType: "National ID"
  }
];

// KYC status statistics
const kycStats = {
  pending: 2,
  approved: 2,
  rejected: 1,
  additionalInfo: 1,
  totalUsers: 6,
  completionRate: '50%'
};

const KycManagement = () => {
  const { toast } = useToast();
  const [showDetails, setShowDetails] = useState(false);
  
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
            <DialogContent>
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
                    <option value="veriff">Veriff</option>
                    <option value="jumio">Jumio</option>
                    <option value="onfido">Onfido</option>
                    <option value="shufti">Shufti Pro</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <FormLabel>API Key</FormLabel>
                  <Input type="password" placeholder="Enter your provider API key" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="required" />
                  <label
                    htmlFor="required"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Require KYC before investment
                  </label>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div>

      {showDetails ? (
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
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kycUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>
                  <div>
                    <div>{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold 
                    ${user.status === 'Approved' ? 'bg-green-100 text-green-800' : ''}
                    ${user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${user.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
                    ${user.status === 'Additional Info Required' ? 'bg-blue-100 text-blue-800' : ''}
                  `}>
                    {user.status}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                    ${user.risk === 'Low' ? 'bg-green-50 text-green-700' : ''}
                    ${user.risk === 'Medium' ? 'bg-yellow-50 text-yellow-700' : ''}
                    ${user.risk === 'High' ? 'bg-red-50 text-red-700' : ''}
                    ${user.risk === 'Unknown' ? 'bg-gray-50 text-gray-700' : ''}
                  `}>
                    {user.risk}
                  </div>
                </TableCell>
                <TableCell>{user.submittedDate}</TableCell>
                <TableCell>{user.documentType}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="min-h-[300px] flex items-center justify-center border border-dashed border-border rounded-lg p-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium">KYC/AML Dashboard</h3>
            <p className="text-muted-foreground mt-2">Click "Show Details" to view verification data or request early access for more features.</p>
            <Button variant="outline" className="mt-4" onClick={handleEarlyAccessClick}>Request Early Access</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycManagement;
