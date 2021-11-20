import React, { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');
  const [ searchString, setSearchString] = useState('');

  const addName = (event) => {
    event.preventDefault();
    console.log("add btn clicked", event.target);
    const isDuplicate = persons.find((person) => {
        return person.name === newName
    });

    if (isDuplicate) {
      window.alert(`${newName} is already added to phonebook`)
    }else {
      setPersons(persons.concat({name: newName, number: newNumber}));
    }
  };

  const handleNameChange = (event) => {
    console.log("handleNameChange", event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log("handleNumberChange", event.target.value);
    setNewNumber(event.target.value);
  }; 

  const handleSearchChange = (event) => {
    console.log("handleSearchChange", event.target.value);
    setSearchString(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm 
        onFormSubmit={addName} 
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        personsArray={persons} 
        searchString={searchString}/>
    </div>
  );
};

export default App;
