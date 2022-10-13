import React from 'react'
import AccountInfo from '../components/accountInfo';

const Settings = () => {
    return (
        <div className="font-body grid grid-cols-12 gap-6 h-screen w-full">
          {/* <div className="bg-blue-dark col-span-2 grid grid-col-1 gap-1"> */}
          <div className="bg-blue-dark h-screen col-span-2">
            {/* <div className="col-span-1 bg-blue-dark text-blue-light text-sm"> */}
            {/* <Profile/> */}
            <div className="mt-10 mr-4 flex justify-end text-blue-light ">USER SETTINGS</div>
          </div>
          <div className="bg-white h-screen col-span-7">
              {/* {displayNotesList()} */}
            {/* <div className=" h-full  "> */}
                <AccountInfo/>
            {/* </div> */}

              </div>
          <div className="w-full h-full col-span-3 ">
            {/* if the selected note is null, show the placeholder otherwise show the editor with the selected note  */}
            {/* {selectedNote ? <NoteEditor /> : <DashboardPlaceholder />} */}

          </div>
        </div>
      );
    };
    
    export default Settings;
