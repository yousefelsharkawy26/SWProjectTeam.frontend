import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MedicationItem } from "@/types/patients";
import { Separator } from "@/components/ui/separator";
import { FileImage, Pill } from "lucide-react";

interface MedicationDetailDialogProps {
  medication: MedicationItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MedicationDetailDialog({
  medication,
  open,
  onOpenChange,
}: MedicationDetailDialogProps) {
  if (!medication) return null;

  // Format dates
  const startDate = new Date(medication.startDate).toLocaleDateString();
  const endDate = medication.endDate
    ? new Date(medication.endDate).toLocaleDateString()
    : "Ongoing";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-medical-orange" />
            {medication.title}
          </DialogTitle>
          <DialogDescription>{medication.schedule}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md border">
            <h3 className="font-medium mb-2">Prescription Details</h3>
            <div className="grid grid-cols-2 gap-y-3">
              <div>
                <p className="text-sm text-gray-500">Dosage</p>
                <p className="font-medium">{medication.dosage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Schedule</p>
                <p className="font-medium">{medication.schedule}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium">{endDate}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium">Treatment Information</h3>
            <p className="text-sm text-gray-600 mt-1">
              {medication.notes ||
                `This medication (${medication.title}) is prescribed at ${
                  medication.dosage
                } 
                to be taken according to the ${
                  medication.schedule
                }. The treatment started 
                on ${startDate} and ${
                  medication.endDate ? `will end on ${endDate}` : "is ongoing"
                }.`}
            </p>
          </div>

          <div>
            <h3 className="font-medium">Additional Documents</h3>
            <div className="mt-2 p-3 border rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-50">
              <FileImage className="h-6 w-6 text-medical-orange" />
              <div>
                <p className="font-medium text-sm">
                  Medication Information Sheet
                </p>
                <p className="text-xs text-gray-500">PDF Document - 245KB</p>
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
