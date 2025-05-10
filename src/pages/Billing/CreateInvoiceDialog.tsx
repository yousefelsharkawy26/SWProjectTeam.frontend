
import React from "react";
import { useForm } from "react-hook-form";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateInvoiceDialog = ({ open, onOpenChange }: CreateInvoiceDialogProps) => {
  const form = useForm({
    defaultValues: {
      patientId: "",
      date: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      items: [{ treatmentId: "", description: "", quantity: 1, unitPrice: 0 }]
    }
  });

  const handleAddItem = () => {
    const items = form.getValues("items") || [];
    form.setValue("items", [
      ...items,
      { treatmentId: "", description: "", quantity: 1, unitPrice: 0 }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const items = form.getValues("items") || [];
    form.setValue(
      "items",
      items.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: any) => {
    console.log("Invoice data:", data);
    
    // Calculate totals
    const subtotal = data.items.reduce(
      (sum: number, item: any) => sum + (item.quantity * item.unitPrice), 
      0
    );
    const tax = subtotal * 0.08; // 8% tax
    
    const invoice = {
      ...data,
      subtotal,
      tax,
      total: subtotal + tax,
      status: "pending"
    };
    
    console.log("Final invoice:", invoice);
    toast({
      title: "Invoice Created",
      description: `Invoice for ${data.patientId} has been created successfully.`,
    });
    onOpenChange(false);
  };

  const calculateTotal = () => {
    const items = form.getValues("items") || [];
    return items.reduce(
      (sum, item) => sum + (item.quantity * item.unitPrice),
      0
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">John Smith</SelectItem>
                        <SelectItem value="2">Emily Johnson</SelectItem>
                        <SelectItem value="3">Robert Williams</SelectItem>
                        <SelectItem value="4">Sarah Davis</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
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
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
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
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Invoice Items</h3>
                <Button type="button" onClick={handleAddItem} variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </div>
              
              <div className="space-y-4">
                {form.watch("items")?.map((_, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end border p-3 rounded-md">
                    <FormField
                      control={form.control}
                      name={`items.${index}.treatmentId`}
                      render={({ field }) => (
                        <FormItem className="col-span-3">
                          <FormLabel className="text-xs">Treatment</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="T1">Root Canal</SelectItem>
                              <SelectItem value="T2">Cleaning</SelectItem>
                              <SelectItem value="T3">X-Ray</SelectItem>
                              <SelectItem value="T4">Extraction</SelectItem>
                              <SelectItem value="T5">Filling</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`items.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormLabel className="text-xs">Description</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel className="text-xs">Quantity</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              {...field} 
                              onChange={e => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`items.${index}.unitPrice`}
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel className="text-xs">Price ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.01"
                              {...field} 
                              onChange={e => field.onChange(parseFloat(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="col-span-1"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex flex-col items-end">
                <div className="space-y-1 text-right">
                  <div className="text-sm">
                    Subtotal: <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="text-sm">
                    Tax (8%): <span className="font-medium">${(calculateTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="text-base font-bold">
                    Total: <span>${(calculateTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Invoice</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
