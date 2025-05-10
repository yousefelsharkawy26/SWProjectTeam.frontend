import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import axios from "axios";
import UserProvider from "@/context/UserContext";

interface ClinicData {
  name: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  clinicPhone: string;
  clinicEmail: string;
  workingDate: string;
}
const ClinicInfo = () => {
  const btnRef = useRef<HTMLInputElement>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const context = UserProvider.useUser();
  const token = context.token || localStorage.getItem("token");
  const [clinicData, setClinicData] = useState<ClinicData | null>(null);

  const form = useForm<ClinicData>({
    values: {
      name: clinicData?.name || "",
      country: clinicData?.country || "",
      city: clinicData?.city || "",
      state: clinicData?.state || "",
      postalCode: clinicData?.postalCode || "",
      clinicPhone: clinicData?.clinicPhone || "",
      clinicEmail: clinicData?.clinicEmail || "",
      workingDate: clinicData?.workingDate || "",
    },
  });

  const onSubmit = async (data) => {
    if (!clinicData) {
      await axios.post(`${apiUrl}/api/clinic`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(() => {
        setClinicData(form.getValues());
      }).catch((error) => {
        console.error("Error adding clinic data:", error);
      });
    }
    else {
      await axios.put(`${apiUrl}/api/clinic`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setClinicData(form.getValues());
      }).catch((error) => {
        console.error("Error updating clinic data:", error);
      });
    }
    // Here you can handle the form submission, e.g., send data to an API
  }

  useEffect(() => {
    const fetchClinicData = async () => {
        await axios.get(`${apiUrl}/api/clinic`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {;
        setClinicData(response.data);
        form.reset(response.data);
        }).catch((error) => {
          console.error("Error fetching clinic data:", error);
        });
    };

    if (token) {
      fetchClinicData();
    }
  }
  , [apiUrl, token, form]);
  
  return (
    <Card>
      <CardHeader>
      <div className='flex relative'>
          <div>
            <CardTitle>Clinic Information</CardTitle>
            <CardDescription>
              Update your clinic details and address.
            </CardDescription>
          </div>
          <Button onClick={() => btnRef.current?.click()} className='w-32 absolute right-2'>{clinicData ? 'Save Changes':'New Clinic'}</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clinic Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter clinic name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter state" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter zip code" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="clinicPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clinic Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="clinicEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clinic Email</FormLabel>
                    <FormControl>
                      <Input placeholder="info@dentalcare.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="workingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Works On</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <input ref={btnRef} type="submit" hidden />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ClinicInfo;
