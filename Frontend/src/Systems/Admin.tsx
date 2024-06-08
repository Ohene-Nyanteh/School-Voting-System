
import { Route, Routes } from "react-router-dom";
import AdminPage from "./Admin/AdminPage";
import AdminLogin from "./Admin/AdminLogin";

export default function Admin() {


  return (
    <Routes>
        <Route path="/" element={<AdminLogin />}/>
        <Route path="/AdminPage/*" element={<AdminPage />}/>
    </Routes>
  );
}
