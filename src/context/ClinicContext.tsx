import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserProvider from "./UserContext";
import { Patient } from "@/types/patients";
import { ITreatment } from "@/types/Treatment";
import { Appointment } from "@/types";

const ClinicContext = createContext(null);

const ClinicProvider = ({ children }) => {
  const { token } = UserProvider.useUser();
  const [patients, setPatients] = useState<Patient[] | null>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [changed, setChanged] = useState(true);
  const [appointChanged, setAppointChanged] = useState(false);
  const [treatments, setTreatments] = useState<ITreatment[]>([]);
  const [treatmetnChanged, setTreatmentChanged] = useState(true);

  useEffect(() => {
    const apiUrl: string = import.meta.env.VITE_API_URL;
    const fetchData = async () => {
      await axios
        .get(`${apiUrl}/api/clinic/patients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPatients(res.data);
          setChanged(false);
          console.log("patients fetched successfully", res.data);
        })
        .catch((err) => console.error(err));
    };
    if (token && changed) fetchData();
  }, [token, changed]);

  useEffect(() => {
    const apiUrl: string = import.meta.env.VITE_API_URL;
    const fetchTreatments = async () => {
      await axios
        .get(`${apiUrl}/api/clinic/get-plans`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTreatments(res.data);
          setTreatmentChanged(false);
          console.log("treatment fetched", res.data);
        })
        .catch((err) => console.error(err));
    };
    if (token && treatmetnChanged) fetchTreatments();
  }, [token, treatmetnChanged]);

  useEffect(() => {
    const apiUrl: string = import.meta.env.VITE_API_URL;
    const fetchAppointments = async () => {
      await axios
        .get(`${apiUrl}/api/clinic/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAppointments(res.data);
          console.log("appointment fetched successfully", res.data);
        })
        .catch((err) => console.log(err.message));
    };
    if (token) fetchAppointments();
  }, [token, appointChanged]);

  return (
    <ClinicContext.Provider
      value={{
        patients,
        setChanged,
        appointments,
        appointChanged,
        setAppointChanged,
        treatments,
        setTreatmentChanged,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) console.error("usePatient must be used within PatientProvider");

  return context;
};

ClinicProvider.useClinic = useClinic;

export default ClinicProvider;
