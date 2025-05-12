import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types/patients";
import { Separator } from "@/components/ui/separator";
import { Calendar, FileImage } from "lucide-react";

interface AppointmentDetailDialogProps {
  appointment: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentDetailDialog({
  appointment,
  open,
  onOpenChange,
}: AppointmentDetailDialogProps) {
  if (!appointment) return null;

  const apiUrl: string = import.meta.env.VITE_API_URL;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {appointment.type === "check-up" ? (
              <Calendar className="h-5 w-5 text-medical-orange" />
            ) : (
              <FileImage className="h-5 w-5 text-medical-orange" />
            )}
            {appointment.title}
          </DialogTitle>
          <DialogDescription>
            Dr. {appointment.dentistName} -{" "}
            {new Date(appointment.date).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {appointment?.type?.scanType === "X_Ray" && (
            <div className="space-y-2">
              <h3 className="font-medium">X-Ray Image</h3>
              <div className="flex justify-center">
                <img
                  src={apiUrl + "/images/" + appointment?.type?.fileUrl}
                  alt="X-Ray scan"
                  className="rounded-md object-cover max-h-[300px]"
                />
              </div>
            </div>
          )}

          <div>
            <h3 className="font-medium">Notes</h3>
            <p className="text-sm text-gray-600 mt-1">
              {appointment.notes ||
                "No additional notes available for this appointment."}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium">Appointment Details</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">
                  {appointment.completed ? "Completed" : "Scheduled"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="capitalize font-medium">{appointment.type}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
