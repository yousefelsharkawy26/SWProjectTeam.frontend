import { useState, useEffect } from "react";
import {
  User,
  Appointment,
  MedicationItem,
  MedicalRecord,
} from "@/types/patients";
import axios from "axios";
import UserProvider from "@/context/UserContext";

// Mock data (in a real app, this would come from an API)

export function usePatientData(patientId: string | undefined) {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const { token } = UserProvider.useUser();

  const [patient, setPatient] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medications, setMedications] = useState<MedicationItem[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    if (!patientId) return;

    const fetchPatientData = async () => {
      await axios
        .get(`${apiUrl}/api/patients/patient-Details?id=${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPatient({
            id: res.data.id,
            age: res.data.age,
            avatar: res.data.avatar,
            createdAt: res.data.createdAt,
            email: res.data.email,
            gender: res.data.gender,
            lastVisit: res.data.lastVisit,
            name: res.data.name,
          });
          if (res.data.appointments) setAppointments(res.data.appointments);
          if (res.data.medicalRecords)
            setMedicalRecords(res.data.medicalRecords);

          console.log('Patient profile', res.data);
        })
        .catch((err) => console.error(err));
    };
    // In a real app, we would fetch this data from an API
    fetchPatientData();
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
