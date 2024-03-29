//const http = require('http');
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const Note = require("./models/note");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  // const id = Number(request.params.id);
  // console.log(id);
  // const note = notes.find((note) => {
  //   console.log(note.id, typeof note.id, id, typeof id, note.id === id);
  //   return note.id === id;
  // });
  Note.findById(request.params.id).then(note => {
    response.json(note)
  });
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
    return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  console.log(request.headers);
  console.log(request.get("host"));

  const body = request.body;
  console.log(body);

  if(!body.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  };

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  console.log(note);
  note.save().then((savedNote) => {
    response.json(savedNote);
  })
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

