import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

interface Props {
  text: string;
}

const Item: React.FC<Props> = ({ text }) => (
  <li className="py-2">
    <div className="flex items-center">
      <div className="mr-3 py-1 px-2 text-lg text-green-900">
        <AiOutlineCheck />
      </div>
      <div>
        <h4 className="text-gray-600">{text}</h4>
      </div>
    </div>
  </li>
);

const Section = () => {
  return (
    <div className="bg-gray-200 mb-20">
      <section className="relative pt-12 bg-white">
        <div className="items-center flex flex-wrap">
          <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
            <img
              alt="..."
              className="max-w-full rounded-lg shadow-lg"
              src="https://evernote.com/c/assets/homepage-repackaging/task_hero_image@2x__en.png?b92f90d51cebbc17"
            />
          </div>
          <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
            <div className="md:pr-12">
              <h3 className="text-3xl font-semibold text-gray-800">
                Take Better Dev Notes
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Create stylish and meaningful programming notes, blogs with ease
                with this simple note-taking application for organizing and
                sharing data.
              </p>
              <ul className="list-none mt-6">
                <Item text="Type and search for notes from anywhere in the app" />
                <Item text="Syntax highlighting" />
                <Item text="Rich text editing" />
                <Item text="Live preview" />
                <Item text="Support for code blocks" />
                <Item text="Support for images, files, and links" />
                <Item text="Autosave" />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section;
