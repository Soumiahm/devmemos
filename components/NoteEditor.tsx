import React, { useState, useEffect, useCallback, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor, EditorEvent, Events } from "tinymce";
import he from "he";
import { Note, Notebook } from "../redux/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useUpdateNoteMutation } from "../redux/features/api/apiSlice";
import parse from "html-react-parser";
import EditorHeader from "./EditorHeader";
import { setSelectedNote, setShowToolbar } from "../redux/features/noteSlice";
import { IoIosCheckmarkCircle } from "react-icons/io";

function getTextFromHTML(data: string) {
  var span = document.createElement("span");
  span.innerHTML = data;
  return span.textContent || span.innerText;
}

const NoteEditor: React.FC = () => {
  const note = useAppSelector((state) => state.note.selectedNote);
  const showToolbar = useAppSelector((state) => state.note.showToolbar);
  const isEditorFullScreen = useAppSelector(
    (state) => state.note.isEditorFullScreen
  );
  const [updateNote, updateNoteResult] = useUpdateNoteMutation();
  const [data, setData] = useState<string | any>("");
  const [lastData, setLastData] = useState<string | any>("");

  // const [prevNote, setPrevNote] = useState("");
  // const [recentNote, setRecentNote] = useState("");

  const [len, setLen] = React.useState(0);
  const [saving, setSaving] = React.useState(true);

  const dispatch = useAppDispatch();

  const sizeLimit = 70000;

  const [noteTitle, setNoteTitle] = useState("");
  const [lastTitle, setLastTitle] = useState("");
  // const [showToolbar, toggleShowToolbar] = useState(false);
  // const [toolbarVis, setToolbarVis] = useState(false);

  const didMountRef = useRef(false);

  useEffect(() => {
    didMountRef.current = false;

    //on mount first time, need to show all changes are saved not saving!
    // console.log("MOUNTED NEW NOTE=?didMountRef.current: ", didMountRef.current);
    if (note) {
      setSaving(true);

      if (note.title !== "Untitled") {
        setNoteTitle(note.title);
        setLastTitle(note.title);
      } else {
        setNoteTitle("");
        setLastTitle("");
      }
    }

    // if (note && toolbar && note.content) {
    if (note && note.content) {
      const parsedData = parse(note.content);
      setData(parsedData);
      setLastData(data);
    } else {
      setData("");
      //reset lastData as we selected a new note
      setLastData("");
    }
    return () => {
      // updateNote({ ...note,  content: data });
      setSaving(true);
    };
  }, [note]);

  // const handleOnFocus = (
  //   evt: EditorEvent<Events.EditorEventMap["focus"]>,
  //   editor: TinyMCEEditor
  // ) => {
  //   () => {
  //     console.log(" focussss : Title set :", noteTitle);

  //     dispatch(setShowToolbar(true));
  //   };
  // };

  useEffect(() => {
    // console.log("didMountRef.current: ", didMountRef.current);
    console.log("Title set :", noteTitle);
    if (didMountRef.current === true && note) {
      if (data !== lastData || noteTitle !== lastTitle) {
        setSaving(false);
      }
      const interval = setInterval(() => {
        if (data !== lastData || noteTitle !== lastTitle) {
          let description = getTextFromHTML(data).trim();
          description =
            description.length < 80
              ? description
              : description.substring(0, 79) + "...";
          // description = description.replace(/<[^>]*>?/gm, "");
          description = he.decode(description);
          if (description.trim().length === 0) description = "";
          // he.encode(title);
          const title = noteTitle.trim().length === 0 ? "Untitled" : noteTitle;
          updateNote({ ...note, title, description, content: data })
            .unwrap()
            .then((fulfilled) => {
              dispatch(setSelectedNote(fulfilled.data.data));
            })
            .catch((rejected) => console.log(rejected));

          setLastData(data);
          setLastTitle(noteTitle);
          setSaving(true);
        }
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    } else {
      didMountRef.current = true;
    }
  }, [data, lastData, noteTitle, lastTitle]);

  const handleShowToolbar = () => {
    // const newToolbar = editorRef.current;
    // if(newToolbar) console.log("newToolvar: "+ newToolbar.classList  )// { console.log("ClassList: ::", newToolbar.classList) } //.current.classList;
    const toolbar = document.querySelector<HTMLElement>(".tox-editor-header");
    // console.log({ toolbar });
    if (toolbar) {
      toolbar.style.display = showToolbar ?  "none" : "";
    }
    return toolbar;
  };
  const handleInit = (evt: unknown, editor: TinyMCEEditor) => {
    // console.log("show toolbar is ======== ", showToolbar);
    // console.log("bu class name SELECTOR",editor.dom.getParent);
    // const test = editor.dom.getParent;
    // if (test) test.querySelector(".tox-editor-header");
    // console.log("QUERY SELECTOR", editor.dom.doc.querySelector(".tox-editor-header")) //.style.display = "none"; //.getElementsByClassName

    // editor.dom.getParent //loadCSS(".tox-editor-header: {display: none }");
    //  setShowToolbar(false);
    // handleShowToolbar();
    const toolbar = document.querySelector<HTMLElement>(".tox-editor-header");
    if (toolbar) toolbar.style.display = "none";
    let editorLength = editor.getContent({ format: "text" }).length;
    setLen(editorLength);
    //Focus cursor if note content is empty
  };

  const handleUpdate = (value: string, editor: TinyMCEEditor) => {
    const length = editor.getContent({ format: "text" }).length;
    if (length <= sizeLimit) {
      setData(value);
      setLen(length);
    }
  };

  const handleBeforeAddUndo = (
    evt: EditorEvent<Events.EditorEventMap["BeforeAddUndo"]>,
    editor: TinyMCEEditor
  ) => {
    const length = editor.getContent({ format: "text" }).length;
    // note that this is the opposite test as in handleUpdate
    // because we are determining when to deny adding an undo level
    if (length < 1) {
      editor.focus();
    }

    if (length > sizeLimit) {
      evt.preventDefault();
    }
  };

  const handleOnFocus = (
    evt: EditorEvent<Events.EditorEventMap["focus"]>,
    editor: TinyMCEEditor
  ) => {
    () => {
      console.log(" focussss : Title set :", noteTitle);

      dispatch(setShowToolbar(true));
    };
  };

  const handleOnBlur = (
    evt: EditorEvent<Events.EditorEventMap["focus"]>,
    editor: TinyMCEEditor
  ) => {
    () => {
      console.log(" blur : Title set :", noteTitle);

      dispatch(setShowToolbar(false));
    };
  };

  return (
    <div
      className={
        isEditorFullScreen
          ? "bg-white h-screen w-screen absolute top-0 right-0 left-0 "
          : "bg-white"
      }
    >
      <div> {note && <EditorHeader note={note} />}</div>
      <div>
        <input
          className="appearance-none text-center text-3xl font-semibold pb-4 pt-2 px-4 w-full bg-transparent border-none  text-gray-800 focus:outline-none"
          type="text"
          maxLength={80}
          placeholder="Title"
          value={noteTitle}
          onChange={(e) => {
            setNoteTitle(e.target.value);
          }}
        />

        <Editor
          apiKey="ocs621rlxcng6szotr4ytkfvaioxl37g0jy9nqddjjle8wwj"
          value={data}
          onEditorChange={handleUpdate}
          onBeforeAddUndo={handleBeforeAddUndo}
          // onFocus={handleOnFocus}
          // onFocus={() => dispatch(setShowToolbar(true))}
          onFocus={() => {
            dispatch(setShowToolbar(true));
            handleShowToolbar();
          }}
          onBlur={() => {
            dispatch(setShowToolbar(false));
            handleShowToolbar();
          }}
          // onBlur={() => dispatch(setShowToolbar(false))}
          // onBlur={e=>handleOnBlur}
          onKeyDown={() => dispatch(setShowToolbar(true))}
          onInit={handleInit}
          init={{
            // height: "485px",
            height: screen.height - 302,
            menubar: false,
            statusbar: false,
            // toolbar: true ? false : false,
            // toolbar: showToolbar ? toolbar : toolbar,
            toolbar,
            toolbar_mode: "wrap",
            // distraction-free:true,
            plugins,
            codesample_languages,
            // toolbar,
            placeholder: "Your story ..",
            // content_style: `body { font-family: 'Source Sans Pro', sans-serif, Helvetica, Arial; font-size: 16px; color: #292929; line-height: 1.45; }
            // body > :first-child {
            //   font-size: 30px;
            //   font-weight: bold;
            //   color: #1F2937;
            // }
            // .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
            //     font-size: 30px;
            //     font-weight: bold;
            //     color: #D1D5DB;
            //   }
            //   `,
            // content_style: `body { font-family: 'Source Sans Pro', sans-serif; font-size: 16px; color: #5D656C; line-height: 1.45; }`,
            content_style: `body { font-family: 'Source Sans Pro', sans-serif, Helvetica, Arial; font-size: 18px; font-weight:medium; color: #292929; line-height: 1.45; } `,
            branding: false,
            inline_boundaries: false,
            elementpath: false,
          }}
        />
      </div>

      <div className="flex flex-row items-center justify-between py-1 px-6 text-gray-600 font-medium sticky bottom-0 h-12 bg-white border-t-2 border-gray-100 ">
        {sizeLimit - len < 69999 ? (
          <div className="text-red-400">Remaining: {sizeLimit - len}</div>
        ) : (
          <p></p>
        )}
        {saving ? (
          <div className="flex flex-row justify-center items-center">
            <IoIosCheckmarkCircle className="text-green-600 text-xl mr-1" /> All
            changes saved
          </div>
        ) : (
          <p>Saving ...</p>
        )}
      </div>

      {/* <button onClick={log}>Log editor content</button> */}
    </div>
  );
};

// Editot configuration
const toolbar =
  "bold italic underline strikethrough subscript superscript " +
  "blockquote removeformat forecolor backcolor " +
  "alignleft aligncenter alignright alignjustify " +
  "indent outdent numlist bullist " +
  "codesample link unlink hr table image undo redo" +
  " fontsizeselect fontselect formatselect emoticons ";

const codesample_languages = [
  { text: "JavaScript", value: "javascript" },
  { text: "HTML/XML", value: "markup" },
  { text: "CSS", value: "css" },
  { text: "PHP", value: "php" },
  { text: "Ruby", value: "ruby" },
  { text: "Python", value: "python" },
  { text: "Java", value: "java" },
  { text: "C", value: "c" },
  { text: "C#", value: "csharp" },
  { text: "C++", value: "cpp" },
];

const plugins = "link image codesample table fullscreen hr lists emoticons";
//  [
// 'advlist autolink lists link image charmap print preview anchor',
// 'searchreplace visualblocks code fullscreen',
// 'insertdatetime media table paste code help wordcount',
// 'codesample'
// ];
//textcolor colorpicker

export default NoteEditor;
