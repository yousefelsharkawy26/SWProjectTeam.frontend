import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from "date-fns"
import { cn } from '@/lib/utils';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import axios from 'axios';
import UserProvider from '@/context/UserContext';
import { toast } from 'sonner';

interface AddNewInventoryProps {
  open: boolean;
  onOpenChanged: (open: boolean) => void;

}

const inventorySchema = z.object({
  name: z.string().min(3, "Name of item must be at least 3 characters"),
  category: z.string().min(3, "Category name must be at least 3 characters"),
  quantity: z.string().min(1, 'This is no items to add'),
  unit: z.string(),
  minimumLevel: z.string(),
  supplier: z.string().min(3, "Supplier name must be at least 3 characters"),
  expiryDate: z.date().min(new Date(), 'The expiration date is very close.'),
})

const AddNewInventory = ({ open, onOpenChanged }: AddNewInventoryProps) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const context = UserProvider.useUser();
  const token = context.token;

  const form = useForm({
    defaultValues: {
      name: '',
      category: '',
      quantity: '',
      unit: '',
      minimumLevel: '',
      supplier: '',
      expiryDate: undefined as Date | Date,
    },
    resolver: zodResolver(inventorySchema),
  });

  const onSubmit = async (data: z.infer<typeof inventorySchema>) => {
    await axios.post(`${apiUrl}/api/inventory`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      toast.success("item added successfully");
      onOpenChanged(false);
      form.reset();
    }).catch(err => {
      toast.error("something is wrong check server is running or call developer");
      console.error(err);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChanged}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
              control={form.control}
              name='name'
              render={({field}) => 
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Dental Composite Resin ...' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }/>

              <FormField 
              control={form.control}
              name='category'
              render={({field}) => 
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Materials ...' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }/>

              <div className='flex mt-1'>
                <div className='w-full mr-1'>
                  <FormField
                  control={form.control}
                  name='quantity'
                  render={({field}) => 
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='42 ...' {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }/>
                </div>
                
                <div className='w-full ml-1'>
                  <FormField 
                  control={form.control}
                  name='unit'
                  render={({field}) => 
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input placeholder='tubes ...' {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }/>
                </div>
              </div>
              <FormField 
                control={form.control}
                name='minimumLevel'
                render={({field}) => 
                  <FormItem>
                    <FormLabel>Minimum Level</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='10 ...' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }/>

              <FormField 
                control={form.control}
                name='supplier'
                render={({field}) => 
                  <FormItem>
                    <FormLabel>Supplier Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Dental Supplies Co. ...' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }/>

              <FormField 
                control={form.control}
                name='expiryDate'
                render={({field}) => 
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
                }/>
              
              <DialogFooter className='pt-4'>
                <Button type='button' variant='outline' onClick={() => onOpenChanged(false)}>
                  <X />  Close
                </Button>

                <Button type='submit'>
                  <Plus />  Add Item
                </Button>
              </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewInventory