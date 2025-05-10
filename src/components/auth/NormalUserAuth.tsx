import UserProvider from "@/context/UserContext";
import { Navigate, useLocation } from "react-router-dom";


const NormalUserAuth = ({ children }) => {
  const user = UserProvider.useUser().user;
  const location = useLocation();
  if (user?.permission === 'user') {
    return <Navigate to={"/posts"} state={{path: location.pathname}} />;
  }

  return children;
};

export default NormalUserAuth;
