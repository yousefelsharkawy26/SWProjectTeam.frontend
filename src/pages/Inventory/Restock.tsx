import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import UserProvider from "@/context/UserContext";
import { toast } from "sonner";
import { IInventory } from "./Inventory";

interface RestockProps {
  open: boolean;
  onOpenChanged: (open: boolean) => void;
  selectedItem: IInventory;
}

const RestockSchema = z.object({
  quantity: z.string(),
  expiryDate: z.date(),
});

const Restock = ({ open, onOpenChanged, selectedItem }: RestockProps) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const { token } = UserProvider.useUser();

  const form = useForm({
    defaultValues: {
      quantity: '',
      expiryDate: undefined as Date | Date,
    },
    resolver: zodResolver(RestockSchema),
  });

  const onSubmit = async (data: z.infer<typeof RestockSchema>) => {
    await axios
      .put(`${apiUrl}/api/Inventory?inventoryId=${selectedItem?.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      })
      .then(() => {
        toast.success("item added successfully");
        onOpenChanged(false);
        form.reset();
      })
      .catch((err) => {
        toast.error(
          "something is wrong check server is running or call developer"
        );
        console.error(err);
      });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChanged}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Re Stock</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Dental Composite Resin ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChanged(false)}
              >
                <X /> Close
              </Button>

              <Button type="submit">
                <Plus /> Add Item
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Restock;
