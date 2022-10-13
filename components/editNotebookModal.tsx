import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { SketchPicker, TwitterPicker, CirclePicker } from "react-color";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetModalState, setSelectedNotebook } from "../redux/features/noteSlice";
import {
  useCreateNotebookMutation,
  useUpdateNotebookMutation,
} from "../redux/features/api/apiSlice";
import { Modal } from "antd";
import ColorPickerBtn from "./colorPickerBtn";

// Add feedback when creating a new notebook => small pop up, upon success
// style the modal, add a little color circle to specify the chosen color1
// Finish styling the modal

interface IFormInput {
  title: string;
  color: any;
  // gender: GenderEnum;
}

const EditNotebookModal = () => {
  const dispatch = useAppDispatch();

  const selectedNotebook = useAppSelector(
    (state) => state.note.selectedNotebook
  );

  const [color, setColor] = useState(selectedNotebook? selectedNotebook.color : '#4287f5');
  const [updateNotebook, updateNotebookResult] = useUpdateNotebookMutation();

  const modalState = useAppSelector((state) => state.note.modalState);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      title: selectedNotebook ? selectedNotebook.title : "",
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { title } = data;
    setConfirmLoading(true); 
    if (selectedNotebook)
      updateNotebook({ _id: selectedNotebook._id, title, color }).unwrap()
      .then((fulfilled) => {
        console.log(
          " FULFILLED edited notebook: ",
          fulfilled.data.data
        );
      // then dispatch setSelectedNotebook to the updated notebook
        dispatch(setSelectedNotebook(fulfilled.data.data));
      })
      .catch((rejected) => console.log(rejected));
    dispatch(resetModalState());
  };

  const handleCancel = () => {
    dispatch(resetModalState());
  };

  return (
    <Modal
      title="Edit notebook"
      visible={modalState.show}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { padding: "5px", color: "#374151" } }}
      okButtonProps={{
        form: "add-notebook-form",
        htmlType: "submit",
        style: { padding: "5px", backgroundColor: "#22c55e", color: "white" },
      }}
      bodyStyle={{ height: "250px" }}
    >
      <div>
        <form id="add-notebook-form" onSubmit={handleSubmit(onSubmit)}>
          <label>Notebook Title</label>
          <input
            {...register("title")}
            className="border-2 rounded h-8 p-3 mb-4 mt-2 w-full focus:outline-none"
            placeholder="Notebook title"
            maxLength={35}
          />

          <label>Notebook color</label>

          <div>
            <ColorPickerBtn
              onChangeColor={(hexColor: string) => setColor(hexColor)}
              notebookColor = {selectedNotebook? selectedNotebook.color : undefined}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditNotebookModal;
