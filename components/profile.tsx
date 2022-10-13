import React from "react";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import Link from 'next/link'

const Profile = () => {
  return (
    // <div className=" w-100 grid grid-row-2 gap-2 text-blue-light m-auto cursor-pointer ">
    //     <div className="rounded-full "><CgProfile className='w-16 h-16 m-auto'/></div>
    //     <div className="m-auto ">Jasmin</div>
    //     {/* <div className=" col-span-4"> <FiSettings className='w-4 h-4'/></div> */}

    // </div>

    <Link href="/settings">
    {/* <a className="mt-3 mb-6 md:mb-0 md:mt-10 inline-block py-3 px-16 pb-6 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow cursor-pointer transition ease-in duration-300">
      Get Started
    </a> */}
     <a className="text-center text-blue-light hover:text-gray-300 transition ease-in duration-100 w-100 cursor-pointer">
      <img
        className="h-20 w-20 mt-4 rounded-full mx-auto"
        src="https://randomuser.me/api/portraits/women/90.jpg"
        alt="Randy Robertson"
      />
      <p className="pt-2 text-sm ">Jasmine Robertson</p>
      
    </a>
  </Link>  

   
  );
};

export default Profile;
