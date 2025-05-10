import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, isSameDay, parseISO, isSameWeek, isSameMonth } from "date-fns";
import { toast } from "sonner";
import { CalendarDays, Plus } from "lucide-react";
import NewAppointmentDialog from "./NewAppointmentDialog";
import AppointmentDialog from "./AppointmentDialog";
import ClinicProvider from "@/context/ClinicContext";
import DentistProvider from "@/context/DentistContext";

const Appointments = () => {
  const patientContext = ClinicProvider.useClinic();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDentist, setSelectedDentist] = useState<string>("all");
  const [viewType, setViewType] = useState<"list" | "calendar">("calendar");
  const [addNewDialogOpen, setAddNewDialogOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [appointments, setAppointments] = useState([]);
  const { dentists } = DentistProvider.useDentist();

  const filteredAppointments = appointments?.filter((appointment) => {
    const isSameDayAsSelected = isSameDay(parseISO(appointment.date), date);
    const isDentistMatch =
      selectedDentist === "all" || appointment.dentistId === selectedDentist;
    const isListType = viewType == "list";
    return isListType || (isSameDayAsSelected && isDentistMatch);
  });

  const handleNewAppointment = () => {
    toast.success("New appointment form would open here");
    setAddNewDialogOpen(true);
  };

  // Function to get appointments for date highlighting
  const getDaysWithAppointments = () => {
    const daysWithAppointments = appointments.map((appointment) =>
      parseISO(appointment.date)
    );
    return daysWithAppointments;
  };
  const appointmentDays = getDaysWithAppointments();

  useEffect(() => {
    patientContext.setAppointChanged(!dialogOpen);
    setAppointments(patientContext.appointments);
  }, [patientContext, dialogOpen]);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Appointment Scheduling</h1>
          <p className="text-gray-500">
            {viewType === "calendar" ? "Calendar view" : "List view"} of
            appointments
          </p>
        </div>
        <div className="flex gap-2">
          <Tabs
            value={viewType}
            onValueChange={(value) => setViewType(value as "list" | "calendar")}
            className="w-[240px]"
          >
            <TabsList className="w-full">
              <TabsTrigger value="calendar" className="w-1/2">
                Calendar
              </TabsTrigger>
              <TabsTrigger value="list" className="w-1/2">
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            onClick={handleNewAppointment}
            className="bg-dental-blue hover:bg-dental-dark-blue"
          >
            <Plus className="mr-2 h-4 w-4" /> New Appointment
          </Button>
          <NewAppointmentDialog
            open={addNewDialogOpen}
            onOpenChange={setAddNewDialogOpen}
            dentists={dentists}
          />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
              className="rounded-md border w-full"
              modifiers={{
                appointment: appointmentDays,
              }}
              modifiersStyles={{
                appointment: {
                  fontWeight: "bold",
                  backgroundColor: "rgba(25, 118, 210, 0.1)",
                  border: "1px solid rgba(25, 118, 210, 0.2)",
                },
              }}
            />

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dentist
              </label>
              <Select
                value={selectedDentist}
                onValueChange={(value) => setSelectedDentist(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a dentist" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  {dentists?.map((dentist) => (
                    <SelectItem key={dentist.id} value={dentist.id}>
                      {dentist?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Today's Appointments</span>
                  <span className="font-medium">
                    {
                      appointments.filter((a) =>
                        isSameDay(parseISO(a.date), new Date())
                      ).length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>This Week</span>
                  <span className="font-medium">
                    {
                      appointments.filter((a) =>
                        isSameWeek(parseISO(a.date), new Date())
                      ).length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>This Month</span>
                  <span className="font-medium">
                    {
                      appointments.filter((a) =>
                        isSameMonth(parseISO(a.date), new Date())
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                Appointments for {format(date, "MMMM d, yyyy")}
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                {filteredAppointments.length} appointments scheduled
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-8">
                <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No appointments scheduled
                </h3>
                <p className="text-gray-500">
                  There are no appointments scheduled for this day or dentist.
                </p>
                <Button onClick={handleNewAppointment} className="mt-4">
                  Schedule an Appointment
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <AppointmentDialog
                    key={appointment.id}
                    appointment={appointment}
                    open={dialogOpen}
                    onOpenChanged={setDialogOpen}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Appointments;
