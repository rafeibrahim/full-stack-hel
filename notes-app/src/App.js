// added comment for 12JUl2022 16:10
// second comment for 12JUL2022 16:31

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Note from "./components/Note";

const App = (props) => {
  //In order to get our page to update when new notes are added 
  //it's best to store the notes in the App component's state
  const [newNote, setNewNote] = useState('a new note...')
  const [notes, setNotes ] = useState(props.notes);
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target[0].value);
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))
    setNewNote('')
  };
  

  const handleNoteChange = (event) => {
    console.log('event', event);
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
