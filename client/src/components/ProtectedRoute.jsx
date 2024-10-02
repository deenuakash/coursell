import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Login } from "../pages";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Login />;
  }
  return element;
};

export default ProtectedRoute;
