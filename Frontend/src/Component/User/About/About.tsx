import React from 'react'
import img from "../../../assets/Images/Image 21.png"

const About:React.FC= () => {
  return (
 <div className="bg-gray-100 mb-5">
 <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row items-center gap-8">

   <div className="about-left flex-shrink-0">
     <img
       src={img}
       alt="About Us"
       className="w-full max-w-sm object-cover rounded-lg"
     />
   </div>
  
   <div className="about-right text-center lg:text-left">
     <div className="about-heading mb-4">
       <h4 className="text-2xl font-bold text-gray-800">About Us</h4>
     </div>
     <p className="text-gray-700 mb-6">
       Are you planning an event and in need of the perfect vendors to make your vision a reality? Look no
       further than WeddingSouq.com, your go-to destination for finding top-notch vendors for every
       occasion.
     </p>
     <button
       type="button"
       className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all"
     >
       Get a Quote From Us
     </button>
   </div>
 </div>
</div>

  )
}

export default About