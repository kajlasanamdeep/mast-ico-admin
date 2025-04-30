
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { KycUserData } from "@/types/kyc";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, AlertTriangle, User, Calendar, FileText, Globe, Clock, UserCheck, Info } from "lucide-react";

type KycUserDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userData?: KycUserData;
}

export const KycUserDetailModal = ({ isOpen, onClose, userData }: KycUserDetailModalProps) => {
  const { toast } = useToast();
  const [reviewNotes, setReviewNotes] = useState(userData?.notes || "");
  
  if (!userData) {
    return null;
  }

  const handleApprove = () => {
    toast({
      title: "Verification Approved",
      description: `${userData.name}'s verification has been approved.`,
    });
    onClose();
  };

  const handleReject = () => {
    toast({
      title: "Verification Rejected",
      description: `${userData.name}'s verification has been rejected.`,
    });
    onClose();
  };

  const handleRequestInfo = () => {
    toast({
      title: "Additional Information Requested",
      description: `Request for additional information sent to ${userData.name}.`,
    });
    onClose();
  };

  const handleSaveNotes = () => {
    toast({
      title: "Notes Saved",
      description: "Your review notes have been saved.",
    });
  };

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
          <CheckCircle className="h-3.5 w-3.5" /> Approved
        </Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
          <XCircle className="h-3.5 w-3.5" /> Rejected
        </Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> Pending
        </Badge>;
      case 'Additional Info Required':
        return <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
          <Info className="h-3.5 w-3.5" /> Additional Info Required
        </Badge>;
      case 'Expired':
        return <Badge className="bg-gray-100 text-gray-800 flex items-center gap-1">
          <AlertTriangle className="h-3.5 w-3.5" /> Expired
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Helper function to render risk badge
  const renderRiskBadge = (risk: string) => {
    switch(risk) {
      case 'Low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Low
        </Badge>;
      case 'Medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Medium
        </Badge>;
      case 'High':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          High
        </Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          {risk}
        </Badge>;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl w-full overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl flex items-center justify-between">
            <span>Verification Details</span>
            {renderStatusBadge(userData.status)}
          </SheetTitle>
          <SheetDescription>
            Review and manage investor verification details
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6 pt-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <User className="h-4 w-4" /> Personal Information
              </h4>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{userData.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ID</p>
                  <p className="font-medium">{userData.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Nationality</p>
                  <p className="font-medium flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5" />
                    {userData.nationality || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Document Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" /> Document Information
              </h4>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Document Type</p>
                  <p className="font-medium">{userData.documentType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expiry Date</p>
                  <p className="font-medium">{userData.documentExpiry || "Not available"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Risk Level</p>
                  <p>{renderRiskBadge(userData.risk)}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Verification Timeline */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Verification Timeline
              </h4>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Submitted Date</p>
                  <p className="font-medium">{userData.submittedDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Completed Date</p>
                  <p className="font-medium">{userData.completedDate || "Pending"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Reviewed By</p>
                  <p className="font-medium flex items-center gap-2">
                    <UserCheck className="h-3.5 w-3.5" />
                    {userData.reviewedBy || "Not yet reviewed"}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Review Notes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">Review Notes</h4>
                <Button size="sm" variant="outline" onClick={handleSaveNotes}>Save Notes</Button>
              </div>
              <Textarea 
                value={reviewNotes} 
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Add notes about this verification..." 
                className="min-h-[100px]"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6 pt-4">
            <div className="text-center p-8 border border-dashed rounded-md">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">Document Preview</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Document preview is available in the full version.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="font-medium">Documents Submitted</p>
                  <p className="text-sm text-muted-foreground">{userData.submittedDate}</p>
                </div>
              </div>
              
              {userData.status === 'Approved' && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-medium">Verification Approved</p>
                    <p className="text-sm text-muted-foreground">{userData.completedDate}</p>
                  </div>
                </div>
              )}

              {userData.status === 'Rejected' && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <div>
                    <p className="font-medium">Verification Rejected</p>
                    <p className="text-sm text-muted-foreground">{userData.completedDate}</p>
                  </div>
                </div>
              )}
              
              {userData.status === 'Additional Info Required' && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="font-medium">Additional Information Requested</p>
                    <p className="text-sm text-muted-foreground">{userData.completedDate || "N/A"}</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 space-y-4">
          {userData.status === 'Pending' && (
            <div className="flex flex-col sm:flex-row gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50" size="sm">
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reject Verification</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to reject this verification? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReject} className="bg-red-500">Reject</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50" size="sm" onClick={handleRequestInfo}>
                <Info className="mr-2 h-4 w-4" />
                Request Additional Info
              </Button>
              
              <Button className="bg-green-500 hover:bg-green-600 ml-auto" size="sm" onClick={handleApprove}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </div>
          )}
          
          <Button variant="outline" className="w-full" onClick={onClose}>Close</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
