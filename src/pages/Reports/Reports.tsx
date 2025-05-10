
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, BarChart2, PieChart, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Sample data for reports
const revenueData = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 14200 },
  { month: "Mar", revenue: 15800 },
  { month: "Apr", revenue: 13900 },
  { month: "May", revenue: 16700 },
  { month: "Jun", revenue: 18500 },
  { month: "Jul", revenue: 17800 },
  { month: "Aug", revenue: 19200 },
  { month: "Sep", revenue: 21000 },
  { month: "Oct", revenue: 20500 },
  { month: "Nov", revenue: 22800 },
  { month: "Dec", revenue: 23400 },
];

const treatmentData = [
  { name: "Cleaning", value: 124 },
  { name: "Fillings", value: 87 },
  { name: "Root Canal", value: 43 },
  { name: "Crowns", value: 65 },
  { name: "Extractions", value: 38 },
];

const patientData = [
  { month: "Jan", new: 24, returning: 85 },
  { month: "Feb", new: 32, returning: 78 },
  { month: "Mar", new: 28, returning: 90 },
  { month: "Apr", new: 19, returning: 82 },
  { month: "May", new: 35, returning: 94 },
  { month: "Jun", new: 42, returning: 88 },
  { month: "Jul", new: 38, returning: 96 },
  { month: "Aug", new: 45, returning: 92 },
  { month: "Sep", new: 50, returning: 103 },
  { month: "Oct", new: 47, returning: 109 },
  { month: "Nov", new: 54, returning: 112 },
  { month: "Dec", new: 49, returning: 120 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Reports = () => {
  const [reportPeriod, setReportPeriod] = useState("yearly");
  
  const availableReports = [
    {
      name: "Financial Summary",
      description: "Overview of revenue, expenses, and profit",
      icon: BarChart2,
    },
    {
      name: "Treatment Analytics",
      description: "Analysis of treatments performed and their outcomes",
      icon: PieChart,
    },
    {
      name: "Patient Demographics",
      description: "Insights about patient distribution and patterns",
      icon: TrendingUp,
    },
    {
      name: "Staff Performance",
      description: "Metrics tracking staff productivity and efficiency",
      icon: FileText,
    },
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Export Reports
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant={reportPeriod === "monthly" ? "default" : "outline"}
            onClick={() => setReportPeriod("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={reportPeriod === "quarterly" ? "default" : "outline"}
            onClick={() => setReportPeriod("quarterly")}
          >
            Quarterly
          </Button>
          <Button
            variant={reportPeriod === "yearly" ? "default" : "outline"}
            onClick={() => setReportPeriod("yearly")}
          >
            Yearly
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-dental-blue" />
                Revenue Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#4F6BED" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-dental-blue" />
                Treatment Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Tooltip formatter={(value) => [`${value} procedures`]} />
                  <Legend />
                  <Pie
                    data={treatmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {treatmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-dental-blue" />
                Patient Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="new" stroke="#8884d8" name="New Patients" />
                  <Line type="monotone" dataKey="returning" stroke="#82ca9d" name="Returning Patients" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="available" className="w-full">
          <TabsList>
            <TabsTrigger value="available">Available Reports</TabsTrigger>
            <TabsTrigger value="recent">Recently Generated</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {availableReports.map((report) => (
                <Card key={report.name} className="hover:border-dental-blue/40 cursor-pointer transition-colors">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-dental-light-blue/20 p-3 rounded-full">
                      <report.icon className="h-6 w-6 text-dental-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{report.name}</h3>
                      <p className="text-sm text-gray-500">{report.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent">
            <Card className="mt-4">
              <CardContent className="pt-6">
                <p className="text-center text-gray-500 py-8">
                  Recently generated reports will be shown here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduled">
            <Card className="mt-4">
              <CardContent className="pt-6">
                <p className="text-center text-gray-500 py-8">
                  Scheduled reports will be shown here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Reports;
