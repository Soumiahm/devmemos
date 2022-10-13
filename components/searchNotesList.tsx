import { useGetAllNotesQuery, useSearchNotesQuery } from "../redux/features/api/apiSlice";
import NotesList from "./notesList";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setNotesList } from "../redux/features/noteSlice";
import { useEffect } from "react";

const SearchNotesList: React.FC = () => {
const searchString = useAppSelector((state) => state.note.searchString);

  const { data: notesData, isLoading, error } = useSearchNotesQuery(searchString);

  

  useEffect(() => {
    if (notesData) dispatch(setNotesList(notesData.data.data));
    if (notesData) console.log("DATA FROM USEsEARCHQUERY: ", notesData.data.data);
  }, [notesData]);

  const dispatch = useAppDispatch();

  return (
    <>
      {error && <h1 className="text-red">There was an error</h1>}
      {isLoading && <h1 className="text-white">Loading ....</h1>}
      {notesData && <NotesList />}
    </>
  );
};

export default SearchNotesList;
