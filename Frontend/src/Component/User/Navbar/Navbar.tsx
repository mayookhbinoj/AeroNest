import React, { useState } from 'react'
import icon from "../../../assets/Images/user.png"
import Logo from "../../../assets/Images/AeroNest (4).png"
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../../actions/apiAction'
import { reset } from '../../../reducers/Slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from "../../../Store/Configure"

const Navbar:React.FC= () => {
    const navigate=useNavigate()
    const dispatch = useAppDispatch();
    const {name,lastName} = useSelector((state: any) => state.user.user.newUser);

    const [drop,setDrop]=useState(false)
    const handleClick=()=>{
      setDrop(true)
    }
    const handleSignout=async(e:React.FormEvent)=>{
      try {
        e.preventDefault()
        console.log("logout")
        dispatch(logOut())
        dispatch(reset())
        navigate("/user/login")
      } catch (error) {
        console.log("error",error)
      } 
    }
    const handleMyAccount=(e:React.FormEvent)=>{
      navigate("/user/Profile")
    }

  return (
   <div className=' w-full h-20 bg-[#00266b] text-sm '>
    <div className="container flex">
        <div className="ml-11">
          <a href="/user/Home">
            <img 
            src={Logo} 
            className="object-contain h-24 gap-8 ml-16"
             alt="" />
             </a>
        </div>
        <div className="flex text-white text-md t gap-10 ml-auto mr-24">
            <a href=""
             className='font-custom font-medium mt-10'
             >PLAN TRAVEL
             </a>
            <a href=""
             className='font-custom font-medium mt-10'
             >EXPEREINCE
             </a>
            <a href=""
             className='font-custom font-medium mt-10 '
             >SUPPORT
             </a>
            <div className="flex items-center gap-2 text-md" onClick={handleClick}>
                <img 
                src={icon}
                 className='object-contain h-5 cursor-pointer' 
                 alt="" />
                <a
                 href="" 
                 className='font-custom font-medium mt-1  text-md '>
                   {name} {lastName}
                    </a>
            </div>
            {drop && (
            <div className="absolute right-0 mt-16 mr-10 w-56 bg-gradient-to-br items-center from-white via-gray-50 to-gray-100 rounded-lg shadow-xl py-3 z-50 border border-gray-200 ">
            <div className="px-5 py-4">
              <p className="text-sm text-gray-500 font-medium">Membership ID: </p>
              <p className="font-bold text-gray-800 text-lg"></p>
            </div>
            <a
         
              className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:bg-blue-700 transition-all duration-200"
              onClick={handleMyAccount}
              >
              My Account
            </a>
            <a
              href=""
              className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              onClick={handleSignout}
              >
              
              Sign Out
            </a>
          </div>
          
            )}
        </div>
    </div>
</div>

  )
}

export default Navbar