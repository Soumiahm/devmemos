import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Blog: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="content-center   ">
        <div className="text-center  mt-12 sm:px-2 sm:mx-6 md:mx-12 lg:mx-52">
          <div className=" text-center ">
            <h1 className="my-15  leading-normal text-blue-dark text-4xl font-bold">
              Terms of Service
            </h1>
          </div>
          {/* <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
        Devmemos • OCTOBER 08, 2021
        </h3> */}
          {/* <div className="leading-normal mt-5 mb-2">
            <i className="fas fa-map-marker-alt mr-2 text-gray-200"></i>
            OCTOBER 08, 2021
          </div> */}
        </div>
        <div className="m-10  py-10  border-t border-blueGray-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 text-xl leading-relaxed text-blueGray-700 text-left">
              <p className="mb-4 ">
                By using the Simplenote app or web app (“Service”), you are
                agreeing to be bound by the following terms and conditions
                (“Terms of Use”) set forth by Automattic, Inc (“We”).
              </p>
              <div className=" text-center ">
                <h1 className="my-14  leading-normal text-blue-dark text-4xl font-bold">
                  Basic Terms
                </h1>
              </div>

              <ul className="mb-4 list-inside list-disc text-xl">
                <li>
                  You are responsible for keeping your login and password safe
                </li>
                <li>
                  The Service should not be used to store sensitive information
                  such as bank account numbers, credit card information, or
                  passwords.
                </li>
                <li>
                  We are not responsible for any information stored with the
                  Service.
                </li>
              </ul>

              <div className=" text-center ">
                <h1 className="my-14  leading-normal text-blue-dark text-4xl font-bold">
                  General terms
                </h1>
              </div>

              <ul className="mb-4 list-inside list-disc text-xl">
                <li>
                  We reserve the right to modify or terminate the Service for
                  any reason, without notice at any time.
                </li>
                <li>
                  We reserve the right to alter these Terms of Use at any time.
                  If there are any changes to these Terms of Use, users will be
                  notified.
                </li>
                <li>
                  We reserve the right to refuse service to anyone for any
                  reason at any time.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Blog;
