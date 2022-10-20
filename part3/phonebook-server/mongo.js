const mongoose = require('mongoose');
// const enviornment = require('dotenv').config();
// console.log(process.env);

// console.log(process.argv);

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.lokkk79.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  //code for adding entry to
  const enteredName = process.argv[3];
  const enteredNumber = process.argv[4];

  mongoose
    .connect(url)
    .then((result) => {
      console.log('database connected');

      const person = new Person({
        name: enteredName,
        number: enteredNumber,
      });

      return person.save();
    })
    .then((result) => {
      console.log('person saved');
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
  return;
}

// code for retrieving all phonebook entries.

mongoose
  .connect(url)
  .then((result) => {
    console.log('database connected for all entries');
    return Person.find({});
  })
  .then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.log('error from all phonebook');
    console.log(err);
  });
