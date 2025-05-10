import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserProvider from "./UserContext";
import { IInventory } from "@/types/Inventory";

const InventoryContext = createContext(null);

const InventoryProvider = ({ children }) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const { token } = UserProvider.useUser();
  const [inventories, setInventories] = useState<IInventory[]>([]);
  const [changed, setChanged] = useState(true);

  useEffect(() => {
    const fetchInventoryData = async () => {
        await axios
          .get(`${apiUrl}/api/inventory`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setInventories(res.data);
            setChanged(false);
            console.log('from inventory context', res.data);
          })
          .catch((err) => console.error(err));
      };
      if (token && changed) fetchInventoryData();
  }, [apiUrl, token, changed]);

  return (
    <InventoryContext.Provider value={{ inventories, setChanged }}>
      {children}
    </InventoryContext.Provider>
)};

const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) console.error("useInventory must be used within PatientProvider");

  return context;
};

InventoryProvider.useInventory = useInventory;

export default InventoryProvider;
