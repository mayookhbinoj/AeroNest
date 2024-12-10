import React from 'react';
import "../../../src/index.css"
import Navbar from './Navbar/Navbar';
import Explore from './Explore/explore';
import About from "./About/About"
import Nimage from '../../assets/Images/helena-lopes-e3OUQGT9bWU-unsplash.jpg';

const Home: React.FC = () => {
  return (
    <div >
      <Navbar />
      <div className="relative">
        <img
          className="object-cover h-96 w-full"
          src={Nimage}
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full   flex items-center justify-center">
          <div className="bg-white mt-60  p-10  rounded-lg">
            <p className='text-[#00266b] font-custom mb-4 font-semibold'>Hi, where would you like to go? </p>
            <div className="border-t border-gray-300 my-4"></div>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <input type="text"
          className='mt-1 p-4 text-sm border pl-10 pr-10 border-2 border-gray-300 rounded w-full leading-tight' 
          value={"dehi"}
           />
          <input type="text"
          className='mt-1 p-2 pl-10 pr-10 text-sm border border-gray-300 rounded w-full leading-tight' 
          value={"dehi"}
           />
          <input type="date"
          className='mt-1 p-2 pl-10 pr-10 text-sm border border-gray-300 rounded w-full leading-tight' 
          value={"dehi"}
           />
          <input type="date"
          className='mt-1 p-2 text-sm border border-gray-300 rounded w-full leading-tight' 
          value={"dehi"}
           />
            
           </div>
           <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
           <select
                id="title"
                className= 'mt-0 p-4 text-sm border border-gray-300 rounded w-full leading-tight'
                name="title"
                value=""
              >
                <option value="">Economy</option>
                <option value="mr">Premium Economy</option>
                <option value="mrs">Business</option>
                <option value="ms">First/Suites</option>
              </select>
           <input type="number"
           className='mt-0 p-4 text-sm border border-gray-300 rounded w-full leading-tight' 
            value={"1 Adult"}
           />
           <button
              type="submit"
              className="w-full md:w-auto p-1 pl-10 pr-10 py-2 px-4 text-md font-semibold font-custom bg-[#00266b] text-white rounded text-sm hover:bg-blue-700 transition"
            >
              Search
            </button> 
           </div>
          </div>
        </div>
      </div>

      <Explore/>
     

      
    </div>
  );
};

export default Home;
