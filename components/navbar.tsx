import React from 'react'
import Link from "next/link";


const Navbar = () => {
    return (
        <div className="bg-blue-dark px-4 py-4">
        <div className="md:max-w-6xl md:mx-auto md:flex md:items-center md:justify-between">
          <div className="flex justify-between items-center">
            <Link href="/">
              <a className="inline-block py-2 text-white text-xl font-bold">
                Devmemos
              </a>
            </Link>

            <div className="inline-block cursor-pointer md:hidden">
              <div
                className="bg-gray-400 w-8 mb-2"
                style={{ height: "2px" }}
              ></div>
              <div
                className="bg-gray-400 w-8 mb-2"
                style={{ height: "2px" }}
              ></div>
              <div
                className="bg-gray-400 w-8"
                style={{ height: "2px" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="hidden md:block">
              <Link href="/#">
                <a className="inline-block py-1 md:py-4 text-gray-100 mr-6 font-bold">
                  Devmemos
                </a>
              </Link>

              <Link href="/terms">
                <a className="inline-block py-1 md:py-4 text-gray-500 hover:text-gray-100 mr-6">
                  Terms
                </a>
              </Link>

              <Link href="/blog">
                <a className="inline-block py-1 md:py-4 text-gray-500 hover:text-gray-100">
                  Blog
                </a>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Link href="/login">
              <a className="inline-block py-1 md:py-4 text-gray-500 hover:text-gray-100 mr-6">
                Login
              </a>
            </Link>

            <Link href="/sign-up">
              <a className="inline-block py-2 px-4 text-gray-700 bg-white hover:bg-gray-100 rounded-lg">
                Sign Up
              </a>
            </Link>
          </div>
        </div>
      </div>
    )
}

export default Navbar;
