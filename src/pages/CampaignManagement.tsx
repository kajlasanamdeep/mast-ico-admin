
import { Button } from "@/components/ui/button";

const CampaignManagement = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Campaign Management</h1>
          <p className="text-muted-foreground">Manage promotional campaigns and referral programs</p>
        </div>
        <div>
          <Button>Create Campaign</Button>
        </div>
      </div>
      
      <div className="min-h-[300px] flex items-center justify-center border border-dashed border-border rounded-lg p-8">
        <div className="text-center">
          <h3 className="text-xl font-medium">Campaign Management Dashboard</h3>
          <p className="text-muted-foreground mt-2">This feature is coming soon. Check back later.</p>
          <Button variant="outline" className="mt-4">Request Early Access</Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignManagement;
