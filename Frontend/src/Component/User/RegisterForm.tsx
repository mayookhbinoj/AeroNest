import React, {  useEffect, useState } from 'react';
import Bk from '../../assets/Images/hanson-lu-FT2WwbS1LJQ-unsplash.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Store/Configure';
import { registerUser } from "../../actions/apiAction";
import { userSchema } from "../../Validation/Validation";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../../Store/Configure"

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate=useNavigate()

 let  {message,isSucess,user,isError}=useSelector((state:any)=>state.user
)

  const [formData, setData] = useState<{ [key: string]: string | number }>({
    title: '',
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit =async  (e: React.FormEvent) => {
    e.preventDefault();
    const result = userSchema.safeParse(formData);
    if (!result.success) {
     
      const errorMessages: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errorMessages[err.path[0]] = err.message;
        }
      });
      setErrors(errorMessages);
    }  else {
              setErrors({});
             try {
               console.log(formData)
              const response=await dispatch(registerUser(formData))
              console.log(response)
              
             } catch (error:any) {
              console.log("error",error)
              if(error.message=="Email already exists"){
                console.log("error enter")
                setErrors({email:"Email Exists"})
              }
              
             }
    }
  };

  useEffect(()=>{
    if(isError){
      console.log("message",message)
    }
    if(isSucess||user){
      navigate("/user/verifyOtp")
    }

  },[isSucess,user,navigate,isError])


  const inputClass = (field: string) =>
    errors[field]
      ? 'mt-1 p-3 text-sm border border-red-500 rounded w-full leading-tight'
      : 'mt-1 p-3 text-sm border border-gray-300 rounded w-full leading-tight';
     
  return (
    <div className="min-h-screen py-[120px] flex relative justify-center">
      <img
        src={Bk}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className='absolute inset-0 bg-black bg-opacity-10'></div>
      <div className="container max-w-[750px] w-full sm:w-[90%] lg:max-w-[850px] h-auto p-6 sm:p-7 mx-4 my-0 bg-white z-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2 font-custom">CREATE AN ACCOUNT</h2>
        <p className="text-sm mb-4 text-[#948f8f] font-custom">
          Enter the details below to start setting up your flying returns account.
        </p>

        <form onSubmit={onSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-1 md:mb-0 ">
              <label htmlFor="title" className="block text-lg font-medium   ">
                Title 
              </label>
              <select
                id="title"
                className= 'mt-0 p-3 text-sm border border-gray-300 rounded w-full leading-tight'
                name="title"
                value={formData.title as string}
                onChange={handleChange}
              >
                <option value="">Select a title</option>
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
                <option value="ms">Ms.</option>
              </select>
              {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
            </div>
            <div className="flex-1 mb-4 md:mb-0">
              <label htmlFor="name" className="block text-lg font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className={inputClass('name')}
                value={formData.name as string}
                onChange={handleChange}
              />
              {<span className="text-red-500 text-sm">{errors.name}</span>}
            </div>
            <div className="flex-1">
              <label htmlFor="last-name" className="block text-lg  font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastName"
                placeholder="Enter your last name"
                className={inputClass('lastName')}
                value={formData.lastName as string}
                onChange={handleChange}
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label htmlFor="email" className="block text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={inputClass('email')}
                value={formData.email as string}
                onChange={handleChange}
              />
              {message?(<span className='text-red-500 text-sm'>{message}</span>)
              :(errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>)}
           
            </div>
            <div className="flex-1">
              <label htmlFor="phone" className="block text-lg font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                className={inputClass('phoneNumber')}
                value={formData.phoneNumber as string}
                onChange={handleChange}
              />
              {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label htmlFor="password" className="block text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                className={inputClass('password')}
                value={formData.password as string}
                onChange={handleChange}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>
            <div className="flex-1 mb-4 md:mb-0">
              <label htmlFor="password" className="block text-lg font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                name="password1"
                placeholder="Enter your Password"
                className={inputClass('password')}
                value={formData.password1 as string}
                onChange={handleChange}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>
          </div>

          <div className="mb-4 flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto p-2 py-2 px-4 text-md font-semibold bg-[#00266b] text-white rounded hover:bg-blue-700 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
