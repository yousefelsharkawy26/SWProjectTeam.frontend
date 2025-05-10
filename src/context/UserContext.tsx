import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userChanged, setUserChanged] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const loginAction = async (data) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      toast.error("API URL is not defined");
      return;
    }
    // Mock login - in a real application, this would call an API
    return await axios
      .post(`${apiUrl}/api/signin`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        toast.success("Login successful!");
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  
    //localStorage.setItem('token', data.token);
  }

  const registerAction = async (data) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      toast.error("API URL is not defined");
      return;
    }
    // Mock login - in a real application, this would call an API
    return await axios
      .post(`${apiUrl}/api/signup`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        toast.success("Register successful!");
      })
      .catch((error) => {
        console.error("Register error:", error);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  useEffect(() => {
    const apiUrl: string = import.meta.env.VITE_API_URL;
    const fetchData = async () => {
      await axios.get(`${apiUrl}/api/userdetails`, {
        headers: {
          Authorization: `Bearer ${token}`
        }})
      .then(res => {
        setUser({
            firstname: res.data.firstName,
            lastname: res.data.lastName,
            email: res.data.email,
            bio: res.data.bio,
            phone: res.data.phone,
            imageUrl: res.data.imageUrl,
            permission: res.data.permission
          })
        }
      )
      .catch(err => console.error(err));
    }
    if (token) 
      fetchData();
    
  }, [token, userChanged]);
  
  return (
    <UserContext.Provider value={{ user, userChanged, setUserChanged, token, handleLogout, loginAction, registerAction }}>
        {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

UserProvider.useUser = useUser;

export default UserProvider;


