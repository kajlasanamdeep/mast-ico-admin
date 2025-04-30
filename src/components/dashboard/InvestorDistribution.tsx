
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Retail", value: 42 },
  { name: "Institutional", value: 28 },
  { name: "Strategic", value: 18 },
  { name: "Early Bird", value: 12 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#0ea5e9", "#10b981"];

const InvestorDistribution = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle>Investor Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, "Percentage"]}
                contentStyle={{ 
                  backgroundColor: "hsl(222 47% 15%)",
                  borderColor: "hsl(217.2 32.6% 17.5%)",
                  borderRadius: "0.5rem", 
                }}
              />
              <Legend 
                verticalAlign="bottom"
                align="center"
                layout="horizontal" 
                iconType="circle"
                iconSize={8}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorDistribution;
