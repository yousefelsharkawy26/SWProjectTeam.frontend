import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z  from "zod";

const passwordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  newPassword: z.string().min(6, { message: "New Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters" }),
});

const SecurityInfo = () => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const btnRef = useRef<HTMLInputElement>(null)
  const form = useForm<z.infer <typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    if (data.newPassword !== data.confirmPassword) {
      form.setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }
    // Call your API to update the password here
    await axios.put(`${apiUrl}/api/changepassword`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log("Password updated successfully", response.data);
      toast.success("Password updated successfully!");
      form.reset();
    }).catch((error) => {
      console.error("Error updating password", error);
      toast.error("Error updating password");
    });
    // Handle form submission logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your account security preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Current Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your current password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <div className="space-y-2">
              <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="newPassword">New Password</FormLabel>
                      <FormControl>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter New password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm a new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <input ref={btnRef} type="submit" hidden />
              <Button className="w-full md:w-auto">Update Password</Button>
            </div>
          </form>
        </Form>
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Two-Factor Authentication</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="enableTfa" className="flex-1">
                Enable 2FA
                <p className="text-sm font-normal text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </Label>
              <Switch id="enableTfa" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Session Management</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Active Sessions</p>
                <p className="text-sm text-gray-500">
                  You're currently logged in on 1 device
                </p>
              </div>
              <Button onClick={() => btnRef.current?.click()} variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityInfo;
