import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Stethoscope,
  CalendarDays,
  CreditCard,
  FileText,
} from "lucide-react";
import AddEditSessionDialog from "./AddEditSessionDialog";
import SessionRow from "./SessionRow";
import { useState } from "react";

const TreatmentStatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    planned: "bg-gray-100 text-gray-800 border-gray-200",
    "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <Badge
      variant="outline"
      className={statusStyles[status as keyof typeof statusStyles]}
    >
      {status === "in-progress"
        ? "In Progress"
        : status?.charAt(0).toUpperCase() + status?.slice(1)}
    </Badge>
  );
};

const PatientTreatmentDialog = ({
  treatment,
  setSelectedTreatment,
  onSave,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow
          className="cursor-pointer hover:bg-gray-50"
          onClick={() => setSelectedTreatment(treatment?.id)}
        >
          <TableCell>
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2 bg-dental-light-blue/20">
                <AvatarFallback className="text-dental-dark-blue">
                  {treatment?.patientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span>{treatment?.patientName}</span>
            </div>
          </TableCell>
          <TableCell>{treatment?.treatmentType}</TableCell>
          <TableCell>{treatment?.dentistName}</TableCell>
          <TableCell>{treatment?.startDate}</TableCell>
          <TableCell>{treatment?.endDate}</TableCell>
          <TableCell>${treatment?.cost}</TableCell>
          <TableCell>
            <TreatmentStatusBadge status={treatment?.status} />
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Treatment Plan Details</DialogTitle>
          <DialogDescription>
            View and manage treatment plan for {treatment?.patientName}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Treatment Sessions</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-dental-light-blue/20 p-3 rounded-full">
                    <Stethoscope className="h-6 w-6 text-dental-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {treatment?.treatmentType}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Treatment ID: #{treatment?.id}
                    </p>
                  </div>
                </div>
                <TreatmentStatusBadge status={treatment?.status} />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">
                    Patient
                  </h4>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2 bg-dental-light-blue/20">
                      <AvatarFallback className="text-dental-dark-blue">
                        {treatment?.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{treatment?.patientName}</p>
                      <p className="text-sm text-gray-500">
                        ID: {treatment?.patientId}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">
                    Dentist
                  </h4>
                  <p className="font-medium">{treatment?.dentistName}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">
                    Start Date
                  </h4>
                  <p className="font-medium">{treatment?.startDate}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">
                    End Date
                  </h4>
                  <p className="font-medium">{treatment?.endDate}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">
                    Cost
                  </h4>
                  <p className="font-medium">${treatment?.cost}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">
                    Sessions
                  </h4>
                  <p className="font-medium">
                    {treatment?.sessions.length} sessions
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-gray-500 mb-1">
                  Notes
                </h4>
                <p className="text-sm bg-gray-50 p-3 rounded-md">
                  {treatment?.notes}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <div className="space-y-4">
              {treatment?.sessions.map((session, index) => (
                <SessionRow
                  key={index}
                  treatmentId={treatment?.id}
                  onSave={onSave}
                  session={session}
                  index={index}
                />
              ))}

              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Session</span>
                </Button>
                <AddEditSessionDialog
                  treatmentId={treatment?.id}
                  mode={true}
                  open={open}
                  onOpenChange={setOpen}
                  onSave={onSave}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Payment Summary</h4>
                    <p className="text-sm text-gray-500">
                      Treatment: {treatment?.treatmentType}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-xl font-bold">${treatment?.cost}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Insurance Coverage</p>
                    <p className="font-medium">
                      ${Math.round(treatment?.cost * 0.7)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Patient Responsibility
                    </p>
                    <p className="font-medium">
                      ${Math.round(treatment?.cost * 0.3)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-md">
                <div className="p-4 border-b bg-gray-50">
                  <h4 className="font-medium">Payment Status</h4>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span>Insurance Claim</span>
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 border-blue-200"
                    >
                      Submitted
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Patient Payment</span>
                    {treatment?.status === "completed" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 border-green-200"
                      >
                        Paid
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-800 border-amber-200"
                      >
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Generate Invoice</span>
                </Button>

                <Button className="flex items-center gap-2 bg-dental-blue hover:bg-dental-dark-blue">
                  <CreditCard className="h-4 w-4" />
                  <span>Process Payment</span>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline">Update Treatment Plan</Button>
          <Button>Schedule Next Session</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PatientTreatmentDialog;
