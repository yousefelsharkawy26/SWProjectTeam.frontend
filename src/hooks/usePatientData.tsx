import { useState, useEffect } from "react";
import {
  User,
  Appointment,
  MedicationItem,
  MedicalRecord,
} from "@/types/patients";

// Mock data (in a real app, this would come from an API)
const mockPatients: User[] = [
  {
    id: "1234903439",
    name: "John Doe",
    email: "john.doe@example.com",
    gender: "Male",
    age: 30,
    avatar: "",
    lastVisit: "6 months",
    createdAt: "2023-08-15T10:30:00Z",
  },
  {
    id: "9876543210",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    gender: "Female",
    age: 42,
    avatar: "",
    lastVisit: "2 months",
    createdAt: "2023-10-05T14:15:00Z",
  },
  {
    id: "5678901234",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    gender: "Male",
    age: 55,
    avatar: "",
    lastVisit: "1 month",
    createdAt: "2023-11-20T09:45:00Z",
  },
];

const mockAppointments: Appointment[] = [
  {
    id: "app1",
    patientId: "1234903439",
    title: "check-up reminder",
    doctor: "Dr. Mohamed",
    date: "2023-12-10T10:00:00Z",
    type: "check-up",
    notes: "Regular checkup",
    completed: true,
  },
  {
    id: "app2",
    patientId: "1234903439",
    title: "X-Ray Results",
    doctor: "Dr. Mohamed",
    date: "2023-11-05T14:30:00Z",
    type: "x-ray",
    notes: "Review X-Ray results",
    completed: false,
  },
];

const mockMedications: MedicationItem[] = [
  {
    id: "med1",
    patientId: "1234903439",
    title: "Process 1",
    schedule: "Monthly Prescription",
    dosage: "10mg",
    startDate: "2023-11-01T00:00:00Z",
    endDate: "2024-02-01T00:00:00Z",
  },
  {
    id: "med2",
    patientId: "1234903439",
    title: "Process 2",
    schedule: "As Needed",
    dosage: "5mg",
    startDate: "2023-12-01T00:00:00Z",
  },
];

export function usePatientData(patientId: string | undefined) {
  const [patient, setPatient] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medications, setMedications] = useState<MedicationItem[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    if (!patientId) return;

    // In a real app, we would fetch this data from an API
    const foundPatient = mockPatients.find((p) => p.id === patientId);
    if (foundPatient) {
      setPatient(foundPatient);

      // Filter appointments for this patient
      const patientAppointments = mockAppointments.filter(
        (app) => app.patientId === patientId
      );
      setAppointments(patientAppointments);

      // Filter medications for this patient
      const patientMedications = mockMedications.filter(
        (med) => med.patientId === patientId
      );
      setMedications(patientMedications);
    }
  }, [patientId]);

  const handleAddMedicalRecord = (record: MedicalRecord) => {
    setMedicalRecords([...medicalRecords, record]);
  };

  return {
    patient,
    appointments,
    medications,
    medicalRecords,
    handleAddMedicalRecord,
  };
}
