import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserProvider from "@/context/UserContext";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { CheckCircle2, Clock, User, XCircle } from "lucide-react";
import { Close } from "@radix-ui/react-dialog";
import ClinicProvider from "@/context/ClinicContext";
import { toast } from "sonner";

const AppointmentStatus = ({ status }: { status: string }) => {
  const statusProps = {
    confirmed: {
      label: "Confirmed",
      className: "bg-green-100 text-green-800 border-green-200",
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    in_progress: {
      label: "In Progress",
      className: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    completed: {
      label: "Completed",
      className: "bg-purple-100 text-purple-800 border-purple-200",
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-100 text-red-800 border-red-200",
      icon: <XCircle className="h-3 w-3 mr-1" />,
    },
  };

  const { label, className, icon } =
    statusProps[status as keyof typeof statusProps] || statusProps.confirmed;

  return (
    <Badge variant="outline" className={`flex items-center ${className}`}>
      {icon}
      {label}
    </Badge>
  );
};

const AppointmentDialog = ({ appointment, open, onOpenChanged }) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const token = UserProvider.useUser().token;
  const clinicContext = ClinicProvider.useClinic();

  const handleCheckIn = async () => {
    await axios
      .put(
        `${apiUrl}/api/clinic/update-appointment-status`,
        {
          appointmentId: appointment.id,
          appointmentStatus: "in_progress",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("success");
        clinicContext.setAppointChanged(!clinicContext.appointChanged);
      })
      .catch((err) => console.error(err));
  };

  const handleReschedule = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3 bg-dental-light-blue/20">
                <AvatarFallback className="text-dental-dark-blue">
                  {appointment.patientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{appointment.patientName}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <span>
                    {appointment.startTime} - {appointment.endTime}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{appointment.type}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <AppointmentStatus status={appointment.status} />
              <span className="text-sm text-gray-500">
                {appointment.dentistName}
              </span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            View and manage appointment information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 bg-dental-light-blue/20">
                <AvatarFallback className="text-dental-dark-blue">
                  {appointment.patientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">
                  {appointment.patientName}
                </h3>
                <p className="text-sm text-gray-500">
                  Patient ID: {appointment.patientId}
                </p>
              </div>
            </div>
            <AppointmentStatus status={appointment.status} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">
                {format(parseISO(appointment.date), "MMMM d, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">
                {appointment.startTime} - {appointment.endTime}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Treatment</p>
              <p className="font-medium">{appointment.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dentist</p>
              <p className="font-medium">{appointment.dentistName}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Notes</p>
            <p className="text-sm bg-gray-50 p-3 rounded-md">
              {appointment.notes}
            </p>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1" size="sm">
              <User className="h-4 w-4" />
              <span>Patient Profile</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleReschedule} variant="outline" size="sm">
              Reschedule
            </Button>
            <Close>
              <Button onClick={handleCheckIn} size="sm">
                Check In
              </Button>
            </Close>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
