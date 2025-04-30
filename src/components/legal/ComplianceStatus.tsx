
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldCheck, ShieldX, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const complianceAreas = [
  {
    name: "Customer Data Protection",
    status: "compliant",
    lastAudit: "2025-03-01",
    nextAudit: "2025-06-01",
    risk: "low",
    details: "All customer data is encrypted and stored securely according to GDPR standards."
  },
  {
    name: "Anti-Money Laundering",
    status: "compliant",
    lastAudit: "2025-02-15",
    nextAudit: "2025-05-15",
    risk: "low",
    details: "Transaction monitoring and suspicious activity reporting in place."
  },
  {
    name: "Know Your Customer",
    status: "compliant",
    lastAudit: "2025-02-15",
    nextAudit: "2025-05-15",
    risk: "low",
    details: "Identity verification process implemented for all investors."
  },
  {
    name: "Securities Compliance",
    status: "attention",
    lastAudit: "2025-01-10",
    nextAudit: "2025-04-10",
    risk: "medium",
    details: "Token classification review needed for recent regulatory updates."
  },
  {
    name: "Cybersecurity",
    status: "compliant",
    lastAudit: "2025-03-05",
    nextAudit: "2025-06-05",
    risk: "low",
    details: "Security audits completed and vulnerabilities addressed."
  },
  {
    name: "Tax Reporting",
    status: "non-compliant",
    lastAudit: "2025-02-01",
    nextAudit: "2025-03-15",
    risk: "high",
    details: "Incomplete tax documentation for Q1 2025."
  }
];

export const ComplianceStatus = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <ShieldCheck className="h-5 w-5 text-green-500" />;
      case "attention":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "non-compliant":
        return <ShieldX className="h-5 w-5 text-red-500" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-500">Compliant</Badge>;
      case "attention":
        return <Badge variant="secondary" className="bg-amber-500 text-white">Needs Attention</Badge>;
      case "non-compliant":
        return <Badge variant="destructive">Non-Compliant</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge variant="outline" className="border-green-500 text-green-500">Low Risk</Badge>;
      case "medium":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Medium Risk</Badge>;
      case "high":
        return <Badge variant="outline" className="border-red-500 text-red-500">High Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Calculate compliance metrics
  const compliantCount = complianceAreas.filter(area => area.status === "compliant").length;
  const attentionCount = complianceAreas.filter(area => area.status === "attention").length;
  const nonCompliantCount = complianceAreas.filter(area => area.status === "non-compliant").length;
  const complianceRate = Math.round((compliantCount / complianceAreas.length) * 100);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Compliance Rate</p>
                  <p className="text-2xl font-bold">{complianceRate}%</p>
                </div>
                <Shield className={`h-8 w-8 ${complianceRate >= 90 ? 'text-green-500' : complianceRate >= 70 ? 'text-amber-500' : 'text-red-500'}`} />
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Compliant Areas</p>
                <p className="text-2xl font-bold text-green-500">{compliantCount}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Areas Needing Attention</p>
                <p className="text-2xl font-bold text-amber-500">{attentionCount}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Non-Compliant Areas</p>
                <p className="text-2xl font-bold text-red-500">{nonCompliantCount}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Compliance Details by Area</h3>
              {complianceAreas.map((area, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(area.status)}
                      <h4 className="font-medium">{area.name}</h4>
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(area.status)}
                      {getRiskBadge(area.risk)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{area.details}</p>
                  <div className="flex gap-8 mt-2 text-xs text-muted-foreground">
                    <p>Last audit: {area.lastAudit}</p>
                    <p>Next audit: {area.nextAudit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
