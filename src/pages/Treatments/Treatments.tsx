import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchIcon, Plus } from "lucide-react";
import { toast } from "sonner";
import PatientTreatmentDialog from "./PatientTreatmentDialog";
import NewTreatmentPlanDialog from "./NewTreatmentPlanDialog";
import axios from "axios";
import UserProvider from "@/context/UserContext";
import { ITreatment } from "@/types/Treatment";

const Treatments = () => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const { token } = UserProvider.useUser();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(
    null
  );
  const [treatments, setTreatments] = useState<ITreatment[]>([]);
  const [changed, setChanged] = useState(true);

  const filteredTreatments = treatments?.filter((treatment) => {
    const matchesSearch =
      treatment?.patientName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      treatment?.treatmentType
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || treatment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleNewTreatment = () => {
    setOpen(true);
    toast.success("New treatment plan form would open here");
  };

  useEffect(() => {
    const fetchTreatments = async () => {
      await axios
        .get(`${apiUrl}/api/clinic/get-plans`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTreatments(res.data);
          setChanged(false);
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    };
    if (token && changed) fetchTreatments();
  }, [apiUrl, token, changed, open]);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Treatment Planning</h1>
          <p className="text-gray-500">
            Manage and track patient treatment plans
          </p>
        </div>
        <Button
          onClick={handleNewTreatment}
          className="bg-dental-blue hover:bg-dental-dark-blue"
        >
          <Plus className="mr-2 h-4 w-4" /> New Treatment Plan
        </Button>
        <NewTreatmentPlanDialog open={open} onOpenChange={setOpen} />
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:max-w-sm">
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search treatments..."
                className="pl-9 bg-gray-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Treatment Plans</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Treatment Type</TableHead>
                  <TableHead>Dentist</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTreatments?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      No treatment plans found matching your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTreatments?.map((treatment) => (
                    <PatientTreatmentDialog
                      onSave={() => setChanged(true)}
                      key={treatment?.id}
                      treatment={treatment}
                      setSelectedTreatment={setSelectedTreatment}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Treatments;
