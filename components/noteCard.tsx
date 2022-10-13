import { FaStar, FaRegClone } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsArrowsMove } from "react-icons/bs";
import parse from "html-react-parser";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setModalState, setSelectedNote } from "../redux/features/noteSlice";

import React, { ReactComponentElement, useState } from "react";

import { ModalActions, Note } from ".././redux/types";
// import {
//   useUpdateNoteMutation,
//   useDeleteNoteMutation,
//   useCloneNoteMutation,
// } from ".././redux/features/api/apiSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoveNoteForm from "./moveNoteForm";
// import AppModal from "./Modal";
import NoteDropDownMenu from "./noteDropDownMenu";
import dateFormat, { masks } from "dateformat";

interface Props {
  note: Note;
  selected: Boolean | null;
}
const NoteCard: React.FC<Props> = ({ note, selected }) => {
  const dispatch = useAppDispatch();

  const modalState = useAppSelector((state) => state.note.modalState);

  const { _id, title, favorite, createdAt, description } = note;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className={
        selected
          ? "rounded-lg cursor-pointer bg-gray-100 w-72 h-32 p-2.5 my-1 ml-6 flex flex-col "
          : "rounded-lg  cursor-pointer bg-gray-50 w-72 h-32 p-2.5 my-1 ml-6 flex flex-col " 
      }

    >
      <div className="flex-grow text-sm pt-2">
        <p className="font-semibold text-gray-700 break-all leading-tight mb-1.5 ">{title}</p>
      <p className="text-gray-500 break-all leading-tight">
        {description}
      </p>
      </div>
      <div className="text-xs text-gray-400">
        {dateFormat(note.createdAt, "mmm dS, yyyy")}
      </div>

      <ToastContainer autoClose={1000} hideProgressBar={true} />
    </div>
  );
};

export default NoteCard;
