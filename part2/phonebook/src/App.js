import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';
import personService from './services/persons-fetcher';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchString, setSearchString] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    console.log('effect');
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   console.log("promise fulfilled", response.data);
    //   setPersons(response.data);
    // });
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      //console.log('initialPersons', initialPersons);
    });
  }, []);

  const deletePersonHandler = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(
            persons.filter((person) => {
              return person.id !== id;
            })
          );
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  // must get a fitting name like add Person
  const addName = (event) => {
    event.preventDefault();
    console.log('add btn clicked', event.target);

    const personObjectToBeAdded = {
      name: newName,
      number: newNumber,
    };

    const matchingPerson = persons.find((person) => {
      return person.name === newName;
    });

    if (matchingPerson) {
      //window.alert(`${newName} is already added to phonebook`);
      if (
        window.confirm(
          `${matchingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        console.log('update orders received!!!');
        personService
          .update(matchingPerson.id, personObjectToBeAdded)
          .then((returnedPersonObject) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPersonObject.id
                  ? person
                  : returnedPersonObject
              )
            );
            setSuccessMessage(`Updated ${returnedPersonObject.name}'s number`);
            setNewName('');
            setNewNumber('');
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error.response.data.error);
          });
      }
    } else {
      // axios
      //   .post("http://localhost:3001/persons", personObject)
      //   .then((response) => setPersons(persons.concat(response.data)));
      personService
        .create(personObjectToBeAdded)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage(`Added ${returnedPerson.name}`);
          setNewName('');
          setNewNumber('');
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    console.log('handleNameChange', event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log('handleNumberChange', event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    console.log('handleSearchChange', event.target.value);
    setSearchString(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={'error'} />
      <Notification message={successMessage} type={'success'} />
      <Filter onChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        onFormSubmit={addName}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        name={newName}
        number={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        personsArray={persons}
        searchString={searchString}
        deletePersonHandler={deletePersonHandler}
      />
    </div>
  );
};

export default App;
