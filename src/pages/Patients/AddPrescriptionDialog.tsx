import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Pill } from "lucide-react";

interface AddPrescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
}

const prescriptionSchema = z.object({
  medication: z.string().min(1, "Medication name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  schedule: z.string().min(1, "Schedule is required"),
  doctor: z.string().min(1, "Doctor name is required"),
  notes: z.string().optional(),
});

type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;

export function AddPrescriptionDialog({
  open,
  onOpenChange,
  patientId,
}: AddPrescriptionDialogProps) {
  const { toast } = useToast();

  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      medication: "",
      dosage: "",
      schedule: "",
      doctor: "",
      notes: "",
    },
  });

  function onSubmit(data: PrescriptionFormValues) {
    // In a real app, this would be sent to a backend API
    console.log("Prescription submitted:", { ...data, patientId });

    toast({
      title: "Prescription added",
      description:
        "The prescription has been successfully added to the patient record.",
    });

    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="hidden" />
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Add New Prescription
          </DialogTitle>
          <DialogDescription>
            Enter the prescription details for this patient.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="medication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medication Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Amoxicillin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., 500mg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="schedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schedule</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Twice daily" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prescribing Doctor</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Special instructions or warnings"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Prescription</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
