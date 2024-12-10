import React, { useEffect, useState } from 'react';
import Bk from '../../assets/Images/hanson-lu-FT2WwbS1LJQ-unsplash.jpg';
import { loginSchema } from "../../Validation/Validation";
import {login} from "../../actions/apiAction"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Store/Configure';
import {signInWithPopup} from "firebase/auth"
import {auth,gooogleprovider} from "../../firebase"
import {googleLogin} from "../../../src/actions/apiAction"

const LoginForm: React.FC = () => {
const navigate=useNavigate()
const dispatch=useDispatch<AppDispatch>()
const  {isSucess,user,message}=useSelector((state:any)=>state.user)
const [formData,setData]=useState<{[key:string]:string|number}>({email:"",password:""})
const [error,setError]=useState<{[key:string]:string}>({})

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setData((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))

  }
  const handleSubmit=async(e:React.FormEvent)=>{
     e.preventDefault()
     const result=loginSchema.safeParse(formData)
     if(!result.success){
      const errorMessages: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errorMessages[err.path[0]] = err.message;
        }
      });
      setError(errorMessages);
     }else{
      console.log("clicked")
        const result=await dispatch(login(formData)).unwrap()
        if(result){
          console.log(isSucess,user)
          if(isSucess||user){
          navigate("/user/Home")
          }
        }
      
     } 
     
  }
  useEffect(()=>{
    if(isSucess ||user){
      navigate("/user/Home")
    }
  
  },[isSucess,user])
   
  const google=async()=>{
    try {
        console.log("hey",auth,gooogleprovider)
        const result=await signInWithPopup(auth,gooogleprovider)
        console.log(result)
         const response = await  dispatch(googleLogin(result))
               
    } catch (error) {
      console.log("error issue man",error)
      
    }
  
   }
  
 
  const inputClass = (field: string) =>
    error[field]
      ? 'mt-1 p-4 text-sm border border-red-500 rounded w-full leading-tight'
      : "w-full text-sm  mt-1 p-4 pl-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none font-custom  ";


  return (
    
    <div className="min-h-screen py-[150px] flex relative justify-center ">
      <img
        src={Bk}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute  inset-0 bg-black bg-opacity-20 "></div>
      <div className="relative bg-white p-10   w-full max-w-md rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold font-custom mb-2">Sign In</h1>
          <p className="text-sm mb-4 text-[#948f8f] font-custom">
          Welcome to AeroNest, your travel companion.
         
        </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
           
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              name='email'
              onChange={handleChange}
              value={formData.email as string}
              className={inputClass('email')}
     
            />
            <span className='text-red-500 text-sm mt-3 ml-2'>{error.email}</span>
          </div>

          <div>
          
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              name='password'
              value={formData.password as string}
              className={inputClass('password')}
        
            />{message?( <span className='text-red-500 text-sm mt-3 ml-2'>{message}</span>):(  <span className='text-red-500 text-sm mt-3 ml-2'>{error.password}</span>)}
             
              
          </div>

          <div className="flex justify-between items-center">
          
            {/* <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a> */}
          </div>

          <div className="flex flex-row gap-4">
  <button
    type="submit"
    className="w-full max-w-44   bg-[#0A3C96] text-white font-semibold text-sm py-3 rounded-md"
  >
    Sign In
  </button>
  <button
    type="button"
    className="w-full max-w-44 flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-md hover:bg-gray-100"
    onClick={google}
   
  >
    <img
      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
      alt="Google logo"
      className="w-5 h-5"
    />
    <span className="text-sm text-gray-700">Sign in with Google</span>
  </button>
</div>

        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Not a member?
            <a href="/user/register" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
   
      </div>
    </div>
  );
};

export default LoginForm;
