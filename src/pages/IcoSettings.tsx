
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const IcoSettings = () => {
  const [startDate, setStartDate] = useState<Date>(new Date(2025, 3, 30)); // April 30, 2025
  const [endDate, setEndDate] = useState<Date>(new Date(2025, 4, 14)); // May 14, 2025
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ICO Settings</h1>
          <p className="text-muted-foreground">Manage your ICO configuration and parameters</p>
        </div>
        <div>
          <Button>Save Settings</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>ICO Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Contribution Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Contribution (USD)</label>
                <Input type="number" defaultValue="100" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Maximum Contribution (USD)</label>
                <Input type="number" defaultValue="100000" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Hard Cap (USD)</label>
                <Input type="number" defaultValue="8500000" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Soft Cap (USD)</label>
                <Input type="number" defaultValue="2500000" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Tier-Based Discounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tier 1 (Up to $5,000)</label>
                <div className="flex items-center">
                  <Input type="number" defaultValue="0" />
                  <span className="ml-2">%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Tier 2 ($5,001 - $20,000)</label>
                <div className="flex items-center">
                  <Input type="number" defaultValue="5" />
                  <span className="ml-2">%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Tier 3 (Above $20,000)</label>
                <div className="flex items-center">
                  <Input type="number" defaultValue="10" />
                  <span className="ml-2">%</span>
                </div>
              </div>
            </div>
            
            <Button>Update Discounts</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IcoSettings;
