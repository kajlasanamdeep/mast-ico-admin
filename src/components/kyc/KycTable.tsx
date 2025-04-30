
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { KycUserData } from "@/types/kyc";
import { KycUserDetailModal } from "./KycUserDetailModal";

type KycTableProps = {
  kycUsers: KycUserData[];
  handleDetailsClick: (userId: string) => void;
}

export const KycTable = ({ kycUsers, handleDetailsClick }: KycTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<KycUserData | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter users based on search term
  const filteredUsers = kycUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openUserDetailModal = (user: KycUserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    handleDetailsClick(user.id);
  };

  const closeUserDetailModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 w-full max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, email or ID..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Badge variant="outline" className="gap-1 px-3 py-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Filter</span>
          </Badge>
        </div>
        <div className="text-muted-foreground text-sm">
          Showing {filteredUsers.length} of {kycUsers.length} verifications
        </div>
      </div>
      
      <Table>
        <TableCaption>A list of KYC/AML verifications for your investors.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Investor ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Document Type</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>
                <div>
                  <div>{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`
                  ${user.status === 'Approved' ? 'bg-green-100 text-green-800' : ''}
                  ${user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${user.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
                  ${user.status === 'Additional Info Required' ? 'bg-blue-100 text-blue-800' : ''}
                  ${user.status === 'Expired' ? 'bg-gray-100 text-gray-800' : ''}
                `}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={`
                  ${user.risk === 'Low' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                  ${user.risk === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                  ${user.risk === 'High' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                  ${user.risk === 'Unknown' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                `}>
                  {user.risk}
                </Badge>
              </TableCell>
              <TableCell>{user.submittedDate}</TableCell>
              <TableCell>{user.documentType}</TableCell>
              <TableCell>{user.nationality || "N/A"}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => openUserDetailModal(user)}>View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>

      <KycUserDetailModal 
        isOpen={isModalOpen} 
        onClose={closeUserDetailModal} 
        userData={selectedUser} 
      />
    </>
  );
};
