import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserProvider from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { ISession } from "@/types/Treatment";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddEditSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (saved: boolean) => void;
  mode: boolean;
  treatmentId: number;
  defaultValue?: ISession;
}

const AddEditSessionDialog = ({
  open,
  onOpenChange,
  onSave,
  mode,
  treatmentId,
  defaultValue = null,
}: AddEditSessionDialogProps) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const { token } = UserProvider.useUser();
  const form = useForm({
    values: {
      id: defaultValue?.id || 0,
      date: defaultValue?.date || (undefined as Date),
      notes: defaultValue?.notes || "",
      completed: false,
    },
  });

  const AddNewSession = async (data) => {
    await axios
      .put(
        `${apiUrl}/api/clinic/add-session?treatmentId=${treatmentId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Session added successfully");
        onSave(true);
        onOpenChange(false);
      })
      .catch((err) => {
        toast.success("Something is wrong please call service provider");
        console.error(err);
      });
  };

  const UpdateSession = async (data) => {
    await axios
      .put(
        `${apiUrl}/api/clinic/update-session?sessionId=${defaultValue?.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Session added successfully");
        onSave(true);
        onOpenChange(false);
      })
      .catch((err) => {
        toast.success("Something is wrong please call service provider");
        console.error(err);
      });
  };

  const onSubmit = async (data: ISession) => {
    if (mode) await AddNewSession(data);
    else await UpdateSession(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode ? "Add" : "Update"} Session</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        captionLayout="dropdown"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input placeholder="add some notes..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">{mode ? "Add" : "Update"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditSessionDialog;
