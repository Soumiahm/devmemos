import React, { useEffect, useState } from "react";
import { useGetOneNotebookQuery } from "../redux/features/api/apiSlice";
import { ListTypes, Note } from "../redux/types";
import NoteDropDownMenu from "./noteDropDownMenu";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { FaBook } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setSelectedNotebook,
  setListType,
  toggleEditorFullScreen,
  setModalState,
  setSelectedNote,
  setNotesList,
} from "../redux/features/noteSlice";
import { Tooltip } from "antd";

interface Props {
  note: Note;
}

const EditorHeader: React.FC<Props> = ({ note }) => {
  // const EditorHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const isEditorFullScreen = useAppSelector(
    (state) => state.note.isEditorFullScreen
  );
  
  const [visible, setVisible] = useState(false);

  const {
    data: notebookData,
    isLoading,
    error,
  } = useGetOneNotebookQuery(note.notebook);

  return (
    //   use flex or grid to organise this header ...
    <div className="flex flex-row justify-between items-center px-6 pt-2 bg-white">
      <div className="flex flex-row justify-between items-center  ">
        <Tooltip
          title={isEditorFullScreen ?   "Collapse note": "Expand note"}
          // onVisibleChange={ }
          color="#059669"
          visible={visible}
        >
          <button
            className="text-gray-700 hover:text-green-600 text-2xl font-semibold border-r border-gray-300 pr-2"
            onClick={() => { setVisible(false);  dispatch(toggleEditorFullScreen());}}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={()=> setVisible(false)}

          >
            {isEditorFullScreen ? (
              <AiOutlineFullscreenExit />
            ) : (
              <AiOutlineFullscreen />
            )}
          </button>
        </Tooltip>
        
        <div>
          <div>
            {error && <h1 className="text-red">There was an error</h1>}
            {isLoading && <h1 className="text-gray-500">Loading ....</h1>}
            {notebookData && (
              <div
                className="flex flex-row items-center text-lg pl-2 cursor-pointer"
                onClick={() => {
                  dispatch(setSelectedNotebook(notebookData.data.data));
                  dispatch(setListType(ListTypes.NotebookNotes));
                }}
              >
                <div className="mr-1 text-base text-gray-500">
                  <FaBook />
                </div>
                <h1 className="text-gray-600 m-0 p-0">
                  {notebookData.data.data.title}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <NoteDropDownMenu note={note} />
      </div>
    </div>
  );
};

export default EditorHeader;
