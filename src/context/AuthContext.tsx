import { ReactNode, createContext, useEffect, useState } from "react";
import { adminData, userData } from "../assets/types/auth";
import jwt_decode from "jwt-decode";
import {  useNavigate } from "react-router-dom";
interface adminPara {
  data: adminData;
  token: string;
}
interface userPara {
  data: userData;
  token: string;
}
type context = {
  user: userData | null;
  admin: adminData | null;
  userToken: string | null;
  adminToken: string | null;
  userLogin: ({ data, token }: userPara) => void;
  adminLogin: ({ data, token }: adminPara) => void;
  userLogout: () => void;
  adminLogout: () => void;
};
const initialContextValue = {
  user: null,
  admin: null,
  userToken: "",
  adminToken: "",

  userLogin: () => {},
  adminLogin: () => {},
  userLogout: () => {},
  adminLogout: () => {},
};

const AuthContext = createContext<context>(initialContextValue);
//ReactNode type represents any valid React child.
const MainAuthContext = ({ children }: { children: ReactNode }) => {
const navigate = useNavigate();

  const userLSV: userData | null = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user")!)
    : null;
  const userLVToken: string | null = sessionStorage.getItem("userToken");
  const adminLSV: userData | null = sessionStorage.getItem("admin")
    ? JSON.parse(sessionStorage.getItem("admin")!)
    : null;
  const adminLVToken: string | null = sessionStorage.getItem("adminToken");

  const [user, setUser] = useState<userData | null>(userLSV);
  // const [test, setTest] = useState(null);
  const [userToken, setUserToken] = useState<string | null>(userLVToken);
  const [admin, setAdmin] = useState<adminData | null>(adminLSV);
  const [adminToken, setAdminToken] = useState<string | null>(adminLVToken);
  
  useEffect(() => {
   
    if (userToken) {
      const { exp }: { exp: number } = jwt_decode(userToken);
      if (exp < (new Date().getTime() + 1) / 1000) {
        userLogout();
      }
    }
    if (adminToken) {
      const { exp }: { exp: number } = jwt_decode(adminToken);
      if (exp < (new Date().getTime() + 1) / 1000) {
        adminLogout();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken, adminToken]);

  const userLogin = ({ data, token }: userPara) => {
   
    setUser(data);
    setUserToken(token);
    sessionStorage.setItem("user", JSON.stringify(data));
    sessionStorage.setItem("userToken", token);
  };
  const userLogout = () => {
    setUser(null);
    setUserToken(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userToken");
  };
  const adminLogin = ({ data, token }: adminPara) => {
    setAdmin(data);
    setAdminToken(token);
    sessionStorage.setItem("admin", JSON.stringify(data));
    sessionStorage.setItem("adminToken", token);
  };
  const adminLogout = () => {
    setAdmin(null);
    setAdminToken(null);
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("adminToken");
    navigate("/admin/")
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        userLogin,
        adminLogin,
        adminToken,
        userToken,
        userLogout,
        adminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, MainAuthContext };
