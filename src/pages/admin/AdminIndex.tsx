// import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDBIndex from "./dashboard/AdminDBIndex";
import AdminLogin from "./auth/AdminLogin";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AdminNavbar from "../../components/header/AdminNavbar";
import ViewMembers from "./members/ViewMembers";
import Footer from "../../components/footor/Footer";
import { Container } from "@mui/material";

const AdminIndex = () => {
  const { admin } = useContext(AuthContext);
 
  
  return (
    <>
      <AdminNavbar />
      <Container sx={{height:"90vh"}}>
    
      <Routes>
        {(admin !== null) ? (
          <>
            <Route path='*' element={<Navigate to='/admin/' />} />
            <Route index element={<AdminDBIndex />} />
            <Route path="/members" element={<ViewMembers />} />
          </>
        ) : (
          <>
            <Route path='*' element={<Navigate to='/admin/login' />} />
            <Route path="/login"element={<AdminLogin />} />
          </>
        )}
        {/* <Route path="/user" element={<UserIndex/>}/> */}
      </Routes>
      </Container>
      <Footer/>
    </>
  );
};

export default AdminIndex;
