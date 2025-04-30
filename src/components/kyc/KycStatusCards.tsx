
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { User, ShieldCheck, FileSearch, Shield, Clock } from "lucide-react";

type KycStatsProps = {
  kycStats: {
    pending: number;
    approved: number;
    rejected: number;
    additionalInfo: number;
    expired: number;
    totalUsers: number;
    completionRate: string;
    avgProcessingTime: string;
    highRiskRate: string;
  }
}

export const KycStatusCards = ({ kycStats }: KycStatsProps) => {
  return (
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
  );
};
