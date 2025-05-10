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
import { ClipboardPen } from "lucide-react";

interface AddDiagnosisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
}

const diagnosisSchema = z.object({
  title: z.string().min(1, "Title is required"),
  doctor: z.string().min(1, "Doctor name is required"),
  description: z.string().min(1, "Description is required"),
  notes: z.string().optional(),
});

type DiagnosisFormValues = z.infer<typeof diagnosisSchema>;

export function AddDiagnosisDialog({
  open,
  onOpenChange,
  patientId,
}: AddDiagnosisDialogProps) {
  const { toast } = useToast();

  const form = useForm<DiagnosisFormValues>({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      title: "",
      doctor: "",
      description: "",
      notes: "",
    },
  });

  function onSubmit(data: DiagnosisFormValues) {
    // In a real app, this would be sent to a backend API
    console.log("Diagnosis submitted:", { ...data, patientId });

    toast({
      title: "Diagnosis added",
      description:
        "The diagnosis has been successfully added to the patient record.",
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
            <ClipboardPen className="h-5 w-5" />
            Add New Diagnosis
          </DialogTitle>
          <DialogDescription>
            Enter the details of the diagnosis for this patient.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosis Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g., Hypertension Stage 1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed diagnosis description"
                      className="min-h-[100px]"
                      {...field}
                    />
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
                      placeholder="Additional notes or follow-up recommendations"
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
              <Button type="submit">Save Diagnosis</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
