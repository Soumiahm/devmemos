import React from 'react'
import Dashboard from '../components/dashboard';
import { useRouter } from 'next/router';
import {useGetFavoriteNotesQuery, useGetnotebooksQuery} from "../redux/features/api/apiSlice";

const Me = () => {

    // const { data, error, isLoading } = useGetFavoriteNotesQuery();
    const { data, error, isLoading } = useGetnotebooksQuery();
    const router = useRouter();
    const getData = (data:any)=>{
        const favNotes = data.data.data;
        console.log(favNotes);
        console.log(typeof (favNotes));
        return <ul>{favNotes.map(item => <li key={item._id}>{item.title}</li>)}</ul>

    }
    return (
        // <div>
        //     {/* <Dashboard/> */}
        //     <h1>Dasboard</h1>
        //     <h1 className="font-bold">Hi {router.query.name}</h1>
        //     <h2 className="font-medium">Your favorite notes:</h2>
        //     {isLoading && <h3>Loading ....</h3>}
        //     {error && <h1>There was an error: {error.status}</h1>}
        //     {/* {data && <ul>{data.data.map(item => <li key={item._id}>item.title</li>)}</ul>} */}
        //     {data && getData(data)}


            
        // </div>
        <Dashboard/>
    )
}

export default Me;
