import React from 'react'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"

import Register from "../pages/User/Register"
import VerifyOto from "../pages/User/VerifyOto"
import  Sucess from "../pages/User/Sucess"
import Login  from '../pages/User/Login'
import Vhome  from '../pages/User/Vhome'
import Profile from "../pages/User/Profiem"

import AirlineLogin from "../pages/Airline/AirlineLog"
import AirlineRegistrationDesign from "../pages/Airline/AirlineRegistration"
import AirlineHom from "../pages/Airline/AirlineHom"
import AdminLoginForm from '../Component/Admin/AdminLoginForm'
import AdminHome from '../pages/Admin/AdminHome'


function Routers() {
 
  
  return (
    <div>
      <Router>
      <Routes>
        <Route path='/user/Register' element={<Register/>} />
        <Route path='/user/verifyOtp' element={<VerifyOto/>} />
        <Route path='/user/sucess' element={<Sucess/>} />
        <Route path='/user/login' element={<Login/>}/>
        <Route path='/user/Home' element={<Vhome/>}/>
        <Route path='/user/Profile' element={<Profile/>}/>


        {/* Airline */}
        <Route path='/airline/login' element={<AirlineLogin/>} />
        <Route path='/airline/Register' element={<AirlineRegistrationDesign/>} />
        <Route path='/airline/Home' element={<AirlineHom/>} />

       {/* Admin */}
       <Route path='/admin/login' element={<AdminLoginForm/>}/>
       <Route path='/admin/Home' element={<AdminHome/>}/>

      </Routes>
      </Router>
    </div>
  )
}

export default Routers
