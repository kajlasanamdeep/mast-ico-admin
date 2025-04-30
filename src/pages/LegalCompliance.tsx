
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, FileText, Gavel, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LegalDocumentsList } from "@/components/legal/LegalDocumentsList";
import { ComplianceStatus } from "@/components/legal/ComplianceStatus";
import { RegulationsList } from "@/components/legal/RegulationsList";
import { Separator } from "@/components/ui/separator";

const LegalCompliance = () => {
  const [activeTab, setActiveTab] = useState("documents");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Legal & Compliance</h1>
          <p className="text-muted-foreground">Manage legal documents and geographic restrictions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload Legal Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex flex-col gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="document-type" className="text-sm font-medium">Document Type</label>
                  <select id="document-type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="terms">Terms of Service</option>
                    <option value="privacy">Privacy Policy</option>
                    <option value="kyc">KYC Policy</option>
                    <option value="aml">AML Policy</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="document-file" className="text-sm font-medium">Upload File</label>
                  <input id="document-file" type="file" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                <div className="flex justify-end">
                  <Button>Upload Document</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="regulations">
            <Gavel className="mr-2 h-4 w-4" />
            Regulations
          </TabsTrigger>
          <TabsTrigger value="status">
            <Shield className="mr-2 h-4 w-4" />
            Status
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents" className="mt-6">
          <LegalDocumentsList />
        </TabsContent>
        
        <TabsContent value="regulations" className="mt-6">
          <RegulationsList />
        </TabsContent>
        
        <TabsContent value="status" className="mt-6">
          <ComplianceStatus />
        </TabsContent>
      </Tabs>
      
      <Separator />
      
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Compliance Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Compliance Guidelines</h3>
            <p className="text-sm text-muted-foreground mt-2">Access our comprehensive compliance guidelines for ICO operations.</p>
            <Button variant="outline" size="sm" className="mt-4">View Guidelines</Button>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Legal Templates</h3>
            <p className="text-sm text-muted-foreground mt-2">Download ready-to-use legal document templates for your ICO.</p>
            <Button variant="outline" size="sm" className="mt-4">Access Templates</Button>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Regulatory Updates</h3>
            <p className="text-sm text-muted-foreground mt-2">Stay informed about the latest regulatory changes affecting ICOs.</p>
            <Button variant="outline" size="sm" className="mt-4">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalCompliance;
