import { useState, useEffect } from "react";
import {
  User,
  Appointment,
  MedicationItem,
  MedicalRecord,
  Patient,
} from "@/types/patients";
import axios from "axios";
import UserProvider from "@/context/UserContext";
import ClinicProvider from "@/context/ClinicContext";
import { differenceInCalendarYears } from "date-fns";

// Mock data (in a real app, this would come from an API)

export function usePatientData(patientId: string | undefined) {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const { token } = UserProvider.useUser();
  const context = ClinicProvider.useClinic();
  const patients: Patient[] = context.patients;
  const appointmentsData: Appointment[] = context.appointments;

  const [patient, setPatient] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medications, setMedications] = useState<MedicationItem[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;

    const fetchMedicalRecords = async () => {
      await axios
        .get(`${apiUrl}/api/patients/patient-medicalRecords?id=${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setMedicalRecords(res.data);
          setLoading(false);
          console.log("Patient profile", res.data);
        })
        .catch((err) => {
          console.error(err)
          setLoading(false);
        });
    };

    const user: Patient = patients.find((p) => p.id == patientId);
    if (user) {
      setPatient({
        id: user?.id,
        age: differenceInCalendarYears(new Date(), user?.dateOfBirth),
        avatar: user?.imageUrl,
        createdAt: `${user?.createdAt}`,
        email: user?.email,
        gender: user?.gender,
        lastVisit: user?.lastVisit,
        name: user?.firstName + " " + user?.lastName,
      });

      const appoints = appointmentsData.filter((a) => a.patientId == patientId);
      setAppointments(appoints);

      fetchMedicalRecords();
    }

    // // In a real app, we would fetch this data from an API
  }, [patientId, patients, appointmentsData]);

  const handleAddMedicalRecord = (record: MedicalRecord) => {
    setMedicalRecords([...medicalRecords, record]);
  };

  return {
    patient,
    appointments,
    medications,
    medicalRecords,
    handleAddMedicalRecord,
    loading,
  };
}
