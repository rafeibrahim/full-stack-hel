//const http = require('http');

const express = require("express");

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

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'application/json'});
//     response.end(JSON.stringify(notes));
// });

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const note = notes.find((note) => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    return note.id === id;
  });
  console.log(note);

  if (note) {
    response.json(note);
  } else {
    response.statusMessage = `No note found with id ${id}`;
    response.status(404).end();
  }
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

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  console.log(note);
  notes = notes.concat(note);
  response.json(note);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//console.log(`Server running on port ${PORT}`);
