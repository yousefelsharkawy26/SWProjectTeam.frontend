import { Navigate, replace, useLocation } from "react-router-dom";


const RequireNotAuth = ({ children }) => {
  const auth = localStorage.getItem("token");
  const location = useLocation();
  if (auth) {
    return <Navigate to={"/dashboard"} state={{path: location.pathname, replace: true}} />;
  }

  return children;
};

export default RequireNotAuth;
