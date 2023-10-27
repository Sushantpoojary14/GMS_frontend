import { Navigate, Route, Routes } from "react-router-dom";
import UserDBIndex from "./dashboard/UserDBIndex";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserLogin from "./auth/UserLogin";
import UserNavbar from "../../components/header/UserNavbar";
import Footer from "../../components/footor/Footer";
import TrainerIndex from "./trainers/TrainerIndex";
import { Box, Container } from "@mui/material";
import MemberIndex from "./members/MemberIndex";
import AttendanceIndex from "./attendance/AttendanceIndex";

const UserIndex = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <UserNavbar />
      <Box minHeight={"100vh"}>
   
        <Routes>
          {user !== null ? (
            <>
              <Route index element={<UserDBIndex />} />
              <Route path="*" element={<Navigate to="/user/" />} />
              <Route path="/trainer" element={<TrainerIndex />} />
              <Route path="/members" element={<MemberIndex />} />
              <Route path="/attendance" element={<AttendanceIndex />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/user/login" />} />
              <Route path="/login" element={<UserLogin />} />
            </>
          )}
          {/* <Route path="/user" element={<UserIndex/>}/> */}
        </Routes>
        
      </Box>
      <Footer />
    </>
  );
};

export default UserIndex;
