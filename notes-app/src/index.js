import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";

//for testing purposes
// const promise = axios.get("http://localhost:3001/notes").then((response) => {
//   const notes = response.data;
//   console.log("notes", notes);
// });
// console.log(promise);

// promise.then ((response) => {
//   console.log(response);
// });

// const promise2 = axios.get("http://localhost:3001/foobar");
// console.log(promise2);

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

//for testing purposes using axios to get notes in index.js and rendering it in App component.
// axios.get('http://localhost:3001/notes').then(response => {
//   const notes = response.data;
//   console.log('notes', notes);
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(<App notes={notes}/>);
// });

// just storing it in root variable and then rendering it.
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App notes={notes} />);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
