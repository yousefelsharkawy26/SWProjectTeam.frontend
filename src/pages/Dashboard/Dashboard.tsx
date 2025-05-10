import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarDays,
  Users,
  CreditCard,
  AlertTriangle,
  UserCheck,
  Clock,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MainLayout from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import UserProvider from "@/context/UserContext";
import ClinicProvider from "@/context/ClinicContext";
import { useEffect, useState } from "react";
import { Patient } from "@/types/patients";
import { parseISO, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";
import InventoryProvider from "@/context/InventoryContext";

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
];

const appointmentData = [
  { name: "Mon", scheduled: 20, completed: 18 },
  { name: "Tue", scheduled: 15, completed: 13 },
  { name: "Wed", scheduled: 25, completed: 22 },
  { name: "Thu", scheduled: 22, completed: 20 },
  { name: "Fri", scheduled: 18, completed: 16 },
  { name: "Sat", scheduled: 12, completed: 10 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = UserProvider.useUser();
  const patientContext = ClinicProvider.useClinic();
  const [patients, setPatients] = useState<Patient[] | null>([]);
  const [appointments, setAppointments] = useState([]);
  const { inventories, setChanged } = InventoryProvider.useInventory();

  const filteredAppointments = appointments?.filter((appointment) => {
    const isSameDayAsSelected = isToday(parseISO(appointment.date));
    return isSameDayAsSelected;
  });

  const handleNavigateAppointments = () => {
    navigate("/appointments");
  };

  useEffect(() => {
    setPatients(patientContext.patients);
    setAppointments(patientContext.appointments);
  }, [patientContext]);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>June 7, 2024</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="bg-blue-50 p-3 rounded-md">
                <CalendarDays className="h-6 w-6 text-dental-blue" />
              </div>
              <Badge
                variant="outline"
                className="bg-blue-50 text-dental-blue border-blue-100"
              >
                Today
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mt-4">
              {filteredAppointments?.length}
            </h3>
            <p className="text-gray-500 text-sm">Appointments</p>
            <div className="flex items-center mt-2 text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>8% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="bg-purple-50 p-3 rounded-md">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-600 border-purple-100"
              >
                Total
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mt-4">{patients.length}</h3>
            <p className="text-gray-500 text-sm">Patients</p>
            <div className="flex items-center mt-2 text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>3% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="bg-green-50 p-3 rounded-md">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-600 border-green-100"
              >
                Month
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mt-4">$24,800</h3>
            <p className="text-gray-500 text-sm">Revenue</p>
            <div className="flex items-center mt-2 text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="bg-amber-50 p-3 rounded-md">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-500 border-amber-100"
              >
                Alert
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mt-4">
              {inventories?.reduce((total, item) => {
                const isLowStock = item?.totalQuantity < item?.minimumLevel;
                if (isLowStock) total += 1;
                return total;
              }, 0)}
            </h3>
            <p className="text-gray-500 text-sm">Low inventory items</p>
            <div className="flex items-center mt-2 text-xs text-dental-blue">
              <span className="underline cursor-pointer">View items</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Revenue Overview
              </CardTitle>
              <Button variant="outline" size="sm" className="text-xs">
                Last 6 months
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#1976d2"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#1976d2"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {appointments.slice(0, 3).map((appointment) => (
                <div
                  key={appointment?.id}
                  className="flex items-center p-3 rounded-lg bg-gray-50"
                >
                  <div className="mr-4 flex-shrink-0">
                    {appointment?.status === "completed" ? (
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <UserCheck className="h-5 w-5 text-green-600" />
                      </div>
                    ) : appointment?.status === "in_progress" ? (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center animate-pulse-light">
                        <Clock className="h-5 w-5 text-dental-blue" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">
                        {appointment?.patientName}
                      </p>
                      <span className="text-xs text-gray-500">
                        {appointment?.startTime}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{appointment?.type}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-600">
                        {appointment?.dentistName}
                      </p>
                      <Badge
                        className={`text-[10px] ${
                          appointment?.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : appointment?.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {appointment?.status === "completed"
                          ? "Completed"
                          : appointment?.status === "in-progress"
                          ? "In Progress"
                          : "Upcoming"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button
                onClick={handleNavigateAppointments}
                variant="outline"
                className="w-full text-sm"
              >
                View All Appointments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Appointment Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="scheduled"
                    name="Scheduled"
                    fill="#64b5f6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="completed"
                    name="Completed"
                    fill="#1976d2"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Recent Patients
            </CardTitle>
            <Button variant="ghost" className="text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      {patient.firstName + " " + patient.lastName}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {patient.lastVisit}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          !patient.lastVisit
                            ? "bg-red-100 text-red-800"
                            : patient.status === "in_progress"
                            ? "bg-green-100 text-blue-800"
                            : patient.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
