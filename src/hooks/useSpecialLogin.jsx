// src/hooks/useSpecialLogin.js
import { useNavigate } from "react-router-dom";

const useSpecialLogin = () => {
  const navigate = useNavigate();

  const checkSpecialLogin = (email, password) => {
    if (email === "Admin" && password === "Admin123") {
      navigate("/registro-docente");
      return true;
    }
    return false;
  };

  return { checkSpecialLogin };
};

export default useSpecialLogin;