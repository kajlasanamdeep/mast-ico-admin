
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gavel, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const regulations = [
  {
    id: "reg-001",
    name: "GDPR",
    region: "European Union",
    complianceStatus: "compliant",
    description: "General Data Protection Regulation - EU data protection law"
  },
  {
    id: "reg-002",
    name: "AML5",
    region: "European Union",
    complianceStatus: "compliant",
    description: "5th Anti-Money Laundering Directive"
  },
  {
    id: "reg-003",
    name: "CCPA",
    region: "United States (California)",
    complianceStatus: "in-progress",
    description: "California Consumer Privacy Act"
  },
  {
    id: "reg-004",
    name: "MiCA",
    region: "European Union",
    complianceStatus: "pending",
    description: "Markets in Crypto-Assets Regulation"
  },
  {
    id: "reg-005",
    name: "FATF Travel Rule",
    region: "Global",
    complianceStatus: "compliant",
    description: "Financial Action Task Force recommendations for virtual assets"
  },
  {
    id: "reg-006",
    name: "BSA",
    region: "United States",
    complianceStatus: "compliant",
    description: "Bank Secrecy Act"
  },
  {
    id: "reg-007",
    name: "Securities Act",
    region: "United States",
    complianceStatus: "compliant",
    description: "Regulations on token offerings as securities"
  }
];

const geographicRestrictions = [
  { region: "United States", restricted: ["New York", "Texas"], reason: "State-specific regulations" },
  { region: "China", restricted: ["All"], reason: "National ban on ICOs" },
  { region: "North Korea", restricted: ["All"], reason: "Sanctions and regulatory limitations" },
  { region: "Russia", restricted: ["All"], reason: "Recent regulatory changes" }
];

export const RegulationsList = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regulatory Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Regulation</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regulations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Gavel className="h-4 w-4 mr-2 text-muted-foreground" />
                      {reg.name}
                    </div>
                  </TableCell>
                  <TableCell>{reg.region}</TableCell>
                  <TableCell>
                    <Badge variant={
                      reg.complianceStatus === "compliant" ? "default" : 
                      reg.complianceStatus === "in-progress" ? "secondary" : "outline"
                    }>
                      {reg.complianceStatus === "compliant" ? "Compliant" :
                       reg.complianceStatus === "in-progress" ? "In Progress" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{reg.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Geographic Restrictions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Restricted Areas</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {geographicRestrictions.map((restriction, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{restriction.region}</TableCell>
                  <TableCell>{restriction.restricted.join(", ")}</TableCell>
                  <TableCell>{restriction.reason}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
