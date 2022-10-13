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
              Learning a new language? Get Organized for Success
            </h1>
          </div>
          {/* <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
        Devmemos • OCTOBER 08, 2021
        </h3> */}
          <div className="leading-normal mt-5 mb-2">
            <i className="fas fa-map-marker-alt mr-2 text-gray-200"></i>
            OCTOBER 08, 2021
          </div>
        </div>
        <div className="m-10  py-10  border-t border-blueGray-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 text-lg leading-relaxed text-blueGray-700 text-left">
              <p className="mb-4 ">
                Today’s college first-years face many of the same challenges
                students have for generations: getting organized and staying
                focused, balancing studies and social life, managing personal
                finances for the first time, feeling lonely or homesick…
                Navigating this transition can be difficult, rewarding, scary,
                and sometimes even funny for parents. Yes, your role as a parent
                will change, but they still need you and your support. And it’s
                crucial to set your high school grad up for success.
              </p>
              <p className="mb-4 ">
                Today’s college first-years face many of the same challenges
                students have for generations: getting organized and staying
                focused, balancing studies and social life, managing personal
                finances for the first time. Yes, your role as a parent will
                change, but they still need you and your support. And it’s
                crucial to set your high school grad up for success.
              </p>

              <ul className="mb-4 list-inside list-disc">
                <li>High durability</li>
                <li>Value-based price</li>
                <li>Perfect performance on copy machines</li>
                <li>Long lasting whiteness</li>
              </ul>
              <p className="mb-4 ">
                Your college kid has a lot of responsibilities to juggle and it
                can be a daunting task to keep it all together. When students
                use tools and technology to stay organized, it’s easier to
                minimize stress and focus on tasks without falling behind. The
                right solution can help your college kid chart new paths while
                managing the inevitable challenges of transitioning into
                adulthood. Evernote is a one-stop-shop productivity tool that
                college students can use to develop their time management and
                planning skills, empowering them to keep track of everything
                with notes, tasks, and schedules all in one platform.
              </p>

              {/* <a href="#pablo" className="font-normal text-pink-500">
              Show more
            </a> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Blog;
