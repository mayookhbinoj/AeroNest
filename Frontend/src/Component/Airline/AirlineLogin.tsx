import React, { useEffect, useState } from 'react'
import Bk from '../../assets/Images/hanson-lu-FT2WwbS1LJQ-unsplash.jpg';
import { airlineLogine } from "../../Validation/Validation"
import { useAppDispatch } from "../../Store/Configure"
import toast from 'react-hot-toast';
import { airlineLogin } from '../../actions/AirlineAction';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AirlineLogin:React.FC = () => {
  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const {isSucess,message}=useSelector((state:any)=>state.airline)
  const [data,setEmail]=useState<{[key:string]:string}>({email:""})
  const [error,setError]=useState<{[key:string]:string}>({})
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setEmail((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))
  }

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
      const result=airlineLogine.safeParse(data)
      if(!result.success){
        console.log("enter in to error")
        const errorMessages: { [key: string]: string } = {};
         result.error.errors.forEach((err:any) => {
        if (err.path.length > 0) {
          console.log("error",err.message)
          errorMessages[err.path[0]] = err.message;
        }
      });
      setError(errorMessages);
      }else{
         try {
          console.log("enter")
          setError({})
          let result=await dispatch(airlineLogin(data))
         
          
         } catch (error) {
          console.log("error",error)
          toast.error("Not found")
         }
      }
   
  }
  useEffect(()=>{
    if(isSucess){
      navigate("/airline/Home")
    }

  },[navigate,isSucess])

  const inputClass = (field: string) =>
    error[field]
      ? 'mt-1 p-2 text-sm border border-red-500 rounded w-full leading-tight'
      : "w-full text-sm  mt-1 p-2 pl-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none font-custom  ";

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
        <h1 className="text-xl font-bold font-custom mb-2">Airline Sign In</h1>
        <p className="text-sm mb-19 text-[#948f8f] font-custom">
        Welcome to AeroNest, your travel companion .  
      </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            name='email'
            className={inputClass('email')}
            value={data.email as string}
            onChange={handleChange}
          />
              {message? (<span className='text-red-500 text-sm mt-3 ml-2  border-red-600'>{message}</span>): (<span className='text-red-500 text-sm mt-3 ml-2'>{error.email}</span>)}
        </div>
        <div className="flex flex-row gap-4">
    <button
     type="submit"
    className="w-full   bg-[#0A3C96] text-white font-semibold text-sm py-3 rounded-md"
     >
    Sign In
  </button>

   </div>
      </form>
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Not a member?
          <a href="/airline/Register" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
 
    </div>
  </div>
  )
}

export default AirlineLogin
