
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { SearchIcon, UserPlus, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddStaffDialog from "./AddStaffDialog";
import { toast } from "sonner";
import axios from "axios";
import { IStaff } from "@/types/staff";

// Sample staff data
// const staffMembers = [
//   {
//     id: "1",
//     name: "Dr. Sarah Connor",
//     role: "Dentist",
//     specialization: "Orthodontics",
//     email: "sarah.connor@dentalcare.com",
//     phone: "+1 (555) 123-4567",
//     status: "active"
//   },
//   {
//     id: "2",
//     name: "Dr. James Wilson",
//     role: "Dentist",
//     specialization: "Endodontics",
//     email: "james.wilson@dentalcare.com",
//     phone: "+1 (555) 987-6543",
//     status: "active"
//   },
//   {
//     id: "3",
//     name: "Lisa Johnson",
//     role: "Dental Hygienist",
//     specialization: "General",
//     email: "lisa.johnson@dentalcare.com",
//     phone: "+1 (555) 456-7890",
//     status: "on_leave"
//   },
//   {
//     id: "4",
//     name: "Michael Brown",
//     role: "Receptionist",
//     specialization: "Administration",
//     email: "michael.brown@dentalcare.com",
//     phone: "+1 (555) 234-5678",
//     status: "active"
//   },
//   {
//     id: "5",
//     name: "Emily Davis",
//     role: "Dental Assistant",
//     specialization: "Pediatric",
//     email: "emily.davis@dentalcare.com",
//     phone: "+1 (555) 876-5432",
//     status: "active"
//   }
// ];



const Staff = () => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const token: string = localStorage.getItem("token") || "";
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [staffMembers, setStaffMembers] = useState<IStaff[]>([]);
  const [edit, setEdit] = useState(false);
  const [selectedMember, setSelectedMember] = useState<IStaff>();
  
  const filteredStaff = staffMembers.filter(
    staff => 
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStaff = () => {
    toast.success("New staff form would open here");
    setEdit(false);
    setDialogOpen(true);
  }

  const handleEdit = (staff: IStaff) => {
    setEdit(true);
    setSelectedMember(staff);
    setDialogOpen(true);
  }

  useEffect(() => {
      const fetchData = async () => {
        await axios.get(`${apiUrl}/api/clinic/team-members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          setStaffMembers(response.data);
        }).catch((error) => {
          console.error("Error fetching data:", error);
        });
      }
      fetchData();  
    }, [apiUrl, token, dialogOpen]); 
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Staff Management</h1>
          <Button onClick={handleAddStaff}>
            <UserPlus className="mr-2 h-4 w-4" /> Add Staff Member
          </Button>
          <AddStaffDialog open={dialogOpen} onOpenChange={setDialogOpen} staff={selectedMember} edit={edit} />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search staff by name, role, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Staff Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${staff.name}`} alt={staff.name} />
                          <AvatarFallback>{staff.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        {staff.name}
                      </div>
                    </TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>{staff.specialization}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="mr-1 h-3 w-3" />
                          {staff.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="mr-1 h-3 w-3" />
                          {staff.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={staff.status === "active" ? "default" : "destructive"} className="capitalize">
                        {staff.status === "on_leave" ? "On Leave" : staff.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(staff)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Staff;
