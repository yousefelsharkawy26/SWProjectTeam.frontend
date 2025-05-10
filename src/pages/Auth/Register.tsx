import UserProvider from "@/context/UserContext";
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
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

const userSchema = z.object({
  firstName: z.string().min(3, { message: 'First name mast be at least 3 characters' }).max(15, { message: 'First name mast be at most 15 characters' }),
  lastName: z.string().min(3, { message: 'Last name mast be at least 3 characters' }).max(15, { message: 'Last name mast be at most 15 characters' }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.string(),
  gender: z.string()
});

const Register = () => {
  const context = UserProvider.useUser();
  const navigate = useNavigate();

  const form = useForm<z.infer <typeof userSchema >> ({
        resolver: zodResolver(userSchema),
        defaultValues: {
          firstName: '',
          lastName: '',
          email: "",
          password: "",
          role: '',
          gender: '',
        },
      });

  const onSubmit = (data: z.infer <typeof userSchema >) => {
    context.registerAction(data).then(() => {
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1000);
    }).catch((error) => {
      console.error("Register error:", error);
      toast.error("Register failed!");
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Input placeholder="Wick" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between space-x-4">
        <div className="w-full">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Your Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>  
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="dentist">Dentist</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>  
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-dental-blue hover:bg-dental-dark-blue"
        >
          Sign up
        </Button>

        <div className="flex items-center justify-center my-4">
          <span className="text-xs text-gray-500">
            For demo purposes, you can use any sign up
          </span>
        </div>
      </form>
    </Form>
  );
};

export default Register;
