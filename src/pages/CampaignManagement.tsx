
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Megaphone, 
  Users, 
  Percent,
  Gift,
  Rocket
} from "lucide-react";
import { useState } from "react";

// Dummy campaign data
const campaignData = [
  {
    id: 1,
    name: "Early Bird Referral",
    type: "Referral",
    status: "Active",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    participants: 1245,
    budget: "$15,000",
    conversion: "12%",
  },
  {
    id: 2,
    name: "Spring Token Sale",
    type: "Promotion",
    status: "Active",
    startDate: "2025-04-15",
    endDate: "2025-05-15",
    participants: 3782,
    budget: "$25,000",
    conversion: "18%",
  },
  {
    id: 3,
    name: "Influencer Partnership",
    type: "Affiliate",
    status: "Scheduled",
    startDate: "2025-05-01",
    endDate: "2025-07-31",
    participants: 0,
    budget: "$50,000",
    conversion: "0%",
  },
  {
    id: 4,
    name: "Loyalty Rewards Program",
    type: "Loyalty",
    status: "Active",
    startDate: "2025-03-15",
    endDate: "2025-09-15",
    participants: 2156,
    budget: "$30,000",
    conversion: "22%",
  },
  {
    id: 5,
    name: "Winter ICO Promotion",
    type: "Promotion",
    status: "Completed",
    startDate: "2024-12-01",
    endDate: "2025-02-28",
    participants: 5412,
    budget: "$40,000",
    conversion: "25%",
  },
  {
    id: 6,
    name: "Community Bounty Program",
    type: "Bounty",
    status: "Draft",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    participants: 0,
    budget: "$20,000",
    conversion: "0%",
  },
];

// Campaign stats data
const statsData = [
  {
    title: "Active Campaigns",
    value: "3",
    icon: Megaphone,
    color: "text-green-500 bg-green-100",
  },
  {
    title: "Total Participants",
    value: "12,595",
    icon: Users,
    color: "text-blue-500 bg-blue-100",
  },
  {
    title: "Average Conversion",
    value: "19.3%",
    icon: Percent,
    color: "text-purple-500 bg-purple-100",
  },
  {
    title: "Total Rewards Given",
    value: "5,432",
    icon: Gift,
    color: "text-amber-500 bg-amber-100",
  },
];

const CampaignManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter campaigns based on search term
  const filteredCampaigns = campaignData.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Campaign Management</h1>
          <p className="text-muted-foreground">Manage promotional campaigns and referral programs</p>
        </div>
        <div>
          <Button>
            <Rocket className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>
      
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Campaign List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>All Campaigns</CardTitle>
              <CardDescription>Manage and track your marketing campaigns</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search campaigns..."
                className="max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead className="text-right">Budget</TableHead>
                  <TableHead className="text-right">Conversion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>{campaign.type}</TableCell>
                    <TableCell>
                      <Badge variant={
                        campaign.status === "Active" ? "default" : 
                        campaign.status === "Completed" ? "secondary" : 
                        campaign.status === "Scheduled" ? "outline" : "destructive"
                      }>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div>{campaign.startDate}</div>
                        <div>to</div>
                        <div>{campaign.endDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>{campaign.participants.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{campaign.budget}</TableCell>
                    <TableCell className="text-right">{campaign.conversion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignManagement;
