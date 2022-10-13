export interface User {
    _id: string;
    name: string;
    email: string;
    password?: string;
    passwordConfirm?: string;
    id?: string;
    role?: string;
    notebooks?: [];
  }
  export interface Note {
    location: {
      type: "Point"; 
      coordinates:[] ;
    };
    favorite: boolean;
    _id: string;
    title: string;
    description?: string;
    content: string;
    user: string;
    notebook: string;
    createdAt: Date;
    id: string;
  }
  export interface Notebook {
    _id: string;
    title: string;
    color: string;
    user?: string;
    createdAt?: Date;
    id?: string;
  }

  export const enum ListTypes {
    AllNotes = "allNotes",
    FavNotes = "favNotes",
    NotebookNotes = "notebookNotes",
    SearchNotes = "searchNotes",
  }

  export const enum ModalActions {
    None = "none", 
    CreateNotebook = "createNotebook",
    DelteteNotebook = "deleteNotebook",
    UpdateNotebook = "updateNotebook",
    MoveNote = "moveNote",
  }