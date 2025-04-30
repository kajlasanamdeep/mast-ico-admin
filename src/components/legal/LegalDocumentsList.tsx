
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Eye, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const legalDocuments = [
  {
    id: "doc-001",
    title: "Terms of Service",
    dateAdded: "2025-02-15",
    lastUpdated: "2025-03-10",
    status: "active",
    type: "legal"
  },
  {
    id: "doc-002",
    title: "Privacy Policy",
    dateAdded: "2025-02-15",
    lastUpdated: "2025-03-10",
    status: "active",
    type: "legal"
  },
  {
    id: "doc-003",
    title: "Know Your Customer (KYC) Policy",
    dateAdded: "2025-01-18",
    lastUpdated: "2025-03-12",
    status: "active",
    type: "compliance"
  },
  {
    id: "doc-004",
    title: "Anti-Money Laundering (AML) Policy",
    dateAdded: "2025-01-18",
    lastUpdated: "2025-03-12",
    status: "active",
    type: "compliance"
  },
  {
    id: "doc-005",
    title: "Token Sale Agreement",
    dateAdded: "2025-02-20",
    lastUpdated: "2025-02-20",
    status: "draft",
    type: "legal"
  },
  {
    id: "doc-006",
    title: "User Data Protection Statement",
    dateAdded: "2025-03-05",
    lastUpdated: "2025-03-05",
    status: "review",
    type: "compliance"
  },
  {
    id: "doc-007",
    title: "Risk Disclosure",
    dateAdded: "2025-02-28",
    lastUpdated: "2025-02-28",
    status: "active",
    type: "legal"
  }
];

export const LegalDocumentsList = () => {
  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Legal Documents</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Sort
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {legalDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    {doc.title}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={doc.type === "legal" ? "default" : "secondary"}>
                    {doc.type === "legal" ? "Legal" : "Compliance"}
                  </Badge>
                </TableCell>
                <TableCell>{doc.lastUpdated}</TableCell>
                <TableCell>
                  <Badge variant={
                    doc.status === "active" ? "default" : 
                    doc.status === "draft" ? "outline" : "secondary"
                  }>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
