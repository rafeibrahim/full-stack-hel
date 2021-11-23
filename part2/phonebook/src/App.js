import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {

  const [persons, setPersons] = useState([]);

  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');
  const [ searchString, setSearchString] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('promise fulfilled', response.data)
        setPersons(response.data);
      })
  }, []);

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
