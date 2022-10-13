import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { Note, Notebook, ListTypes, ModalActions } from "../types";

// Define a type for the slice state
interface NoteState {
  notesList: Note[]; // or null?
  modalState: { action: ModalActions; show: boolean };
  listType: ListTypes;
  selectedNotebook: Notebook | null;
  selectedNote: Note | null;
  searchString: String;
  isEditorFullScreen: Boolean;
  showToolbar: Boolean;
  showLoadMore: Boolean;
  limit: Number;
}

// Define the initial state using that type
const initialState: NoteState = {
  notesList: [],
  modalState: { action: ModalActions.None, show: false },
  listType: ListTypes.AllNotes,
  selectedNotebook: null,
  selectedNote: null,
  searchString: "",
  isEditorFullScreen: false,
  showToolbar: false,
  showLoadMore: false,
  limit: 10,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotesList: (state, action: PayloadAction<Note[]>) => {
      state.notesList = action.payload;
    },
    setSelectedNotebook: (state, action: PayloadAction<Notebook>) => {
      state.selectedNotebook = action.payload;
    },
    setSelectedNote: (state, action: PayloadAction<Note>) => {
      state.selectedNote = action.payload;
    },
    setListType: (state, action: PayloadAction<ListTypes>) => {
      state.listType = action.payload;
    },
    setSearchString: (state, action: PayloadAction<String>) => {
      state.searchString = action.payload;
    },
    setModalState: (
      state,
      action: PayloadAction<{ action: ModalActions; show: boolean }>
    ) => {
      state.modalState = action.payload;
    },
    resetModalState: (state) => {
      state.modalState = initialState.modalState;
    },
    setShowToolbar: (state, action: PayloadAction<Boolean>) => {
      state.showToolbar = action.payload;
    },
    setShowLoadMore: (state, action: PayloadAction<Boolean>) => {
      state.showLoadMore = action.payload;
    },
    setLimit: (state, action: PayloadAction<Number>) => {
      state.limit = action.payload;
    },
    toggleEditorFullScreen: (state) => {
      state.isEditorFullScreen = !state.isEditorFullScreen;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setNotesList,
  setSelectedNotebook,
  setSelectedNote,
  setListType,
  setSearchString,
  setModalState,
  resetModalState,
  setShowToolbar,
  setShowLoadMore,
  setLimit,
  toggleEditorFullScreen,
} = noteSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNotes = (state: RootState) => state.note.notesList;

export default noteSlice.reducer;
