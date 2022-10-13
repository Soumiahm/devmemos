// import Head from "next/head";
// import Link from "next/link";
// import {TextEditor} from "../components";
import { useState, useEffect } from "react";

import {
  FaStar,
  FaStickyNote,
  FaSearch,
  FaBook,
  FaRegClone,
} from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsArrowsMove } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import HomePage from "../components/home";

// import { useGetUsersQuery } from "../redux/features/api/apiSlice";
import Section from "../components/section";
import Footer from "../components/footer";

import Head from "next/head";
import Dashboard from "../components/dashboard";
// import {FetchBaseQueryError} from '@reduxjs/toolkit/query'

// const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')

export default function Home() {
  // const { data, error, isLoading } = useGetUsersQuery();
  const deleteNote = (id: string) => {
    alert(`deleting: ${id}`);
  };

  // const consoleErr = () => {
  //   console.log(error);
  // };
  return (
    <div>
      <Head>
        <title>dev|memos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage />
      <Section />
      <Footer />

      {/* <NoteCard
        note={{
          id: "1234123",
          description: "blabla",
          dateCreated: '19-01-2020',
          title: "Amazing note",
        }}
        onDeleteNote={deleteNote}
      /> */}
      {/* <Login/> */}
      {/* {error && <h1>{error.data.message} </h1> && consoleErr() } */}
      {/* {error && <h1>{error.status}</h1>} 
      {error && JSON.stringify(error.data)} */}
      {/* https://giters.com/reduxjs/redux-toolkit/issues/1337?amp=1 */}

      {/* {JSON.stringify(data)} */}
    </div>
  );
}
