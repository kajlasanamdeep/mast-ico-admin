
import { Button } from "@/components/ui/button";

const KycManagement = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">KYC/AML Management</h1>
          <p className="text-muted-foreground">Verify investor identities and maintain compliance</p>
        </div>
        <div>
          <Button>Configure KYC Provider</Button>
        </div>
      </div>
      
      <div className="min-h-[300px] flex items-center justify-center border border-dashed border-border rounded-lg p-8">
        <div className="text-center">
          <h3 className="text-xl font-medium">KYC/AML Dashboard</h3>
          <p className="text-muted-foreground mt-2">This feature is coming soon. Check back later.</p>
          <Button variant="outline" className="mt-4">Request Early Access</Button>
        </div>
      </div>
    </div>
  );
};

export default KycManagement;
