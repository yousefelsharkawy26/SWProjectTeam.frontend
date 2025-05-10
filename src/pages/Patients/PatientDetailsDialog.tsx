import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarDays, FileText } from 'lucide-react'
import { Patient } from '@/types/patients' 

interface PatientDetailsDialogProps {
  patient: Patient | null,
setSelectedPatient: (id: string | null) => void
}

const PatientDetailsDialog = ({ patient, setSelectedPatient }) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <span 
            onClick={() => setSelectedPatient(patient.id)}
            className="font-medium text-dental-blue hover:text-dental-dark-blue cursor-pointer"
            >
            {patient?.firstName + ' ' + patient?.lastName}
            </span>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
            <DialogHeader>
            <DialogTitle>Patient Information</DialogTitle>
            <DialogDescription>
                Detailed information about {patient?.firstName + ' ' + patient?.lastName}
            </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="treatments">Treatments</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                    <CardContent className="pt-6">
                    <div className="flex flex-col items-center mb-4">
                        <Avatar className="h-20 w-20 mb-4 bg-dental-light-blue/20">
                        <AvatarImage src={patient?.imageUrl} />
                        <AvatarFallback className="text-dental-dark-blue text-2xl">
                            {(patient?.firstName + ' ' + patient?.lastName)
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold">{patient?.firstName + ' ' + patient?.lastName}</h3>
                        <Badge className="mt-2">{patient?.status}</Badge>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                        <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{patient?.email}</p>
                        </div>
                        <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p>{patient?.phone}</p>
                        </div>
                        <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p>123 Main St, Anytown, CA 12345</p>
                        </div>
                        <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p>January 15, 1985</p>
                        </div>
                    </div>
                    </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                    <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Medical Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                        <p className="text-sm text-gray-500">Insurance ID</p>
                        <p className="font-medium">INS-{Math.floor(Math.random() * 1000000)}</p>
                        </div>
                        <div>
                        <p className="text-sm text-gray-500">Primary Dentist</p>
                        <p className="font-medium">Dr. Sarah Connor</p>
                        </div>
                        <div>
                        <p className="text-sm text-gray-500">Patient Since</p>
                        <p className="font-medium">March 12, 2022</p>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Allergies</h4>
                        <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Penicillin</Badge>
                        <Badge variant="outline">Latex</Badge>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Medical History</h4>
                        <p className="text-sm text-gray-600">
                        Patient has a history of hypertension and is currently taking blood pressure medication. 
                        No other significant medical conditions reported.
                        </p>
                    </div>
                    </CardContent>
                </Card>
                </div>
            </TabsContent>
            
            <TabsContent value="treatments">
                <Card>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                            <div>
                            <h4 className="font-medium">Dental Cleaning and Examination</h4>
                            <p className="text-sm text-gray-500">May {10 + i}, 2024</p>
                            </div>
                            <Badge>Completed</Badge>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                            <p>Performed routine cleaning and examination. No cavities found.</p>
                            <p className="mt-1"><span className="font-medium">Dentist:</span> Dr. Sarah Connor</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="appointments">
                <Card>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                    {patient?.nextAppointment && (
                        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg mb-6">
                        <CalendarDays className="h-10 w-10 text-dental-blue" />
                        <div>
                            <h4 className="font-medium">Next Appointment</h4>
                            <p>{patient?.nextAppointment} at 10:30 AM</p>
                            <p className="text-sm text-gray-600">Dental Check-up with Dr. Sarah Connor</p>
                        </div>
                        </div>
                    )}
                    
                    <h4 className="font-semibold mb-2">Previous Appointments</h4>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Dentist</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {[1, 2, 3].map((i) => (
                            <TableRow key={i}>
                            <TableCell>May {5 * i}, 2024</TableCell>
                            <TableCell>Check-up</TableCell>
                            <TableCell>Dr. Sarah Connor</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                Completed
                                </Badge>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </div>
                </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="billing">
                <Card>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Recent Invoices</h4>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Generate Invoice</span>
                        </Button>
                    </div>
                    
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Invoice #</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {[1, 2, 3].map((i) => (
                            <TableRow key={i}>
                            <TableCell>INV-{1000 + i}</TableCell>
                            <TableCell>May {5 * i}, 2024</TableCell>
                            <TableCell>${120 * i}.00</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={i === 1 ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}>
                                {i === 1 ? "Pending" : "Paid"}
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
                    
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-medium mb-2">Payment Information</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">Payment Method</p>
                            <p className="font-medium">Credit Card (ending in 4567)</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </TabsContent>
            </Tabs>
            
            <DialogFooter>
            <Button variant="outline">Edit Patient</Button>
            <Button>Book Appointment</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
  )
}

export default PatientDetailsDialog