import React from "react";

import { FaSearch } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchNotesQuery } from "../redux/features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { setSearchString, setListType } from "../redux/features/noteSlice";
import { ListTypes } from "../redux/types";

interface IFormInput {
  searchString: String;
}

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    // console.log(data);
    console.log("search string from form : ", formData.searchString);
    await dispatch(setSearchString(formData.searchString));
    dispatch(setListType(ListTypes.SearchNotes));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" sticky flex  justify-center items-center p-2 text-gray-600 border-2 border-gray-300 rounded-full">
        <button type="submit">
          <FaSearch />
        </button>
        <input
          className="ml-3 bg-transparent border-transparent focus:outline-none focus:border-transparent "
          placeholder="Search notes"
          type="text"
          {...register("searchString", { required: true, maxLength: 100 })}
        />
      </div>
    </form>
  );
};

export default SearchBar;
