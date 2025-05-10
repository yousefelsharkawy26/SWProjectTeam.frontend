import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Calendar, Check, Pill, FileImage } from "lucide-react";
import {
  User,
  Appointment,
  MedicationItem,
  MedicalRecord,
} from "@/types/patients";
import { AddPrescriptionDialog } from "./AddPrescriptionDialog";
import { AddDiagnosisDialog } from "./AddDiagnosisDialog";

interface PatientDetailProps {
  patient: User;
  appointments: Appointment[];
  medications: MedicationItem[];
  medicalRecords: MedicalRecord[];
}

export function PatientDetail({
  patient,
  appointments,
  medications,
  medicalRecords,
}: PatientDetailProps) {
  const [prescriptionDialogOpen, setPrescriptionDialogOpen] = useState(false);
  const [diagnosisDialogOpen, setDiagnosisDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={patient.avatar} alt={patient.name} />
                <AvatarFallback className="text-xl">
                  {patient.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-medium">Patient</h1>
                <p className="text-xl text-gray-600">{patient.name}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-500">Gender</p>
                <p className="font-medium">{patient.gender}</p>
              </div>
              <div>
                <p className="text-gray-500">Age</p>
                <p className="font-medium">{patient.age}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-gray-500">Last visit: {patient.lastVisit}</p>
              </div>
              <div>
                <p className="text-gray-500">PatientID: {patient.id}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-xl font-medium">Appointment Log</h2>
          </CardHeader>
          <CardContent>
            {appointments.map((appointment, index) => (
              <div key={appointment.id}>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-400 rounded-full p-3">
                      {appointment.type === "check-up" ? (
                        <Check className="h-5 w-5 text-white" />
                      ) : (
                        <FileImage className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium capitalize">
                        {appointment.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Dr. {appointment.doctor}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
                {index < appointments.length - 1 && <Separator />}
              </div>
            ))}
            {medicalRecords?.map((record, index) => (
              <div key={record.id}>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-400 rounded-full p-3">
                      {record?.type?.scanType ? (
                        <Check className="h-5 w-5 text-white" />
                      ) : (
                        <FileImage className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium capitalize">
                        {record?.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Dr. {record?.doctor}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
                {index < medicalRecords.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-xl font-medium">Medication History</h2>
          </CardHeader>
          <CardContent>
            {medications.map((medication, index) => (
              <div key={medication.id}>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-400 rounded-full p-3">
                      <Pill className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{medication.title}</h3>
                      <p className="text-sm text-gray-500">
                        {medication.schedule}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
                {index < medications.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          className="mr-2"
          onClick={() => setDiagnosisDialogOpen(true)}
        >
          Add Diagnosis
        </Button>
        <Button onClick={() => setPrescriptionDialogOpen(true)}>
          Add Prescriptions
        </Button>
        <AddPrescriptionDialog
          open={prescriptionDialogOpen}
          onOpenChange={setPrescriptionDialogOpen}
          patientId={patient.id}
        />

        <AddDiagnosisDialog
          open={diagnosisDialogOpen}
          onOpenChange={setDiagnosisDialogOpen}
          patientId={patient.id}
        />
      </div>
    </div>
  );
}
