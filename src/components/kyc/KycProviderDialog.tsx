
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type KycProviderProps = {
  providers: Array<{ value: string, label: string }>;
  handleConfigureClick: () => void;
}

export const KycProviderDialog = ({ providers, handleConfigureClick }: KycProviderProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Configure KYC Provider</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Configure KYC Provider</DialogTitle>
          <DialogDescription>
            Connect your KYC/AML verification provider and set verification requirements.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <FormLabel>KYC Provider</FormLabel>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
              {providers.map(provider => (
                <option key={provider.value} value={provider.value}>{provider.label}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <FormLabel>API Key</FormLabel>
            <Input type="password" placeholder="Enter your provider API key" />
          </div>
          <div className="grid gap-2">
            <FormLabel>Webhook URL</FormLabel>
            <Input type="text" placeholder="https://your-app.com/api/kyc/webhook" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="required" defaultChecked />
              <label
                htmlFor="required"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Require KYC before investment
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="aml" defaultChecked />
              <label
                htmlFor="aml"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enable AML screening
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleConfigureClick}>Save Configuration</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
