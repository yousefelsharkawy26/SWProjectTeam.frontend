import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserProvider from "./UserContext";
import Dentist from "@/types/dentist";

const DentistContext = createContext(null);

const DentistProvider = ({ children }) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const { token } = UserProvider.useUser();
  const [dentists, setDentists] = useState<Dentist[]>([]);

  useEffect(() => {
    const fetchDentists = async () => {
      await axios
        .get(`${apiUrl}/api/dentist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setDentists(response.data);
          console.log("Data fetched successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    if (token) fetchDentists();
  }, [apiUrl, token]);

  return (
    <DentistContext.Provider value={{ dentists }}>
      {children}
    </DentistContext.Provider>
  );
};

const useDentist = () => {
  const context = useContext(DentistContext);
  if (!context) console.error("useDentist must be used within PatientProvider");

  return context;
};

DentistProvider.useDentist = useDentist;

export default DentistProvider;
