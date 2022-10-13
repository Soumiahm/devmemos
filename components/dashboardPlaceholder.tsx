import React from "react";
import { FaStar } from "react-icons/fa";
import { useGetAllNotesQuery } from "../redux/features/api/apiSlice";
// import { useAppSelector } from "../redux/hooks";
import dateFormat, { masks } from "dateformat";
import { AiFillFileAdd } from "react-icons/ai";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedNote } from "../redux/features/noteSlice";

const DashboardPlaceholder = () => {
  const dispatch = useAppDispatch();

  // const notes = useAppSelector(state.)
  //   const notes = useAppSelector((state) => state.note.notesList);

  const { data: notesData, isLoading, error } = useGetAllNotesQuery({page: 1, limit: 10});

  const recentNotes =
    //   isLoading && <div>Loading ...</div>

    notesData && (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {notesData.data.data.slice(0, 3).map((note) => {
          return (
            <div
              onClick={() => {
                dispatch(setSelectedNote(note));
              }}
              key={note._id}
              className="grid grid-rows-6 p-4 bg-white rounded-lg shadow-md h-72 cursor-pointer break-all"
            >
              <div className="row-span-5">
                <p className="font-semibold text-gray-700 break-all leading-snug ">
                  {note.title}
                </p>
                <p className=" text-gray-500 break-all leading-snug">
                  {note.description}
                </p>
              </div>
              <div className="row-span-1">
                <p className="text-sm text-gray-500">
                  {dateFormat(note.createdAt, "mmm dS, yyyy")}
                </p>
              </div>
            </div>
          );
        })}

        

        <div className="flex flex-col content-center items-center justify-center p-4 bg-white rounded-lg shadow-md h-72 cursor-pointer">
          <div className="text-9xl text-gray-300">
            <AiFillFileAdd />
          </div>
          <div>
            <p className=" text-base font-medium text-gray-400">
              Create new note
            </p>
          </div>
        </div>



      </div>
    );

  return (
    <div className="container mx-auto h-full px-6 pt-16 bg-gray-50">
      <h2 className="text-2xl mb-6 mt-3 tracking-wide font-semibold text-gray-600">
        Recent Notes
      </h2>

      {recentNotes}
    </div>
  );
};

export default DashboardPlaceholder;
