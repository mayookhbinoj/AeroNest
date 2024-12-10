import React, { useEffect, useState } from 'react'
import Bk from '../../assets/Images/hanson-lu-FT2WwbS1LJQ-unsplash.jpg';
import { useAppDispatch } from '../../../src/Store/Configure';
import { adminLogin } from '../../actions/AdminAction';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminSchema } from '../../Validation/Validation';
const AdminLoginForm:React.FC = () => {
    const dispatch=useAppDispatch()
    const navigate=useNavigate()
    const [error,setError]=useState<{[key:string]:string}>({})
   const [formData,setData]=useState<{[key:string]:string|number}>({email:"",password:""})
   const {isSucess}=useSelector((state:any)=>state.admin)
   const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setData((prevState)=>({
        ...prevState,[e.target.name]:e.target.value
      }))
   }
   const handleSubmit=async(e:React.FormEvent)=>{
    const result=adminSchema.safeParse(formData)
    if(!result.success){
      const errorMessages: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errorMessages[err.path[0]] = err.message;
        }
      });
      setError(errorMessages);
     }else{
       const response=await dispatch(adminLogin(formData))
       if(response){
        navigate("/admin/Home")
       }
     }
   }
   const inputClass = (field: string) =>
    error[field]
      ? 'mt-1 p-3 text-sm border border-red-500 rounded w-full leading-tight'
      : "w-full text-sm  mt-1 p-3 pl-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none font-custom  ";



  return (
    <div className="min-h-screen py-[200px] flex relative justify-center ">
    <img
      src={Bk}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute  inset-0 bg-black bg-opacity-20 "></div>
    <div className="relative bg-white p-10   w-full  max-w-md rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold font-custom mb-2">Admin Sign In</h1>
        <p className="text-sm mb-19 text-[#948f8f] font-custom">
        Welcome to AeroNest, your travel companion .  
      </p>
      </div>
        <div>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            name='email'
            className={inputClass('email')}
            value={formData.email}
            onChange={handleChange}
          />
             <span className='text-red-500 text-sm mt-3 ml-2'>{error.email}</span>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            name='password'
            className={inputClass('password')}
            value={formData.password}
            onChange={handleChange}
          />
              <span className='text-red-500 text-sm mt-3 ml-2'>{error.password}</span>
        </div>
        <div className="flex flex-row gap-4 mt-3">
         <button
        type="submit"
        onClick={handleSubmit}
        className="w-full   bg-[#0A3C96] text-white font-semibold text-sm py-3 rounded-md"
          >
         Sign In
       </button>
       </div>
        </div>
       </div>
  )
}

export default AdminLoginForm
