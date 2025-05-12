import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, MoreHorizontal, Download } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import AddPatientDialog from "./AddPatientDialog";
import UserProvider from "@/context/UserContext";
import { AvatarImage } from "@radix-ui/react-avatar";
import PatientDetailsDialog from "./PatientDetailsDialog";
import FindOrCreateUserDialog from "./FindOrCreateUserDialog";
import ClinicProvider from "@/context/ClinicContext";
import { Patient } from "@/types/patients";

const Patients = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const context = UserProvider.useUser();
  const patinetContext = ClinicProvider.useClinic();
  const token = context.token;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [openFindUserDialog, setOpenFindUserDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [saved, setSaved] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [patients, setpatients] = useState<Patient[] | null>([]);

  const filteredPatients = patients?.filter(
    (patient) =>
      (patient?.firstName + " " + patient?.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      patient?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient?.phone.includes(searchTerm)
  );

  const handleNewPatient = () => {
    setOpenFindUserDialog(true);
    toast.success("New patient form would open here");
  };

  useEffect(() => {
    setpatients(patinetContext.patients);
    if (saved)
      patinetContext.setChanged(true);
    
  }, [patinetContext, openAddDialog]);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Patient Management</h1>
          <p className="text-gray-500">Manage and view patient information</p>
        </div>
        <Button
          id="add-patient"
          onClick={handleNewPatient}
          className="bg-dental-blue hover:bg-dental-dark-blue"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Patient
        </Button>
        <FindOrCreateUserDialog
          open={openFindUserDialog}
          onOpenChange={setOpenFindUserDialog}
          setPatinet={setPatient}
          addPatientDialog={setOpenAddDialog}
        />

        <AddPatientDialog
          open={openAddDialog}
          onOpenChange={setOpenAddDialog}
          initialPatient={patient}
          onSave={setSaved}
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search patients..."
                className="pl-9 bg-gray-50 border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Next Appointment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    No patients found matching your search criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients?.map((patient, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-dental-light-blue/20">
                          <AvatarImage
                            src={apiUrl + "/images/" + patient?.imageUrl}
                          />
                          <AvatarFallback className="text-dental-dark-blue">
                            {patient?.firstName[0] + patient?.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <PatientDetailsDialog
                            patient={patient}
                            setSelectedPatient={setSelectedPatient}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{patient?.email}</p>
                      <p className="text-xs text-gray-500">{patient?.phone}</p>
                    </TableCell>
                    <TableCell>{patient?.lastVisit}</TableCell>
                    <TableCell>
                      {patient?.nextAppointment || (
                        <span className="text-gray-500">Not scheduled</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          patient?.status === "active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-50 text-gray-700"
                        }
                      >
                        {patient?.status ? patient?.status : "In active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                          <DropdownMenuItem>Book Appointment</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Patients;
