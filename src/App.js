import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/login';
import Register from './component/register';
import MainPage from './component/mainpage';
import ForgotPass from './component/forgotpassword';
import AdminDashboard from './component/admindashboard';

function App() {
  return (

    <BrowserRouter>
      <Routes>
      <Route index element={<Login/>} />
      <Route path = "/register" element={<Register/>} />
      <Route path = "/main" element={<MainPage/>} />
      <Route path = "/admindashboard" element={<AdminDashboard/>} />
      <Route path = "/forgotpassword" element={<ForgotPass/>} />

      </Routes>
    </BrowserRouter>



  );
}

export default App;
