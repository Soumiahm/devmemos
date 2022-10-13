import { useState, useCallback } from "react";
import { useGetAllNotesQuery } from "../redux/features/api/apiSlice";
import NotesList from "./notesList";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setNotesList, setLimit, setShowLoadMore } from "../redux/features/noteSlice";
// import {setLimit, setShowLoadMore} from "../redux/features/noteSlice";

import { useEffect } from "react";
import SearchBar from "./searchBar";
import { Note } from "../redux/types";

const AllNotesList: React.FC = () => {
  const dispatch = useAppDispatch();

  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(20);
  const limit = useAppSelector((state) => state.note.limit); //set max limit in redux
  //add required to inputs for edit / create notebook////////////
  // const [loadMoreVisible, setLoadMoreVisible] = useState(false);

  const {
    data: notesData,
    isLoading,
    error,
  } = useGetAllNotesQuery({ page: 1, limit });

  useEffect(() => {
    if (notesData) {
      dispatch(setNotesList(notesData.data.data));
      (notesData.results) == limit ? dispatch(setShowLoadMore(true)) : dispatch(setShowLoadMore(false)); 
     //also not passing the max limit that can be passed ... check if == limit but also that limit != max-limit 
     //so you do not get to get same number of notes
     //-- make the same logic for noteooknotes + favnotes  
      // console.log('(notesData.results - limit) = ? ', (notesData.results - limit = 0));
      

      
    }
  }, [notesData]);

  // useEffect(() => {
  //   if (notesData) {
  //     // dispatch(setNotesList(notesData.data.data));
  //     // (notesData.results) == limit ? dispatch(setShowLoadMore(true)) : dispatch(setShowLoadMore(false)); 
     
  //     // console.log('(notesData.results - limit) = ? ', (notesData.results - limit = 0));
  //     console.log('show load more before:', showLoadMore);
     
  //     if ((notesData.results) == limit){
  //       dispatch(setShowLoadMore(true));
        
  //       // console.log('limit :', limit);
  //       // console.log('results :', notesData.results);
  //       console.log('show load more :', showLoadMore);
  //       // console.log('(notesData.results === limit) ? ', (notesData.results === limit));
  //       console.log('(notesData.results == limit) ? ', (notesData.results == limit));

  //     }
  //   }
  // }, [setShowLoadMore, showLoadMore]);

  /*/ ------------------------------------------
  //we change here
  const [Items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  //setting the initial page
  const [page, setPage] = useState(0);
  //we need to know if there is more data
  const [HasMore, setHasMore] = useState(true);

  //on initial mount
  useEffect(() => {
    loadMoreItems();
  }, []);

  const loadMoreItems = () => {
    setIsFetching(true);

    //using axios to access the third party API
    axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/albums",
      params: { _page: page, _limit: 40 },
    })
      .then((res) => {
        setItems((prevTitles) => {
          return [...new Set([...prevTitles, ...res.data.map((b) => b.title)])];
        });
        setPage((prevPageNumber) => prevPageNumber + 1);
        setHasMore(res.data.length > 0);
        setIsFetching(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

// ------------------------------------------*/

  // const loadMoreItems =
  // useCallback(
  //   () => {
  //     setPage((prevPageNumber) => prevPageNumber + 1);
  //     setLoadMoreVisible(false);

  // if (notesData) {
  // console.log('notes data exists');
  // if(allNotes) console.log("allnotes ------------ ------ ");
  // setAllNotes(notesData.data.data);
  // if(allNotes){ setAllNotes([...allNotes, ...notesData.data.data]);
  // (allNotes && allNotes.length>0)? setAllNotes([...allNotes, ...notesData.data.data]): setAllNotes(notesData.data.data);
  // dispatch(setNotesList(notesData.data.data));
  //  dispatch(setNotesList(allNotes));}
  // setHasMore(notesData.data.data.length > 0 && notesData.data.data.length < limit );
  // if (notesData)  setHasMore(notesData.data.data.length>0);

  // }

  //   },
  //   [],
  // )
  // const loadMoreItems = () => {
  //   // setPage((prevPageNumber) => prevPageNumber + 1);
  //   setLimit(30);
  //   setLoadMoreVisible(false);
  //   // dispatch
  //   // if (notesData) setHasMore(notesData.data.data.length > 0);
  // };

  return (
    <div className="flex flex-col h-screen border-r-2 border-gray-100 ">
      <div className=" sticky top-0 bg-white pt-6 flex flex-col px-4 h-32 ">
        <div>
          <SearchBar />
        </div>

        <div className="text-2xl text-gray-600 font-semibold pt-2 pb-2 tracking-wide">
          All notes
        </div>
      </div>

      {/* <div className="text-blue-light content-center pl-4">All Notes</div> */}
      {error && <h1 className="text-red">There was an error</h1>}
      {isLoading && <h1 className="text-white">Loading ....</h1>}
      {/* {notesData && <NotesList />} */}
      {notesData && (
        <NotesList
          // onEndScroll={(endOfScroll: boolean) =>
          //   setLoadMoreVisible(endOfScroll)
          // }
        />
      )}

      {/* {!isLoading && loadMoreVisible && (
        <button onClick={loadMoreItems}>Load more</button>
      )} */}

      {/* {!isLoading && showLoadMore && (    
        <button onClick={loadMoreItems}>Load more</button>      
      )} */}
    </div>
  );
};

export default AllNotesList;

/*

- If the results are equal to the limit => 
  -> this means there are more results  -> show the load more button 
  -> when on click on the show more btn -> set the limit to 1000 and set load more show to false.  
  -> set it in redux ---> no need to check if they scrlled to the end, I'll put it in the end


   <div>
      {Items.map((item, index) => {
        if (Items.length === index + 1) {
          return (
            <div key={index}>
              {item} - <b>last</b>
            </div>
          );
        } else {
          return <div key={index}>{item}</div>;
        }
      })}
      {isFetching && <p>Fetching items...</p>}
      {!isFetching && HasMore && (
        <button onClick={loadMoreItems}>Load more</button>
      )}
    </div>
*/
