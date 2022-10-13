import SearchBar from "./searchBar";
import { useAppSelector } from "../redux/hooks";
import { ListTypes, Notebook } from "../redux/types";
import NotebookNotesList from "./notebookNotesList";
import FavNotesList from "./favNotesList";
import AllNotesList from "./allNotesList";

import Menu from "./menu";
import NoteEditor from "./NoteEditor";
import SearchNotesList from "./searchNotesList";
import DashboardPlaceholder from "./dashboardPlaceholder";
import Profile from "./profile";

const Dashboard = () => {
  const listType = useAppSelector((state) => state.note.listType);
  const selectedNote = useAppSelector((state) => state.note.selectedNote);

  const displayNotesList = () => {
    switch (listType) {
      case ListTypes.AllNotes:
        return <AllNotesList />;
      case ListTypes.FavNotes:
        return <FavNotesList />;
      case ListTypes.NotebookNotes:
        return <NotebookNotesList />;
      case ListTypes.SearchNotes:
        return <SearchNotesList />;
      default:
        //ADD a new list search
        return <h1 className="font-bold">Please pick a folder!</h1>;
    }
  };

  return (
    <div className="font-body grid grid-cols-12 h-screen w-full">
      <div className="bg-blue-dark col-span-2   grid grid-col-1 gap-1">
        {/* <div className="col-span-1 bg-blue-dark text-blue-light text-sm"> */}
         
        <Profile/>
        

        {/* </div> */}
        {/* <div className="col-span-1"> */}
          <Menu />
        {/* </div> */}
      </div>

      <div className="bg-white col-span-3">{displayNotesList()}</div>

      <div className="w-full h-full col-span-7 ">
        {/* if the selected note is null, show the placeholder otherwise show the editor with the selected note  */}
        {selectedNote ? <NoteEditor /> : <DashboardPlaceholder />}
     
      </div>
    </div>
  );
};

export default Dashboard;
