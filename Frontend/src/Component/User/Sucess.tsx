import React from 'react'
import Bk from '../../assets/Images/hanson-lu-FT2WwbS1LJQ-unsplash.jpg';
import sces from "../../assets/Images/icons8-success-50.png"
import { useNavigate } from 'react-router-dom';
const Sucess:React.FC = () => {
  const navigate=useNavigate()
  const handleChange=(e:React.FormEvent)=>{
         navigate("/user/Home")

  }
  return (
    <div className='  min-h-screen flex items-center justify-center  '>
       <img
        src={Bk}
        alt="Background"
        className="absolute  w-full h-full object-cover "
      />
           <div className='absolute inset-0 bg-black bg-opacity-10'></div>
       <div className="relative bg-white p-8 w-full   font-custom w-full max-w-lg rounded-lg ">
        <div className=' flex gap-3 justify-center'>
            <h1 className='text-lg  font-bold py-2'>Congratulations  </h1>
            <img 
            src={sces}
            className='w-6 h-6 mt-2 '
             alt="" 
             />
             </div>
        <p
         className='text-xs w-full text-gray-500 pb-5 ml-4 '>
         Your Flying returns account Registration Is complete and you can now enjoy <span className='flex justify-center mt-2' >personalied  expereince  and benifits by our frequent </span> 
          </p>
        <h1
         className='text-SM text-gray-800 font-custom  font-bold pb-6 flex justify-center'
         >Step into a realm of endless possibilities
         </h1>
         <div className='flex justify-center'>
         <button 
         className='bg-[#0A3C96]  text-white font-custom text-sm w-40 h-10 rounded-md font-semibold'
         onClick={handleChange}
         >SignIn
         </button>
         </div>
 
       </div>
     
    </div>
  )
}

export default Sucess
