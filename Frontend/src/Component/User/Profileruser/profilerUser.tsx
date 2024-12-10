import React from 'react'
import { useSelector } from 'react-redux';

const profilerUser:React.FC = () => {
  const {name,lastName,title,email} = useSelector((state: any) => state.user.user.newUser);
  return (
    <div className='mx-32 mt-6'>
      <div className=' bg-[#ffffff] h-20  '>
        <div className='flex justify-between ml-10'>
          <h1 className='text-black font-semibold text-sm mt-8 font-custom'>{title} {name} {lastName} | {email}</h1>
        </div>
      </div>
     </div>
  )
}

export default profilerUser