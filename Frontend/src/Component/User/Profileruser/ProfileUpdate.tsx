
import { div } from 'framer-motion/client';
import React, { useMemo, useState } from 'react';
import { FaUserCircle,FaWallet,FaRegCalendarAlt,FaUserFriends  } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useAppDispatch } from "../../../Store/Configure"
import { profileEdit,contactEdit,passportEdit} from '../../../actions/apiAction';
import toast,{Toaster} from "react-hot-toast"
import countryList from 'react-select-country-list'
import { number } from 'zod';

const ProfileUpdate: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectcountry,setCountry]=useState("")
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [Passport,setPassport]=useState<Boolean>(false)
  const [contactOpen,setContact]=useState<Boolean>(false)
  const [active,setActive]=useState<string>("Account")
  const {name,lastName,title,_id,email,phoneNumber,passportDetails,dateOfIssue,dateOfExpiry,nationality} = useSelector((state: any) => state.user.user.newUser);
  const [passportData,setPassportData]=useState<{[key:string]:string |number}>({_id:_id,passportNumber:passportDetails?.passportNumber||"",nationality:passportDetails?.nationality||selectcountry ,dateOfIssue:passportDetails?.dateOfIssue||"",dateOfExpiry:passportDetails?.dateOfExpiry||""})
  const [formData,setFormData]=useState<{[key:string]:string|number}>({
    title:title,
    name:name,
    lastName:lastName,
    _id:_id,
  
  })

  const [contactData,setContactData]=useState<{[key:string]:string}>({  email:email,
    phoneNumber:phoneNumber,_id:_id})
console.log("phone",phoneNumber)
  
  const handleClick=(tab:string,event: React.MouseEvent<HTMLAnchorElement>)=>{
    event.preventDefault()
    setActive(tab)

  }
  const handleChange=(e:React.ChangeEvent< HTMLInputElement>)=>{
   
     setFormData((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
     }))
   

  }
  const onSubmit=async(e:React.FormEvent)=>{
    try {
      e.preventDefault()
      console.log(formData)
      const result=await dispatch(profileEdit(formData))
      if(result){
        console.log("sucss")
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log("error",error)
     
    }

  }


  //contact submitting

  const handleContactChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setContactData((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))
  }

  const contactSubmit=async(e:React.FormEvent)=>{
     try {
      e.preventDefault()
      console.log(contactData)
      const contactResult=await dispatch(contactEdit(contactData))
      if(contactResult){
        console.log("sucss")
        toast.success("Contact updated successfully");
      }
     } catch (error) {
      console.log("eror",error)
     }
  }

  //passport
  const option=useMemo(()=>countryList().getData(),[])
  const handleNationalityChange=(e:React.ChangeEvent<HTMLSelectElement |HTMLInputElement>)=>{
    e.preventDefault()
    setCountry(e.target.value)
    setPassportData((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))
     
  }

const passPortSubmit=async(e:React.FormEvent)=>{
  e.preventDefault()
  try {
    console.log("passport cliked")
   console.log(passportData)
   const result=await dispatch(passportEdit(passportData))
   if(result){
    toast.success("Passport details updated successfully");
   }

  } catch (error) {
    console.log("error passport",error)
  }
}
  

  return (
    <div>
   <section className='flex'>
    <div className="card-body mt-6 bg-white w-[18%] p-10 ml-32 ">
      <ul className="flex flex-col gap-4 nav-pills  ">
        <li className="nav-item " role="presentation">
          <a
            className="nav-link text-md font-custom font-semibold fs-15 active flex items-center gap-2 hover:text-[#00266b]"
            href="#custom-v-pills-profile"
            role="tab"
            onClick={(event)=>handleClick("Account",event)}
            aria-selected="true"
         
          >
            <FaUserCircle size={20} />
           Account Info
          </a>
        </li>

        <li className="nav-item" role="presentation">
          <a
            className="nav-link text-md fs-15 flex items-center font-custom  font-semibold gap-2 hover:text-[#00266b]"
            href="#custom-v-pills-order"
            role="tab"
            onClick={(event)=>handleClick("Booking",event)}
            aria-selected="false"
            tabIndex={-1}
          >
            <FaRegCalendarAlt size={20}/>
         Booking
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link text-md fs-15 flex items-center font-custom  font-semibold gap-2 hover:text-[#00266b]"
            href="#custom-v-pills-order"
            role="tab"
            aria-selected="false"
            tabIndex={-1}
          >
            <FaUserFriends size={20}/>
         Co-Traveller
          </a>
        </li>

        <li className="nav-item" role="presentation">
          <a
            className="nav-link text-md fs-15 flex items-center font-custom  font-semibold gap-2 hover:text-[#00266b]"
            href="#custom-v-pills-wallet"
            role="tab"
            aria-selected="false"
            tabIndex={-1}
          >
            <FaWallet size={20}/>
          Wallet
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link text-md fs-15 flex items-center gap-3 font-custom  font-semibold hover:text-[#00266b]"
            href="/logOut"
          >
           <FiLogOut size={20}/> Logout
          </a>
        </li>
      </ul>
    </div>
    {active =="Account"&&(  
     <div className="container w-[980px]  h-auto p-6 sm:p-7 mx-4 my-0 mt-6  bg-white z-10 rounded-lg shadow-md font-custom">
      <div className='flex gap-3'>
      <h1 className=' text-2xl font-semibold text-[#00266b] my-3 '>Acccount</h1>
      <h3 className='text-sm mt-5 font-semibold opacity-60'>Personal details</h3>
      </div>
      <div >
      <div className="relative inline-block text-left mb-5">
      <button
        id="dropdownButton"
        onClick={() => setIsOpen(!isOpen)}
        className="text-black bg-[#f7f8f8] justify-between items-center w-[800px] border font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center font-custom  "
        type="button"
      >
        Personal information
        <svg
          className=" w-2.5 h-2.5 ms-3 "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownMenu"
          className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-full h-auto  mb-3 dark:bg-gray-700 mt-2 " >  
             <form onSubmit={onSubmit} >     
            <div className=" flex flex-col md:flex-row md:space-x-4 mb-4">
         
            <div className="pl-5 flex-1 mb-1 md:mb-4 ">
              <label htmlFor="title" className="block text-sm font-medium  mb-1 ">
                Title 
              </label>
              <select
                id="title"
                className= 'mt-0 p-3 text-sm border border-gray-300 rounded w-full leading-tight'
                onChange={handleChange}
                value={  formData.title as string}
                name="title">
                
                <option value="">{title} </option>
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
                <option value="ms">Ms.</option>
              </select>
            
            </div>
            <div className="flex-1 mb-4 md:mb-0">
              <label htmlFor="name" className="block text-md font-medium text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"

                onChange={handleChange}
                value={ formData.name as string}
                className='mt-1 p-3 text-sm border border-gray-300 rounded w-full leading-tight'
              />
            
            </div>
            <div className="pr-5 flex-1 mb-1 md:mb-4  ">
              <label htmlFor="last-name" className="block text-md font-medium text-sm ">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName as string}
                placeholder="Enter your last name"
                className=" mt-1 p-3 text-sm border border-gray-300 rounded w-full leading-tight"
             
              />
            
            </div>
            <div className="pr-5 flex-1 mb-1 md:mb-4  ">
            <button
            type="submit"
            className="mt-6 p-2 w-full pl-5 pr-5 text-md font-semibold font-custom text-[#00266b] border-[#00266b] bg-white border-2 hover:bg-[#00266b] hover:text-white "
          >
          Save
          </button>
          </div>
          </div>
          </form>
          
  
        </div>
      )}
    </div>
      </div>
      <div >
      <div className="relative inline-block text-left mb-5">
      <button
        id="dropdownButton"
        onClick={() => setContact(!contactOpen)}
        className="text-black bg-[#f7f8f8] justify-between items-center w-[800px] border font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center font-custom  "
        type="button"
      >
        Contact information
        <svg
          className=" w-2.5 h-2.5 ms-3 "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {contactOpen && (
         <div
         id="dropdownMenu"
         className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-full h-auto  mb-3 dark:bg-gray-700 mt-2 " >  
         <form  onSubmit={contactSubmit}>   
           <div className=" flex flex-col md:flex-row md:space-x-4 mb-4">
           <div className="flex-1 mb-4 md:mb-0">
             <label htmlFor="name" className="block text-md font-medium text-sm">
               Email
             </label>
             <input
               type="text"
               id="email"
               name="email"
               value={contactData.email as string}
               onChange={handleContactChange}
               placeholder="Enter your name"
          
               className='mt-1 p-3 text-sm border border-gray-300 rounded w-full leading-tight'
             />
           
           </div>
           <div className="pr-5 flex-1 mb-1 md:mb-4  ">
             <label htmlFor="last-name" className="block text-md font-medium text-sm ">
               Phone No
             </label>
             <input
               type="text"
               id="phoneNumber"
               name="phoneNumber"
               value={contactData.phoneNumber as string}
               onChange={handleContactChange}
               placeholder="Enter your last name"
               className=" mt-1 p-3 text-sm border border-gray-300 rounded w-full leading-tight"
            
             />
           
           </div>
           <div className="pr-5 flex-1 mb-1 md:mb-4  ">
           <button
           type="submit"
           className="mt-6 p-2 w-full pl-5 pr-5 text-md font-semibold font-custom text-[#00266b] border-[#00266b] bg-white border-2 hover:bg-[#00266b] hover:text-white "
         >
         Save
         </button>
         </div>

         </div>
         
         </form>  
       </div>
      )}
      
    </div>
      </div>
      <div >
      <div className="relative inline-block text-left mb-5">
      <button
        id="dropdownButton"
        onClick={() => setPassport(!Passport)}
        className="text-black bg-[#f7f8f8] justify-between items-center w-[800px] border font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center font-custom  "
        type="button"
      >
        Passport information
        <svg
          className=" w-2.5 h-2.5 ms-3 "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {Passport && (
     
         <div
         id="dropdownMenu"
         className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-full h-auto  mb-3 dark:bg-gray-700 mt-2 " > 
             <form onSubmit={passPortSubmit} >  
          <div className=" flex flex-col md:flex-row md:space-x-4 mb-4">
         <div className="pl-5 flex-1 mb-1 md:mb-4 ">
           <label htmlFor="title" className="block text-sm font-medium  ">
             PassportNumber
           </label>
           <input
             type="text"
             id="PassportNumber"
             name="passportNumber"
             placeholder="Enter your PassportNumber"
             className='mt-1 p-3 text-sm border border-gray-300 rounded w-full leading-tight'
             onChange={handleNationalityChange}
             value={passportData.passportNumber as string}
           />
         
         </div>
         <div className="flex-1 mb-4 md:mb-0 pr-3 ">
           <label htmlFor="name" className="block text-md font-medium text-sm">
           nationality
           </label>
           <select
                id="title"
                className= 'mt-0 p-3  mt-1 text-sm border border-gray-300 rounded w-full leading-tight'
                onChange={handleNationalityChange}
                value={passportData.nationality as string }
                name="nationality"
               
                >
                
                <option value="">Select Country</option>
                {option.map((item:any)=>(
                 <option  key={item.value} value={item.value}>
                 {item.label}
               </option>
                ))}
               
              </select>
         
         </div>
        
       </div>
       <div className=" flex flex-col md:flex-row md:space-x-4 mb-4">
       <div className="pr-5 flex-1 mb-1 md:mb-4 ml-4 ">
           <label htmlFor="last-name" className="block text-md font-medium text-sm ">
           Date Of Issue
           </label>
           <input
             type="Date"
             id="dateOfIssue"
             name="dateOfIssue"
             onChange={handleNationalityChange}
             value={passportData.dateOfIssue as string}
             placeholder="Enter your last name"
             className=" mt-1 p-3 text-sm border border-gray-300 rounded w-full leading-tight"
          
           />
         
         </div>
         <div className="pr-5 flex-1 mb-1 md:mb-4  ">
           <label htmlFor="last-name" className="block text-md font-medium text-sm ">
           Date Of Expiry
           </label>
           <input
             type="Date"
             id="dateOfIssue"
             name="dateOfExpiry"
             onChange={handleNationalityChange}
             value={passportData.dateOfExpiry as string}
             placeholder="Enter your last name"
             className=" mt-1 p-3 text-sm border border-gray-300 rounded w-full leading-tight"
          
           />
         
         </div>
         <div className="pr-5 flex-1 mb-1 md:mb-4  ">
         <button
         type="submit"
         className="mt-6 p-2 w-full pl-5 pr-5 text-md font-semibold font-custom text-[#00266b] border-[#00266b] bg-white border-2 hover:bg-[#00266b] hover:text-white "
       >
       Save
       </button>
       </div>
   
        
        </div>    
         
         
       </form>
       </div>
      )}
      
    </div>
      </div>
 
     </div>
    )}
    {active =="Booking"&&(
     <div className="container w-[980px]   h-auto p-6 sm:p-7 mx-4 my-0 mt-6  bg-white z-10 rounded-lg shadow-md">
      <h1>Booking</h1>
     </div>
    )}
    
    </section>
    </div>
  );
};

export default ProfileUpdate;
