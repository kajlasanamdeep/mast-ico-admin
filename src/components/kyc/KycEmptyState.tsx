
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

type KycEmptyStateProps = {
  handleEarlyAccessClick: () => void;
  handleShowDetails: () => void;
}

export const KycEmptyState = ({ handleEarlyAccessClick, handleShowDetails }: KycEmptyStateProps) => {
  return (
    <div className="min-h-[300px] flex items-center justify-center border border-dashed border-border rounded-lg p-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Lock className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium">KYC/AML Dashboard</h3>
        <p className="text-muted-foreground mt-2">Click "Show Details" to view verification data or request early access for more features.</p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <Button variant="outline" onClick={handleEarlyAccessClick}>Request Early Access</Button>
          <Button onClick={handleShowDetails}>Show Verification Data</Button>
        </div>
      </div>
    </div>
  );
};
