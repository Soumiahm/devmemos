import { useGetNotesInNotebookQuery } from "../redux/features/api/apiSlice";
import NotesList from "./notesList";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setModalState, setNotesList, setSelectedNotebook } from "../redux/features/noteSlice";
import { useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import SearchBar from "./searchBar";
import { ModalActions } from "../redux/types";
import EditNotebookModal from "./editNotebookModal";
import DeleteNotebookModal from './deleteNotebookModal';

const NotebookNotesList: React.FC = () => {
  const selectedNotebook = useAppSelector(
    (state) => state.note.selectedNotebook
  );

  const modalState = useAppSelector((state) => state.note.modalState);

  const {
    data: notesData,
    isLoading,
    error,
  } = useGetNotesInNotebookQuery(selectedNotebook._id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notesData) dispatch(setNotesList(notesData.data.data));
  }, [notesData]);

  return (
    <div className="flex flex-col h-screen border-r-2 border-gray-100 ">
      
      <div className=" sticky top-0 bg-white pt-6 flex flex-col px-4 h-32 ">
        <div>
          <SearchBar />
        </div>

        <div className="grid grid-cols-12 pt-2 pb-2">
          <div className="col-span-10 text-2xl text-gray-600 font-semibold tracking-wide">
            {selectedNotebook && selectedNotebook.title}
          </div>
          <div className="col-span-1 text-xl text-gray-300 hover:text-blue-600"
          
          onClick={() =>
            
            dispatch(
              setModalState({
                action: ModalActions.UpdateNotebook,
                show: true,
              })
            )
          
        }
      
          >
            <MdEdit />
          </div>
          <div className=" col-span-1 text-xl text-gray-300 hover:text-blue-600"
           onClick={() =>
            dispatch(
              setModalState({
                action: ModalActions.DelteteNotebook,
                show: true,
              })
            )
          
        }
          >
            <MdDelete />
          </div>
        </div>
      </div>
      
        {error && <h1 className="text-red">There was an error</h1>}
        {isLoading && <h1 className="text-gray-400">Loading ....</h1>}
        {notesData && <NotesList />}

        {modalState.show && modalState.action === ModalActions.UpdateNotebook && (
        <EditNotebookModal/>
      )}

{modalState.show && modalState.action === ModalActions.DelteteNotebook && (
        <DeleteNotebookModal/>
      )}
      
      
    </div>
  );
};

export default NotebookNotesList;
