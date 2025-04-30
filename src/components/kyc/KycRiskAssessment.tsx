
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export const KycRiskAssessment = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Risk Assessment Overview</CardTitle>
        <CardDescription>Monitor KYC/AML risk levels across your investor base</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-medium">Low Risk</span>
              <span className="text-green-600 font-semibold">30%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-medium">Medium Risk</span>
              <span className="text-yellow-600 font-semibold">20%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-medium">High Risk</span>
              <span className="text-red-600 font-semibold">10%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between p-2 border rounded-md bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="text-sm text-yellow-700 font-medium">2 users flagged for enhanced due diligence</span>
          </div>
          <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700">Review</Button>
        </div>
      </CardContent>
    </Card>
  );
};
