
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TransactionHistory = () => {
  const [dateRange, setDateRange] = useState("");
  const [transactionType, setTransactionType] = useState("");
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">View all transactions in the MAST ICO</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button>Refresh Data</Button>
        </div>
      </div>
      
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium">Transaction Type</label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
                <SelectItem value="distribution">Distribution</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium">Date Range</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium">Investor</label>
            <Input placeholder="Search by wallet or email" className="mt-1" />
          </div>
          
          <div className="flex items-end">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
      </Card>
      
      <Card className="bg-card">
        <div className="p-6">
          <p>Transaction data will appear here with full filtering capabilities.</p>
          <p className="mt-2 text-muted-foreground">Currently a placeholder for the complete implementation.</p>
          
          <div className="mt-6">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                542 ETH Received
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                8.5 BTC Received
              </Badge>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                $425,000 USDT Received
              </Badge>
              <Badge variant="outline">
                $3,850,000 Total Equivalent
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TransactionHistory;
