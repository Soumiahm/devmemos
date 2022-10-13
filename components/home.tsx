import React from "react";
import Link from "next/link";
import Navbar from "./navbar";

const HomePage = () => {
  return (
    <div>
        <div className="bg-gradient-to-b from-blue-dark to-blue-base">
          <Navbar />
          <div className="container max-w-5xl mx-auto px-4 py-4">
             
            <div className="w-4/5">
              <h1 className="mt-20 text-white text-6xl font-bold">
                The ultimate notepad
                <br />
                <span className="text-blue-400">for developers.</span>
              </h1>
              
            </div>
            
            <div className="w-5/6 my-10 ml-6">
            
              <h3 className="text-gray-300">
                Designed for developers to store notes <br />
                <strong className="text-white">
                  especially code snippets.
                </strong>
                <br />
                Built to boast a beautiful and intuitive UI.
              </h3>
              <Link href="/sign-up">
                <a className="mt-3 mb-6 md:mb-0 md:mt-10 inline-block py-3 px-16 pb-6 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow cursor-pointer transition ease-in duration-300">
                  Get Started
                </a>
              </Link>  
              
            </div>
            
            {/* <div className="hidden sm:block opacity-50 z-0">
              <div className="shadow-2xl w-96 h-96 rounded-full -mt-72"></div>
              <div className="shadow-2xl w-96 h-96 rounded-full -mt-96"></div>
              <div className="shadow-xl w-80 h-80 rounded-full ml-8 -mt-96"></div>
            </div> */}
          </div>
         
        </div>
      
    </div>
  );
};

export default HomePage;
