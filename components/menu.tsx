import { useState, useEffect } from "react";
import MenuItem from "./menuItem";
import { ListTypes, ModalActions, Notebook } from "../redux/types";
import {
  FaStar,
  FaStickyNote,
  FaPlus,
  FaBook,
  FaBookMedical,
} from "react-icons/fa";
import {
  useGetnotebooksQuery,
  useCreateNoteMutation,
} from "../redux/features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setSelectedNotebook,
  setListType,
  setModalState,
  setSelectedNote,
} from "../redux/features/noteSlice";
// import AppModal from "./Modal";
import AddNotebookModal from "./addNotebookModal";
import { Note } from "../redux/types";
import AddNoteButton from "./addNoteButton";
import Profile from "./profile";
import {FiPlus} from 'react-icons/fi'
import {BiBookAdd} from 'react-icons/bi'
import {Tooltip} from 'antd';

const Menu: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data: notebooks, error, isLoading } = useGetnotebooksQuery();
  const [createNote, createNoteResult] = useCreateNoteMutation();
  const modalState = useAppSelector((state) => state.note.modalState);

  const selectedNotebook = useAppSelector(
    (state) => state.note.selectedNotebook
  );

  // const [openModal, setOpenModal] = useState(false);

  // const modalState = useAppSelector((state) => state.note.modalState);

  // const [noteToBeSelected, setNoteToBeSelected] = useState<Note | undefined>();

  //Set selectedNotebook to the first created notebook

  useEffect(() => {
    // so when we create a new note we automatically set it to the selected notebook
    //once a notebook is selected, we cannot unselect the notebooks.
    //if no notebook is selected, we need to show a message that intices
    //the user to create a notebook. => this also means that they have no notes.
    // SHould I work on the statistiques? or just show the notes,
    //Show a message: select a note to open the editor!
    //
    // if(noteToBeSelected) {dispatch(setSelectedNote(noteToBeSelected));
    //   console.log("ADD NOTE, selected:", noteToBeSelected); }

    //check if the list of notebooks is longer than 1
    // and that there is no selected notebook
    //if so, set the selectedNotebook to the first one in the notebooks list
    if (notebooks && notebooks.data.data.length > 0 && !selectedNotebook) {
      console.log(
        "Selected notebook Upon loading menu!: ",
        notebooks.data.data[0]
      );

      dispatch(setSelectedNotebook(notebooks.data.data[0]));

    }

    //   // return () => {
    //   //   cleanup
    //   // }
  }, [notebooks, selectedNotebook]);

  // const addNote = () => {
  //   createNote("616d89e1fc7ea13b103ca087").then(() => {
  //     if (createNoteResult.isSuccess) {
  //       dispatch(setSelectedNote(createNoteResult.data.data.data));
  //       console.log("ADDED NOTE:", createNoteResult.data.data.data);
  //     }
  //   });

  // createNote("616d89e1fc7ea13b103ca087");
  //    if (createNoteResult.isSuccess) {
  //       dispatch(setSelectedNote(createNoteResult.data.data.data));
  //       console.log("ADDed NOTE:", createNoteResult.data.data.data);
  //     }
  // };

  return (
    <div className="pl-2.5">
      {/* <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 rounded-full w-1/2">
          New note
        </button>
      </div> */}

      <div className="flex justify-between items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            dispatch(setListType(ListTypes.AllNotes));
          }}
        >
          <MenuItem
            itemTitle="All Notes"
            icon={<FaStickyNote />}
            iconColor="green"
          />
        </div>

        {/* <div>
          <button
            onClick={addNote} // open new editor
            className="rounded-full  opacity-50 hover:opacity-100  bg-transparent hover:bg-blue-700 text-gray-100  font-semibold hover:text-white px-2  border-2 border-blue-light hover:border-transparent ml-5"
          >
            +
          </button>
        </div> */}

        <AddNoteButton />
      </div>

      <div
        className="cursor-pointer"
        onClick={async () => {
          dispatch(setListType(ListTypes.FavNotes));
        }}
      >
        <MenuItem itemTitle="Favorites" icon={<FaStar />} iconColor="orange" />
      </div>
      <div className="flex justify-between items-center mb-3 mt-4">
        <div>
          <h3 className="mx-2 mb-0.5 text-base text-blue-light ">Notebooks</h3>
        </div>
        <div>
        <Tooltip placement="right" title="New Notebook" color="#059669">

          <button
            // onClick={addNote} // open new editor

            // className="rounded-full opacity-50 hover:opacity-100 bg-transparent hover:bg-blue-700 text-gray-100 font-semibold hover:text-white px-2  border-2 border-blue-light hover:border-transparent ml-6"
        // className="rounded-full text-green-400 text-3xl bg-blue-secondary hover:bg-green-700 hover:text-white hover:rounded px-3 py-0.5 ml-5 disabled:opacity-50 disabled:cursor-not-allowed"
        // className="rounded-full p-2.5 bg-blue-secondary text-green-400 hover:bg-green-700 hover:text-white hover:rounded  ml-5 disabled:opacity-50 disabled:cursor-not-allowed"
       
        className="rounded-full p-2.5 bg-blue-secondary  text-green-400 hover:bg-green-600 hover:text-white hover:rounded mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
        
            onClick={() =>
              dispatch(
                setModalState({
                  action: ModalActions.CreateNotebook,
                  show: true,
                })
              )
            }
          >


  <BiBookAdd 
  className=" text-xl"
  
  />
          </button>
          </Tooltip>
        </div>
      </div>

      <div className="overflow-hidden hover:overflow-auto h-80 ">
        {notebooks &&
          notebooks.data.data.map((notebook: Notebook) => (
            <div
              key={notebook._id}
              className="cursor-pointer"
              onClick={() => {
                dispatch(setSelectedNotebook(notebook));
                dispatch(setListType(ListTypes.NotebookNotes));
              }}
            >
              <MenuItem
                key={notebook._id}
                itemTitle={notebook.title}
                icon={<FaBook />}
                iconColor={notebook.color}
              />
            </div>
          ))}
      </div>

      {/* <div
        className="cursor-pointer"
        // onClick={newNotebook} // open modal
        onClick={() =>
          dispatch(
            setModalState({ action: ModalActions.CreateNotebook, show: true })
          )
        }
      >
        <div className="py-4">
          <MenuItem
            itemTitle="New notebook"
            icon={<FaBookMedical />}
            iconColor="gray"
          />
        </div>
      </div> */}

      {/* {modalState.show && modalState.action === ModalActions.CreateNotebook && (
        <AppModal title="Create new notebook" body={<AddNotebookForm />} />
      )} */}

      {modalState.show && modalState.action === ModalActions.CreateNotebook && (
        <AddNotebookModal />
      )}
    </div>
  );
};

export default Menu;
