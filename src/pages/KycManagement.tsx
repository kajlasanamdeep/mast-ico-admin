
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import { KycStatusCards } from "@/components/kyc/KycStatusCards";
import { KycProviderDialog } from "@/components/kyc/KycProviderDialog";
import { KycTable } from "@/components/kyc/KycTable";
import { KycRiskAssessment } from "@/components/kyc/KycRiskAssessment";
import { KycEmptyState } from "@/components/kyc/KycEmptyState";

// Import data
import { kycUsers, kycStats, kycProviders } from "@/data/kycData";

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

  const handleDetailsClick = (userId: string) => {
    toast({
      title: "Viewing User Details",
      description: `Loading verification details for ${userId}`,
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
          <KycProviderDialog 
            providers={kycProviders} 
            handleConfigureClick={handleConfigureClick} 
          />
          <Button variant="outline" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </div>
      </div>
      
      <KycStatusCards kycStats={kycStats} />

      {showDetails ? (
        <>
          <KycTable kycUsers={kycUsers} handleDetailsClick={handleDetailsClick} />
          <KycRiskAssessment />
        </>
      ) : (
        <KycEmptyState 
          handleEarlyAccessClick={handleEarlyAccessClick}
          handleShowDetails={() => setShowDetails(true)} 
        />
      )}
    </div>
  );
};

export default KycManagement;
