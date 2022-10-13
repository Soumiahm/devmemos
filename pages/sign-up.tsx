import React from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import { useSignupMutation } from "../redux/features/api/apiSlice"; // "../redux/features/api/apiSlice";

//in this file, work on error handling
//add terms link 

interface IFormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Signup: React.FC = () => {
  const [signup, signupResult] = useSignupMutation();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    await signup(data);
    console.log("signupResult: ", signupResult);
  };

  return (
    <div className="bg-white">
      <div className="relative min-h-screen flex items-center justify-center pb-10 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
            {/* <p className="mt-2 text-sm text-gray-600">
              Create your Devmemos Account
            </p> */}
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* <input type="hidden" name="remember" value="true" /> */}
            <div className="relative">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Name
              </label>
              <input
                className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                {...register("name", { required: true, maxLength: 20 })}
                placeholder="Name"
              />
            </div>

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
            <div className="mt-8 content-center">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Password
              </label>
              <input
                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                {...register("password", { required: true, maxLength: 20 })}
                placeholder="Password"
              />
            </div>

            <div className="mt-8 content-center">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Confirm Password
              </label>
              <input
                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                {...register("passwordConfirm", {
                  required: true,
                  maxLength: 20,
                })}
                placeholder="Password Confirm"
              />
            </div>

            <div className="text-sm">
              <p className="font-small text-indigo-400">
                8+ characters. Ideally mixing upper cases, lower cases, and
                numbers
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Sign up
              </button>
            </div>
            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              <span>Already have an account?</span>
              <Link href="/login">
                <a className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">
                  Log in
                </a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
