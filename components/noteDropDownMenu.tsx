import { FaStar, FaRegClone } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsArrowsMove } from "react-icons/bs";
import parse from "html-react-parser";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setModalState, setSelectedNote } from "../redux/features/noteSlice";

// import Modal from "react-modal";
import { Modal, Menu, Button, Dropdown } from "antd";

import React, {
  ReactComponentElement,
  useState,
  useEffect,
  useCallback,
} from "react";

import { ModalActions, Note } from ".././redux/types";
import {
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useCloneNoteMutation,
} from ".././redux/features/api/apiSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoveNoteModal from "./moveNoteModal";

interface Props {
  note: Note;
}

const NoteDropDownMenu: React.FC<Props> = ({ note }) => {
  const dispatch = useAppDispatch();

  const { _id, title, favorite, createdAt, description } = note;
  const [updateNote, updateNoteResult] = useUpdateNoteMutation();
  const [cloneNote, cloneNoteResult] = useCloneNoteMutation();
  const [deleteNote, deleteNoteResult] = useDeleteNoteMutation();

  const modalState = useAppSelector((state)=> state.note.modalState);


  // const updateFavorite = useCallback(() => {
  //   console.log({ note });
  //   updateNote({ ...note, favorite: !favorite });
  //   console.log({ updateNoteResult });
  // }, [note, favorite]);

  // useEffect(() => {
  //   console.log("PASSED NOTE TO DROPDOWNMENU:", {note});

  // }, [note])

  const renderDropdownItem = (
    action: () => void,
    iconComponent: JSX.Element,
    itemText: String
  ) => {
    return (
      <div
        className="flex justify-start items-center p-1.5 text-lg font-medium text-gray-600 hover:text-slate-700 cursor-pointer"
        onClick={action}
      >
        {iconComponent}
        <span className="ml-2">{itemText}</span>
      </div>
    );
  };

  /********** Modal ****** */

  // const [visible, setVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = React.useState(false);
  // const [modalText, setModalText] = useState("Select notebook:");
  //   const [] does the updated note have something

  const showMoveNoteModal = () => {
    // setVisible(true);
    dispatch(setModalState({ action: ModalActions.MoveNote, show: true }));
  };

  // const handleOk = () => {
  //   setModalText("The modal will be closed after two seconds");
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setVisible(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  // const handleCancel = () => {
  //   console.log("Clicked cancel button");
  //   setVisible(false);
  // };

  /*********************** */

  const menu = (
    <Menu
      style={{ borderRadius: "12px", padding: "7px" }}
      // className="text-xl rounded-lg drop-shadow-sm"
    >
      <Menu.Item key="0">
        {renderDropdownItem(
          // updateFavorite,
          () => {
            updateNote({ ...note, favorite: !favorite })
              .unwrap()
              .then((fulfilled) => {
                console.log(
                  " FULFILLED NOTE FAV: ",
                  fulfilled.data.data.favorite
                );
                dispatch(setSelectedNote(fulfilled.data.data));
                //Do we have to update the notes list ?
              })
              .catch((rejected) => console.log(rejected));
          },
          favorite ? <AiFillStar /> : <AiOutlineStar />,
          "favorite"
        )}
      </Menu.Item>
      <Menu.Item key="1">
        {renderDropdownItem(
          () => {
            cloneNote(note)
              .unwrap()
              .then((fulfilled) => {
                dispatch(setSelectedNote(fulfilled.data.data));
              })
              .catch((rejected) => console.log(rejected));
          },
          <FaRegClone />,
          "clone"
        )}
      </Menu.Item>

      <Menu.Item key="2">
        {renderDropdownItem(showMoveNoteModal, <BsArrowsMove />, "move")}
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item key="3">
        {renderDropdownItem(
          () => {
            deleteNote(_id);
            toast("note deleted!");
            dispatch(setSelectedNote(null));
            //after this the new selected note should be the next note in the notes list
            //if the notes list is empty, then show a blank page .
          },
          <MdDelete />,
          "delete"
        )}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <HiDotsHorizontal className="h-10 w-10 text-gray-700 p-2 rounded-full hover:bg-gray-100" />
        </a>
      </Dropdown>

      { (modalState.action === ModalActions.MoveNote) && <MoveNoteModal note={note} />}
      {/* specify height of modal + scroll + custom footer */}
      {/* <Modal
        title="Move note to ..."
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        // style={{ height: "calc(100vh - 200px)" }}
        bodyStyle={{ height: "350px", overflowY: "scroll" }}
      >
        <p>{modalText}</p>
        <MoveNoteForm note={note} />
      </Modal> */}
    </>
  );
};

export default NoteDropDownMenu;
