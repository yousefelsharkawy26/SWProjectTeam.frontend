import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserProvider from "./UserContext";
import { Patient } from "@/types/patients";

const ClinicContext = createContext(null);

const ClinicProvider = ({ children }) => {
  const { token } = UserProvider.useUser();
  const [patients, setPatients] = useState<Patient[] | null>([]);
  const [appointments, setAppointments] = useState([]);
  const [changed, setChanged] = useState(false);
  const [appointChanged, setAppointChanged] = useState(false);
  

  useEffect(() => {
    const apiUrl: string = import.meta.env.VITE_API_URL;
    const fetchAppointments = async () => {
      await axios.get(`${apiUrl}/api/clinic/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        setAppointments(res.data);
        console.log("appointment fetched successfully", res.data);
      }).catch(err => console.log(err.message));
    }
    if (token)
      fetchAppointments();
  }, [token, appointChanged])

  useEffect(() => {
    const apiUrl: string = import.meta.env.VITE_API_URL;
    const fetchData = async () => {
      await axios.get(`${apiUrl}/api/clinic/patients`, {
        headers: {
          Authorization: `Bearer ${token}`
        }})
      .then(res => {
        setPatients(res.data);
        console.log("patients fetched successfully", res.data);
        
      })
      .catch(err => console.error(err));
    }
    if (token) 
      fetchData();
    
  }, [token, changed]);

  return (
    <ClinicContext.Provider value={{ patients, setChanged, appointments, appointChanged, setAppointChanged }}>
      {children}
    </ClinicContext.Provider>
)};

const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) console.error("usePatient must be used within PatientProvider");

  return context;
};

ClinicProvider.useClinic = useClinic;

export default ClinicProvider;
