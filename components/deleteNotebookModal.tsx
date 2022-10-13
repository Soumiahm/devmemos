import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { SketchPicker, TwitterPicker, CirclePicker } from "react-color";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  resetModalState,
  setListType,
  setSelectedNotebook,
} from "../redux/features/noteSlice";
import {
  useUpdateNotebookMutation,
  useDeleteNotebookMutation,
} from "../redux/features/api/apiSlice";
import { Modal } from "antd";
import ColorPickerBtn from "./colorPickerBtn";
import { ListTypes } from "../redux/types";

// Add feedback when creating a new notebook => small pop up, upon success
// style the modal, add a little color circle to specify the chosen color1
// Finish styling the modal

interface IFormInput {
  title: string;
  color: any;
  // gender: GenderEnum;
}

const DeleteNotebookModal = () => {
  const dispatch = useAppDispatch();

  const selectedNotebook = useAppSelector(
    (state) => state.note.selectedNotebook
  );

  const [color, setColor] = useState(
    selectedNotebook ? selectedNotebook.color : "#4287f5"
  );
  const [updateNotebook, updateNotebookResult] = useUpdateNotebookMutation();
  const [deleteNotebook, deleteNotebookResult] = useDeleteNotebookMutation();

  const modalState = useAppSelector((state) => state.note.modalState);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  // const { register, handleSubmit } = useForm<IFormInput>({
  //   defaultValues: {
  //     title: selectedNotebook ? selectedNotebook.title : "",
  //   },
  // });
  // const onSubmit: SubmitHandler<IFormInput> = (data) => {
  //   const { title } = data;
  //   setConfirmLoading(true);
  //   if (selectedNotebook)
  //     updateNotebook({ _id: selectedNotebook._id, title, color });
  //   dispatch(resetModalState());
  // };

  const handleCancel = () => {
    dispatch(resetModalState());
  };

  const handleDelete = () => {
    setConfirmLoading(true);
    if (selectedNotebook) {
      deleteNotebook(selectedNotebook._id)
        .unwrap()
        .then((fultfilled) => dispatch(setListType(ListTypes.AllNotes))) //set the list to all notes
        .catch((rejected) => console.log(rejected));
    }
    dispatch(resetModalState());

    //Add a confirmation success, handle errors with a massage
  };

  return (
    <Modal
      title="Delete notebook"
      visible={modalState.show}
      onOk={handleDelete}
      confirmLoading={confirmLoading}
      okText="Delete"
      onCancel={handleCancel}
      cancelButtonProps={{ style: { padding: "5px", color: "#374151" } }}
      okButtonProps={{
        form: "add-notebook-form",
        htmlType: "submit",
        style: { padding: "5px", backgroundColor: "#22c55e", color: "white" },
      }}
      bodyStyle={{ height: "100px" }}
    >
      <div>
        Any notes in the notebook will be moved to Trash. This cannot be undone.
      </div>
    </Modal>
  );
};

export default DeleteNotebookModal;
