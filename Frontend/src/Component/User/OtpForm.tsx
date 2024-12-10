import React, { useEffect, useState } from 'react'
import Bk from '../../assets/Images/hanson-lu-FT2WwbS1LJQ-unsplash.jpg';
import {  useSelector } from 'react-redux';
import {verifyOtp} from "../../actions/apiAction"
import { useAppDispatch } from "../../Store/Configure"
import { useNavigate } from 'react-router-dom';
const OtpForm:React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate=useNavigate()
  const [otp,setOtp]=useState<string>("")
  const [mes,setError]=useState<string>("")
  const {user,message,isOtp}=useSelector((state:any)=>state.user)
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setOtp(e.target.value)
 
  }
  const handleClick=async(e:React.FormEvent)=>{
    try {
      
      const resultt= await dispatch(verifyOtp({otp,userid:user._id})).unwrap()
      if(resultt){
        setError("")
      }
      
    } catch (error) {
      setError("Wrong OTP")
    }
  }

  useEffect(()=>{
    if(isOtp){
      navigate("/user/sucess")
    }
  },[isOtp])
  return (
   
    <div className='min-h-screen flex items-center justify-center '>
       <img
        src={Bk}
        alt="Background"
        className="absolute  w-full h-full object-cover "
      />
       <div className="relative bg-white p-8 w-full   font-custom w-full max-w-lg rounded-lg ">
        <h1 className='text-lg  font-bold py-2'>YOURE ALMOST THERE </h1>
        <p className='text-xs w-full text-gray-500 pb-5'>You are just one step away from creating your flying Returns account and entering <br /> a word of new possibilities verify your mobile number using OTP to get started</p>
        <h1 className='text-SM text-gray-800  font-bold pb-6'>VERIFY YOUR EMAIL</h1>
        <p className='text-xs w-full text-gray-500 pb-5'>OTP send to your email <span className=' text-red-500 font-semilight text-sm ml-3'>{mes}</span> </p>
        <div className='flex gap-10'>
        <input 
        className='w-[280px] h-[50px] border-x-2 border-slate-200 border-y-2 text-center tex-sm rounded-lg font-bold'
         type="text"
         name='otpvalue'
         id='otp'
         value={otp as string}
         onChange={handleChange}
          placeholder='Please Enter Otp' />
        <button
         className='bg-[#0A3C96] text-white font-custom text-sm w-full rounded-md font-semibold' 
         onClick={handleClick}>
          Verify OTP
          </button>
        </div>
  
       
       </div>
     
    </div>
   
  )
}

export default OtpForm
