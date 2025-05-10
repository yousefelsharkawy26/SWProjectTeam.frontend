
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, Plus, Download, Banknote, CreditCard, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CreateInvoiceDialog from "./CreateInvoiceDialog";

// Sample invoice data
const invoices = [
  {
    id: "INV-001",
    patientId: "1",
    patientName: "John Smith",
    date: "2023-10-15",
    dueDate: "2023-11-15",
    status: "paid",
    items: [
      {
        treatmentId: "T1",
        description: "Root Canal Treatment",
        quantity: 1,
        unitPrice: 800,
        total: 800
      }
    ],
    subtotal: 800,
    tax: 64,
    discount: 0,
    total: 864,
    paymentMethod: "Credit Card"
  },
  {
    id: "INV-002",
    patientId: "2",
    patientName: "Emily Johnson",
    date: "2023-10-18",
    dueDate: "2023-11-18",
    status: "pending",
    items: [
      {
        treatmentId: "T2",
        description: "Dental Cleaning",
        quantity: 1,
        unitPrice: 120,
        total: 120
      },
      {
        treatmentId: "T3",
        description: "X-Ray",
        quantity: 1,
        unitPrice: 85,
        total: 85
      }
    ],
    subtotal: 205,
    tax: 16.4,
    discount: 20,
    total: 201.4,
    paymentMethod: null
  },
  {
    id: "INV-003",
    patientId: "3",
    patientName: "Robert Williams",
    date: "2023-10-10",
    dueDate: "2023-11-10",
    status: "overdue",
    items: [
      {
        treatmentId: "T4",
        description: "Tooth Extraction",
        quantity: 1,
        unitPrice: 250,
        total: 250
      }
    ],
    subtotal: 250,
    tax: 20,
    discount: 0,
    total: 270,
    paymentMethod: null
  },
  {
    id: "INV-004",
    patientId: "4",
    patientName: "Sarah Davis",
    date: "2023-10-20",
    dueDate: "2023-11-20",
    status: "paid",
    items: [
      {
        treatmentId: "T5",
        description: "Dental Filling",
        quantity: 2,
        unitPrice: 150,
        total: 300
      }
    ],
    subtotal: 300,
    tax: 24,
    discount: 30,
    total: 294,
    paymentMethod: "Insurance"
  }
];

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  
  const filteredInvoices = invoices.filter(
    invoice => 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Billing & Payments</h1>
          <Button onClick={() => setCreateInvoiceOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create New Invoice
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-dental-light-blue/10">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold">$24,582.00</h3>
                </div>
                <div className="bg-dental-light-blue/20 p-3 rounded-full">
                  <Banknote className="h-6 w-6 text-dental-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                  <h3 className="text-2xl font-bold">$3,428.00</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Overdue Payments</p>
                  <h3 className="text-2xl font-bold">$1,250.00</h3>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="invoices" className="w-full">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="insurance">Insurance Claims</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invoices">
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search invoices by ID, patient name, or status..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
            
            <Card className="mt-4 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {invoice.patientName.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            {invoice.patientName}
                          </div>
                        </TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>${invoice.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`capitalize ${statusBadgeVariant(invoice.status)}`}
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button variant="ghost" size="sm">View</Button>
                          {invoice.status !== "paid" && (
                            <Button size="sm">Pay Now</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card className="mt-4">
              <CardContent className="pt-6">
                <p className="text-center text-gray-500 py-8">
                  Payment history will be shown here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insurance">
            <Card className="mt-4">
              <CardContent className="pt-6">
                <p className="text-center text-gray-500 py-8">
                  Insurance claims will be shown here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <CreateInvoiceDialog 
          open={createInvoiceOpen} 
          onOpenChange={setCreateInvoiceOpen} 
        />
      </div>
    </MainLayout>
  );
};

export default Billing;
