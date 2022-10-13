import React, { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  resetModalState,
  setSelectedNote,
  setModalState,
} from "../redux/features/noteSlice";
import { useCreateNotebookMutation } from "../redux/features/api/apiSlice";
import { Modal, Menu, Button, Dropdown } from "antd";
import { FaBook } from "react-icons/fa";

import {
  useUpdateNoteMutation,
  useGetnotebooksQuery,
} from "../redux/features/api/apiSlice";
import { AiOutlineCheck } from "react-icons/ai";
import {BsFillCheckCircleFill} from "react-icons/bs";
import { Note, ModalActions } from "../redux/types";
// Add feedback when creating a new notebook => small pop up, upon success
// style the modal, add a little color circle to specify the chosen color1
// Finish styling the modal

interface Props {
  note: Note;
}
const MoveNoteModal: React.FC<Props> = ({ note }) => {
  const dispatch = useAppDispatch();

  // const note = useAppSelector((state) => state.note.selectedNote);

  const { data: notebooks, error, isLoading } = useGetnotebooksQuery();

  const [updateNote, updateNoteResult] = useUpdateNoteMutation();
  const [notebookValue, setNotebookValue] = useState<string | undefined>();
  const [searchValue, setSearchValue] = useState("");
  const [isSending, setIsSending] = useState(true);

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = useState("Select notebook:");

  // const listType = useAppSelector((state) => state.note.listType);
  const modalState = useAppSelector((state) => state.note.modalState);

  useEffect(() => {
    setNotebookValue(note.notebook);
    console.log("Hello there, the note we got is: ", note);
  }, [note]);

  useEffect(() => {
    // if (note) setNotebookValue(note.notebook);
    if (note.notebook !== notebookValue) {
      setIsSending(false);
    } else {
      setIsSending(true);
    }
  }, [notebookValue, isSending]);

  // ***********************
  const showModal = () => {
    // setVisible(true);
    // dispatch(setModalState({ModalActions.MoveNote, true}));
    dispatch(setModalState({ action: ModalActions.MoveNote, show: true }));
  };

  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);
    //here perform the action.........
  };

  const handleCancel = () => {
    // setVisible(false);
    // dispatch(setModalState({action: ModalActions.MoveNote, show:false}));
    dispatch(resetModalState());
    //or reset modal
  };
  // ***********************

  const moveNoteTo = useCallback(() => {
    if (notebookValue && notebookValue.length > 0) {
      //here update the note to the new notebook
      if (updateNoteResult.isLoading) return;

      setIsSending(true);
      updateNote({ ...note, notebook: notebookValue })
        .unwrap()
        .then((fulfilled) => {
          console.log(
            "Hello there, the note we changed its notebook is: ",
            note
          );
          dispatch(setSelectedNote(fulfilled.data.data)); //???
          setIsSending(false);
          setConfirmLoading(false);

          setSearchValue("");
          setNotebookValue(undefined);
        })
        .catch((rejected) => {
          console.log(rejected);
          setIsSending(false);
          setConfirmLoading(true);
          setSearchValue("");
          setNotebookValue(undefined);
        });
    }
    dispatch(resetModalState());
  }, [isSending, notebookValue]);

  return (
    <Modal
      title="Move note to ..."
      visible={modalState.show}
      onOk={moveNoteTo}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { padding: "5px", color: "#374151" } }}
      okButtonProps={{
        style: { padding: "5px", backgroundColor: "#22c55e", color: "white" },
      }}
      /* bg-green-500 hover:bg-green-600 py-2 text-white focus:outline-none disabled:opacity-50 */
      /* bg-white border-2 hover:bg-gray-100 py-2 text-gray-700 focus:outline-none */

      bodyStyle={{ height: "370px" }}
    >
      <p className=" my-0">{modalText}</p>

      <div>
        {/* <div className="mr-8 ml-4"> */}
          <div className="relative">
            <input
              className="border-2 rounded h-8 p-1 mb-4 mt-2 w-full focus:outline-none"
              placeholder="Search notebooks"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <ul className=" h-64 overflow-y-auto">
              {notebooks &&
                notebooks.data.data
                  .filter((notebook) => {
                    if (searchValue === "") {
                      return true;
                    }
                    return notebook.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  })
                  .map((notebook) => 
                    // (notebook.id === note.notebook) && setConfirmLoading(true);
                    (
                    <li key={notebook._id} >
                      <div
                        className="hover:bg-grey-light cursor-pointer grid gap-2 grid-cols-18 py-0.5 items-center"
                        onClick={() => {
                          setNotebookValue(notebook._id);
                        }}
                      >
                        <div className="text-green-500 col-span-1">
                          {notebook._id === notebookValue ? (
                            // <span className="rounded-full bg-green-500 font-bold text-white"><AiOutlineCheck /></span>
                            <BsFillCheckCircleFill />
                          ) : null}
                        </div>
                        <div className="col-span-1 text-gray-500">
                          <FaBook />
                        </div>
                        <div className="col-span-11 text-gray-700">{notebook.title}</div>
                        <div className="col-span-3">
                          {notebook._id === note.notebook ? (
                            <span className="text-gray-400 font-semibold">Current</span>
                          ) : null}{" "}
                        </div>
                      </div>

                    </li>
                  ))}
            </ul>
          </div>
        {/* </div> */}

        {/* <div className="px-4 py-3 w-full flex justify-center items-center gap-3 text-md border-t border-gray-200 ">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 w-48 py-2 rounded text-white focus:outline-none 
          disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSending}
          onClick={moveNoteTo}
        >
          Move
        </button>
        <button
          onClick={() => dispatch(resetModalState())}
          className="bg-white border-2 hover:bg-gray-100 w-48 py-2 rounded text-gray-700 focus:outline-none"
        >
          Cancel
        </button>
      </div> */}
      </div>
    </Modal>
  );
};

export default MoveNoteModal;

{
  /* <Modal
title="Move note to ..."
visible={modalState.}
onOk={handleOk}
confirmLoading={confirmLoading}
onCancel={handleCancel}
// style={{ height: "calc(100vh - 200px)" }}
bodyStyle={{ height: "350px", overflowY: "scroll" }}
>
<p>{modalText}</p> */
}
{
  /* <MoveNoteForm note={note} /> */
}
// </Modal>
