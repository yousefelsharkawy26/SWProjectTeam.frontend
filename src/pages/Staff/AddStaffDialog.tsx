import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import UserProvider from "@/context/UserContext";
import { IStaff } from "@/types/staff";

interface AddStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff?: IStaff;
  edit?: boolean;
}

const staffSchema = z.object({
  id: z.string(),
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email("Please enter valid email"),
  phone: z.string(),
  role: z.string(),
  specialization: z.string(),
});

const AddStaffDialog = ({
  open,
  onOpenChange,
  staff,
  edit = false,
}: AddStaffDialogProps) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const context = UserProvider.useUser();
  const token = context.token;
  const form = useForm<z.infer<typeof staffSchema>>({
    values: {
      id: staff?.id || "",
      firstName: staff?.name.split(" ")[0] || "",
      lastName: staff?.name.split(" ")[1] || "",
      email: staff?.email || "",
      phone: staff?.phone || "",
      role: staff?.role || "",
      specialization: staff?.specialization || "",
    },
    resolver: zodResolver(staffSchema),
  });

  const handleAddStaffMember = async (data: z.infer<typeof staffSchema>) => {
    await axios
      .post(`${apiUrl}/api/clinic/add-member`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast({
          title: "Staff Member Added",
          description: `${data.firstName} ${data.lastName} has been added to the team.`,
        });
        onOpenChange(false);
      })
      .catch((err) => {
        toast({
          title: "Faild !",
          description: `Faild to save this member`,
        });
      });
  };

  const handleEditStaffMember = async (data: z.infer<typeof staffSchema>) => {
    await axios
      .put(`${apiUrl}/api/clinic/update-member`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast({
          title: "Staff Member Updated",
          description: `${data.firstName} ${data.lastName} has been updated.`,
        });
        onOpenChange(false);
      })
      .catch((err) => {
        toast({
          title: "Faild !",
          description: `Faild to save this member`,
        });
      });
  };

  const onSubmit = async (data: z.infer<typeof staffSchema>) => {
    if (!edit) await handleAddStaffMember(data);
    else await handleEditStaffMember(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Staff Member</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input type="hidden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.smith@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dentist">Dentist</SelectItem>
                      <SelectItem value="hygienist">Hygienist</SelectItem>
                      <SelectItem value="assistant">
                        Dental Assistant
                      </SelectItem>
                      <SelectItem value="receptionist">Receptionist</SelectItem>
                      <SelectItem value="administrator">
                        Administrator
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("role") === "dentist" && (
              <>
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">
                            General Dentistry
                          </SelectItem>
                          <SelectItem value="orthodontist">
                            Orthodontist
                          </SelectItem>
                          <SelectItem value="periodontist">
                            Periodontist
                          </SelectItem>
                          <SelectItem value="oral-surgeon">
                            Oral Surgeon
                          </SelectItem>
                          <SelectItem value="endodontist">
                            Endodontist
                          </SelectItem>
                          <SelectItem value="pediatric">
                            Pediatric Dentist
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              {!edit ? (
                <Button type="submit">Add Staff Member</Button>
              ) : (
                <>
                  <Button type="submit" variant="destructive">
                    Delete
                  </Button>
                  <Button type="submit">Edit</Button>
                </>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffDialog;
