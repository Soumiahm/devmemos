//Could not sign in with the provided email address and password.

//Okay! A link to reset your password will be sent if that account exists.

import React from "react";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";

import { useLoginMutation } from "../redux/features/api/apiSlice";

//in this file, work on error handling
//add forfot password link
//reuse the same file for create new account

interface IFormInput {
  email: string;
}

const Forgot: React.FC = () => {
  const [login, loginResult] = useLoginMutation();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    await login(data);
    console.log("loginResult: ", loginResult);
  };

  return (
    <div className="bg-white">
      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center">
        {/* style={{backgroundImage: "url(https://images.unsplash.com/photo-1525302220185-c387a117886e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)"}}> */}
        {/* <div className="absolute  inset-0 z-0"></div> */}
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Forgot your Password?
            </h2>
            {/* <p className="mt-2 text-sm text-gray-600">
              Please enter your email
            </p> */}
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* <input type="hidden" name="remember" value="true" /> */}
            <div className="relative">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Email
              </label>
              <input
                className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="email"
                {...register("email", { required: true, maxLength: 20 })}
                placeholder="Email address"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Send reset email
              </button>
            </div>
            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              <span>Remembered your password?</span>
              <Link href="/login">
                <a className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">
                  Login
                </a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
