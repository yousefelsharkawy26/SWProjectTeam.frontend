import { Navigate, useLocation } from "react-router-dom";


const RequireAuth = ({ children }) => {
  const auth = localStorage.getItem("token");
  const location = useLocation();
  if (!auth) {
    return <Navigate to={"/login"} state={{path: location.pathname}} />;
  }

  return children;
};

export default RequireAuth;
