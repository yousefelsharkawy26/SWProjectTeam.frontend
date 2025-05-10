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
import { toast } from "sonner";

const userSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const context = UserProvider.useUser();
  const navigate = useNavigate();

  const form = useForm<z.infer <typeof userSchema >> ({
        resolver: zodResolver(userSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });

  const onSubmit = (data: z.infer<typeof userSchema>) => {
    context.loginAction(data).then(() => {
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1000);
    }).catch((error) => {
        console.error("Login error:", error);
        toast.error("Login failed. Please check your credentials.");
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-dental-blue focus:ring-dental-light-blue border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-dental-blue hover:text-dental-light-blue"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-dental-blue hover:bg-dental-dark-blue"
        >
          Sign in
        </Button>

        <div className="flex items-center justify-center my-4">
          <span className="text-xs text-gray-500">
            For demo purposes, you can use any email/password
          </span>
        </div>
      </form>
    </Form>
  );
};

export default Login;
