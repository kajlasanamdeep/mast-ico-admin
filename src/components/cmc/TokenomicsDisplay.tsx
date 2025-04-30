
import { useCmc } from "@/contexts/CmcContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const TokenomicsDisplay = () => {
  const { tokenomics, loading } = useCmc();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{tokenomics.tokenSymbol} Token Distribution</CardTitle>
        <CardDescription>
          Total Supply: {tokenomics.totalSupply} {tokenomics.tokenSymbol}
          <br />
          Initial Price: {tokenomics.initialPrice}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tokenomics.tokenAllocations}
                dataKey="percentage"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {tokenomics.tokenAllocations.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-medium mb-2">About {tokenomics.tokenSymbol} Token</h3>
          <p className="text-muted-foreground">{tokenomics.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenomicsDisplay;
