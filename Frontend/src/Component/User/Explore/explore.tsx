import React from 'react';
import { motion } from 'framer-motion';
import { slideUp } from '../../utility/animation';
import sydeny from '../../../assets/Images/card/dan-freeman-7Zb7kUyQg1E-unsplash.jpg';

interface City {
  name: string;
  image: string;
  price: number;
  class: string;
}

const cities: City[] = [
  { name: 'Sydney', image: sydeny, price: 59587, class: 'Economy' },
  { name: 'Sydney', image: sydeny, price: 59587, class: 'Economy' },
  { name: 'Sydney', image: sydeny, price: 59587, class: 'Economy' },
  { name: 'Sydney', image: sydeny, price: 59587, class: 'Economy' },
  { name: 'Sydney', image: sydeny, price: 59587, class: 'Economy' },
  { name: 'Sydney', image: sydeny, price: 59587, class: 'Economy' },
  { name: 'Sydney', image: sydeny, price: 59587, class: 'Economy' },
  { name: 'Sydney', image: sydeny, price: 59587, class: 'Economy' },
];

const Explore: React.FC = () => {
  return (
    <div className="relative">
      <h1 className="absolute border-l-4 border-[#00266b] text-2xl top-28 left-52 font-custom font-bold">
        Trending
      </h1>
      <div className="absolute left-24 ml-28 mt-44 grid grid-cols-12 md:grid-cols-12 place-items-center gap-5 cursor-pointer  ">
        {cities.map((city, index) => (
          <motion.div
            key={index}
            variants={slideUp(1)}
            initial="hidden"
            animate="visible"
            className="relative col-span-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100"
          >
            <img
              src={city.image}
              className="w-[260px] h-[260px] object-cover "
              alt={city.name}
            />
            <div className="absolute w-full bottom-0 inset-0">
              <div className="h-full space-y-1 py-6 flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-md font-semibold text-white ml-6">
                  {city.name}
                </h3>
                <p className="text-white ml-6 font-semibold">
                  {city.class} {city.price}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="col-span-12">
          <button
            type="submit"
            className="w-full md:w-auto p-1 pl-10 pr-10 py-2 px-4 text-md font-semibold font-custom text-[#00266b] border-[#00266b] bg-white border-2"
          >
            View more details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
