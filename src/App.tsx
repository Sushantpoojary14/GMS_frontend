// import { useState } from 'react'

import { Route, Routes } from "react-router-dom";
import AdminIndex from "./pages/admin/AdminIndex";
import UserIndex from "./pages/user/UserIndex";
import Not_Found from "./pages/common/Not_Found";

const App = () => {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/*" element={<UserIndex/>}/>
      <Route path="/admin/*" element={<AdminIndex/>} />
      <Route path="/user/*" element={<UserIndex/>}/>
      <Route path="*" element={<Not_Found/>}/>
    </Routes>
  );
};

export default App;
