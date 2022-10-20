require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

// morgan.token('id', function getBody (req) {
//   return req.id
// })

morgan.token('body', (req, res) => JSON.stringify(req.body));

const app = express();
app.use(cors());
app.use(express.json());
// not serving front end build for local development
app.use(express.static('build'));
//app.use(morgan('tiny'));
//Using format string of predefined tokens
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
//Using a custom format function
// app.use(
//   morgan((tokens, req, res) =>
//     [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, "content-length"),
//       "-",
//       tokens["response-time"](req, res),
//       "ms",
//       tokens.body(req, res),
//     ].join(" ")
//   )
// );

// let persons = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: 4,
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//   },
// ];

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    const date = new Date().toString();
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    );
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });

  // const id = Number(request.params.id);

  // const person = persons.find((person) => {
  //   //console.log(typeof(id), id, typeof(person.id), id);
  //   return person.id === id;
  // });
  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }
});

app.delete('/api/persons/:id', (request, response, next) => {
  // old code using local persons array.
  // const id = Number(request.params.id);
  // persons = persons.filter((person) => id !== person.id);
  // response.status(204).end();
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: "Name or number missing",
  //   });
  // }

  // const isDuplicateName = persons.find((person) => person.name === body.name);
  // //console.log('isDuplicateName', isDuplicateName);

  // if (isDuplicateName) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  Person.exists({ name: body.name }).then((result) => {
    if (result) {
      console.log('result', result);
      return response.status(400).json({
        error: 'name must be unique',
      });
    }
    console.log('code block after exist check!!');

    const person = new Person({
      //id: Math.floor(Math.random() * 1000),
      name: body.name,
      number: body.number,
    });

    console.log('personToBeSaved', person);

    person
      .save()
      .then((savedPerson) => {
        console.log('savedPerson', savedPerson);
        response.json(savedPerson);
      })
      .catch((error) => {
        next(error);
      });
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
