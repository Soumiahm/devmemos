import { useGetFavoriteNotesQuery } from "../redux/features/api/apiSlice";
import NotesList from "./notesList";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setNotesList } from "../redux/features/noteSlice";
import { useEffect } from "react";
import SearchBar from "./searchBar";

const FavNotesList: React.FC = () => {

    const {
        data: notesData,
        isLoading,
        error,
      } = useGetFavoriteNotesQuery();

    useEffect(() => {
        if (notesData)
            dispatch(setNotesList(notesData.data.data));
    }, [notesData]);


  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col h-screen border-r-2 border-gray-100 ">

<div className=" sticky top-0 bg-white pt-6 flex flex-col px-4 h-32 ">
  <div>
    <SearchBar/>
  </div>

  <div className="text-2xl text-gray-600 font-semibold pt-2 pb-2 tracking-wide">
  Favorite notes
    </div>

    </div>
    
    
      {error && <h1 className="text-red">There was an error</h1>}
      {isLoading && <h1 className="text-white">Loading ....</h1>}
      {notesData && <NotesList />}
    </div>
  );
};

export default FavNotesList;
