import React, { useEffect, useState } from "react";
import { setSelectedNote } from "../redux/features/noteSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLimit, setShowLoadMore } from "../redux/features/noteSlice";
import NoteCard from "./noteCard";

/**all notes -> of a selected notebook ? or recent notes?
 * => get the notes from the dashboard so we know from which notebook to get the notes
 */

// interface Note {
//   id: string;
//   title: string;
//   dateCreated: string;
//   description: string;
// }

// interface Props {
//   onEndScroll?: (b: boolean) => void;
//   c?: Boolean;
// }

// const NotesList: React.FC<Props> = ({ onEndScroll, c }) => {
  const NotesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.note.notesList);
  const limit = useAppSelector((state) => state.note.limit);
  const showLoadMore = useAppSelector((state) => state.note.showLoadMore);
  const selectedNote = useAppSelector((state) => state.note.selectedNote);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  //  const handleScroll = (e: any) => {
  //     const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  //     setScrolledToBottom(bottom);
  //     if ( onEndScroll ) onEndScroll(bottom);
  //     console.log('onEndScroll onEndScroll reached bottom: ', bottom)
  //   }

  if (notes === undefined || notes.length === 0)
    return (
      <h1 className="text-sm text-gray-700 p-4 mt-5">
        You have no notes in this folder, click here to create a note{" "}
      </h1>
    );
  return (
    <div className="overflow-hidden hover:overflow-auto h-full flex flex-col items-start">
      {notes.map((note) => (
        <div
          key={note._id}
          onClick={() => {
            dispatch(setSelectedNote(note));
          }}
        >
          <NoteCard
            note={note}
            selected={selectedNote && note._id === selectedNote._id}
          />
        </div>
      ))}

      {showLoadMore && (
      
       <button
          className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow my-2 ml-6 w-72"
          onClick={() => {
            dispatch(setLimit(30));
            dispatch(setShowLoadMore(false));
          }}
        >
          Load more
        </button> 
       
      )}
      {/* {c && <button onClick ={() => {dispatch(setLimit(30)); dispatch(setShowLoadMore(false)) }} >LOAAAAADDD MORE</button>} */}
      {/* <button onClick ={() => {dispatch(setLimit(30)); dispatch(setShowLoadMore(false)) }} >LOAAAAADDD MORE</button> */}
      {/* <div className="p-6"> The bottom of the list - {c  && c.toString()}</div> */}
    </div>
  );
};

export default NotesList;
