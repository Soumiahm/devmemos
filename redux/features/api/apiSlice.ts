import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, Notebook, Note } from "../../types";

interface IsAuth {
  status: string;
  token: string;
  data: {
    user: User;
  };
}

function strEndsWith(str: String, suffix: any) {
  return str.match(suffix + "$") == suffix;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1",
  }),
  // entityTypes : [],
  tagTypes: ["User", "Notebook", "Note"],

  endpoints: (builder) => ({
    getUsers: builder.query<User, void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    login: builder.mutation<IsAuth, Pick<User, "email" | "password">>({
      query: ({ email, password }) => {
        //   console.log( {email, password});
        return {
          url: "/users/login",
          method: "POST",
          body: { email, password },
          credentials: "include",
        };
      },
    }),
    signup: builder.mutation<IsAuth, Pick<User, "name"|"email" | "password"| "passwordConfirm">>({
      query: ({ name, email, password, passwordConfirm }) => {
        //   console.log( {email, password});
        return {
          url: "/users/signup",
          method: "POST",
          body: { name, email, password, passwordConfirm },
          credentials: "include",
        };
      },
    }),
    getnotebooks: builder.query<
      { status: String; results: Number; data: { data: Notebook[] } },
      void
    >({
      query: () => {
        return { url: "/notebooks?sort=createdAt", credentials: "include" };
      },
      providesTags: ["Notebook"],
    }),

    getOneNotebook: builder.query<
      { status: String; data: { data: Notebook } },
      String
    >({
      query: (notebookID) => {
        return { url: `/notebooks/${notebookID}`, credentials: "include" };
      },
      providesTags: ["Notebook"],
    }),

    getFavoriteNotes: builder.query<
      { status: String; results: Number; data: { data: Note[] } },
      void
    >({
      query: () => {
        return { url: `/notes/favorites`, credentials: "include" };
      },
      providesTags: ["Note"],
    }),

    getNotesInNotebook: builder.query<
      { status: String; results: Number; data: { data: Note[] } },
      string
    >({
      query: (id) => {
        return { url: `/notebooks/${id}/notes`, credentials: "include" };
      },
      providesTags: ["Note", "Notebook"],
    }),

    // getAllNotes: builder.query<
    //   { status: String; results: Number; data: { data: Note[] } },
    //   void
    // >({
    //   query: () => {
    //     return { url: `/notes`, credentials: "include" };
    //   },
    //   providesTags: ["Note"],
    // }),

    getAllNotes: builder.query<
      { status: String; results: Number; data: { data: Note[] } },
      {page: Number, limit: Number}
    >({
      query: ({page, limit}) => {
        return { url: `/notes?page=${page}&limit=${limit}`, credentials: "include" };
      },
      providesTags: ["Note"],
    }),

    createNotebook: builder.mutation<{}, Pick<Notebook, "title" | "color">>({
      query: ({ title, color }) => {
        return {
          url: `/notebooks`,
          method: "POST",
          body: { title, color },
          credentials: "include",
        };
      },
      invalidatesTags: ["Notebook"],
    }),

    createNote: builder.mutation<{ status: String; data: { data: Note } }, {}>({
      query: (notebookID: String) => {
        return {
          url: `/notebooks/${notebookID}/notes`,
          method: "POST",
          body: {},
          credentials: "include",
        };
      },
      invalidatesTags: ["Note"],
    }),

    searchNotes: builder.query<
      { status: String; results: Number; data: { data: Note[] } },
      String
    >({
      query: (searchString) => {
        console.log(`URL::::::::: /notes/search-notes?search=${searchString}`);
        return {
          url: `/notes/search-notes?search=${searchString}`,
          credentials: "include",
        };
      },
      providesTags: ["Note"],
    }),

    updateNotebook: builder.mutation<{ status: String; data: { data: Notebook } }, Notebook>({
      query: ({ _id, ...rest }) => {
        return {
          url: `/notebooks/${_id}`,
          method: "PATCH",
          body: rest,
          credentials: "include",
        };
      },
      invalidatesTags: ["Notebook"],
    }),

    deleteNotebook: builder.mutation<{}, string>({
      query: (_id) => {
        return {
          url: `/notebooks/${_id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["Notebook"],
    }),

    updateNote: builder.mutation<
      { status: String; data: { data: Note } },
      Note
    >({
      query: ({ _id, ...rest }) => {
        return {
          url: `/notes/${_id}`,
          method: "PATCH",
          body: rest,
          credentials: "include",
        };
      },
      invalidatesTags: ["Note"],
    }),

    cloneNote: builder.mutation<{ status: String; data: { data: Note } }, Note>(
      {
        query: ({ _id, createdAt, location, ...rest }) => {
          const clone = strEndsWith(rest.title, "Copy")
            ? { ...rest, title: rest.title }
            : { ...rest, title: rest.title + " - Copy" };
          return {
            url: `/notebooks/${clone.notebook}/notes`,
            method: "POST",
            body: { ...clone },
            credentials: "include",
          };
        },
        invalidatesTags: ["Note"],
      }
    ),
    // //Or should I simply use update => I think I will just use updateNote api
    // moveNote: builder.mutation<{ status: String; data: { data: Note } }, {noteId: String, notebookId: String }>({
    //   query: ({noteId, notebookId}) => {
    //     return {
    //       url: `/notes/${noteId}`,
    //       method: "PATCH",
    //       body: {notebook: notebookId},
    //       credentials: "include",
    //     };
    //   },
    //   invalidatesTags: ["Note"],
    // }),

    deleteNote: builder.mutation<{}, string>({
      query: (_id) => {
        return {
          url: `/notes/${_id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["Note"],
    }),
    // forgotPassword: builder.mutation<>({
    //   query: ({ email }) => {
    //     //   console.log( {email, password});
    //     return {
    //       url: "/forgot",
    //       method: "POST",
    //       body: { email },
    //     };
    //   },
    // }),
    // getNotesInNotebook: builder.query<>({ //limit per page is 100, I can make it less, and add load more ...
    //   query: (notebookId) => `/notebooks/${notebookId}/notes`,
    // }),
    // getFavoriteNotes: builder.query<>({
    //   query: () => `/notes/favorites`,
    // }),
    // getStats: builder.query<>({
    //   query: () => `/notes/analytics`,
    // }),
    //updateNote: PATCH /notes/noteID
    //https://www.youtube.com/watch?v=eSs-XslROR8&list=PL-yz-OVZnUrPdjJQR2IdiEvAwgUFi5JrE&index=2
    //
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetFavoriteNotesQuery,
  useGetnotebooksQuery,
  useUpdateNoteMutation,
  useUpdateNotebookMutation,
  useGetOneNotebookQuery,
  useGetNotesInNotebookQuery,
  useGetAllNotesQuery,
  useCreateNotebookMutation,
  useDeleteNotebookMutation,
  useDeleteNoteMutation,
  useSearchNotesQuery,
  useCreateNoteMutation,
  useCloneNoteMutation,
} = apiSlice;

/**
 * API:
 *Get All notes in a notebook: api/v1/notebooks/notebookID/notes
 *To get only favorites and sort by createdAt: ?favorite=true&sort=createdAt
 *
 * Create new note in a notebook: api/v1/notebooks/notebookID/notes
 *      Body: {title: string, favorite: boolean(false by default), content: string }
 *      => Does creating a note require a notebook?
 *
 * Get stats: api/v1/notes/analytics
 * This gives all the notebooks with the number of notes in each notebook
 *
 * Athentication:
 *
 * login: api/users/login
 * Body: {email: email, password: string(min 8+ characters)}
 *
 * forgot password:
 * Body: {name: string, email: email, password: string, passwordConfirm: string}
 */
