import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import UserProvider from "@/context/UserContext";
import { toast } from "sonner";
import { Patient } from "./Patients";

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addPatientDialog: (open: boolean) => void;
  setPatinet: (open: Patient) => void;
}

interface Search {
  search: string;
}

const FindOrCreateUserDialog = ({ open, onOpenChange, addPatientDialog, setPatinet }: AddPatientDialogProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const context = UserProvider.useUser();
  const token = context.token;
  
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = async (data: Search) => {

    await axios.get(`${apiUrl}/api/patients/search?email=${data.search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      toast.info("Patient found, update medical data.");
      setPatinet(response.data);
      onOpenChange(false);
      addPatientDialog(true);
    }).catch(() => {
      toast.error("No patients found with the provided email or phone number.");
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="add-patient" 
                    aria-description="Search for a patient by email or phone number"
                    className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Or Phone Number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="search..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Next</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FindOrCreateUserDialog;
