import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { SketchPicker, TwitterPicker, CirclePicker } from "react-color";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetModalState } from "../redux/features/noteSlice";
import { useCreateNotebookMutation } from "../redux/features/api/apiSlice";
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

const AddNotebookModal = () => {
  const dispatch = useAppDispatch();

  const [color, setColor] = useState("#32194D");
  const [createNotebook, createNotebookResult] = useCreateNotebookMutation();

  const modalState = useAppSelector((state) => state.note.modalState);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { title } = data;
    console.log("----------------handling submit--------------------");
    console.log({ title, color });
    setConfirmLoading(true);
    createNotebook({ title, color });
    dispatch(resetModalState());
  };

  const handleCancel = () => {
    // setVisible(false);
    // dispatch(setModalState({action: ModalActions.MoveNote, show:false}));
    dispatch(resetModalState());
    //or reset modal
  };

  return (
    <Modal
      title="Create new notebook"
      visible={modalState.show}
      // onOk={moveNoteTo}
      okText = "Create"
      onOk={handleSubmit(onSubmit)}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { padding: "5px", color: "#374151" } }}
      // okButtonProps={{
      //   style: { padding: "5px", backgroundColor: "#22c55e", color: "white" },
      // }}
      okButtonProps={{
        form: "add-notebook-form",
        htmlType: "submit",
        style: { padding: "5px", backgroundColor: "#22c55e", color: "white" },
      }}
      /* bg-green-500 hover:bg-green-600 py-2 text-white focus:outline-none disabled:opacity-50 */
      /* bg-white border-2 hover:bg-gray-100 py-2 text-gray-700 focus:outline-none */

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

          <label>Pick color (optional)</label>

          <div>
            <ColorPickerBtn
              onChangeColor={(hexColor: string) => setColor(hexColor)}
            />
          </div>

          {/* <div className="px-4 py-3 w-full flex justify-center items-center gap-3 text-md border-t border-gray-200 ">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 w-48 py-2 rounded text-white focus:outline-none"
          >
            Create
          </button>
          <button
            onClick={() => dispatch(resetModalState())}
            className="bg-white border-2 hover:bg-gray-100 w-48 py-2 rounded text-gray-700 focus:outline-none"
          >
            Cancel
          </button>
        </div> */}
        </form>
      </div>
    </Modal>
  );
};

export default AddNotebookModal;
