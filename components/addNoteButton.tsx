import { useCallback, useEffect, useState } from "react";
import {
  useGetnotebooksQuery,
  useCreateNoteMutation,
} from "../redux/features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedNote } from "../redux/features/noteSlice";
import {FiPlus} from 'react-icons/fi'
import {AiOutlineFileAdd} from 'react-icons/ai'
import { Tooltip } from 'antd';

const AddNoteButton = () => {
  const dispatch = useAppDispatch();

  const [createNote, createNoteResult] = useCreateNoteMutation();

  const selectedNotebook = useAppSelector(
    (state) => state.note.selectedNotebook
  );

  const [isSending, setIsSending] = useState(false);
  const addNote = useCallback(async () => {
    //a note will be created only if a notebook is selected
    //By default the first notebook in the list of notebooks will be selected.
    //add disable style to button when isLoading

    if (selectedNotebook) {
      if (createNoteResult.isLoading) return;
      setIsSending(true);
      createNote(selectedNotebook._id) /////////////////////
        .unwrap()
        .then((fulfilled) => {
          dispatch(setSelectedNote(fulfilled.data.data));
          setIsSending(false);
        })
        .catch((rejected) => console.log(rejected));
    }
  }, [isSending, selectedNotebook]);

  return (
    <div>
            <Tooltip placement="right" title="New Note" color="#059669">

      <button
        onClick={addNote}
        disabled={isSending}
        className="rounded-full p-2.5 bg-blue-secondary text-green-400 hover:bg-green-600 hover:text-white hover:rounded mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        
        <AiOutlineFileAdd 
        className=" text-xl"        
        />
      </button>
      </Tooltip>
    </div>
  );
};

export default AddNoteButton;
