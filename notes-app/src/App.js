// added comment for 12JUl2022 16:10
// second comment for 12JUL2022 16:31

import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import Note from "./components/Note";
import noteService from "./services/notes";
import Footer from "./components/Footer";
import Notification from "./components/Notification";


const App = () => {
  //In order to get our page to update when new notes are added
  //it's best to store the notes in the App component's state
  const [newNote, setNewNote] = useState("a new note...");
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  //using useEffect hook to retreive notes now 18072022

  const hook = () => {
    console.log("effect");
    // axios.get("http://localhost:3001/notes").then((response) => {
    //   console.log("promise fulfilled");
    // });
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };


  useEffect(hook, []);

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    // axios.put(url, changedNote).then((response) => {
    //   setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    // });

    noteService.update(id, changedNote).then((returnedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    }).catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  };

  console.log("render", notes.length, "notes");

  // add note function without manipulating sending note to server
  // const addNote = (event) => {
  //   event.preventDefault();
  //   console.log("button clicked", event.target[0].value);
  //   const noteObject = {
  //     content: newNote,
  //     date: new Date().toISOString(),
  //     important: Math.random() < 0.5,
  //     id: notes.length + 1,
  //   };

  //   setNotes(notes.concat(noteObject));
  //   setNewNote("");
  // };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    // axios.post("http://localhost:3001/notes", noteObject).then((response) => {
    //   console.log(response);
    //   setNotes(notes.concat(response.data));
    //   setNewNote("");
    // });

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log("event", event);
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          );
        })}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
