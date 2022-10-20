import React from "react";
import Person from "./Person";

const Persons = (props) => {
  console.log("props from Persons", props);
  return (
    <div>
      {props.searchString === ""
        ? props.personsArray.map((person) => {
            return (
              <Person
                key={person.id}
                id={person.id}
                name={person.name}
                number={person.number}
                deletePersonHandler={props.deletePersonHandler}
              />
            );
          })
        : props.personsArray
            .filter((person) => {
              return person.name
                .toLowerCase()
                .includes(props.searchString.toLowerCase());
            })
            .map((person) => {
              return (
                <Person
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  number={person.number}
                  deletePersonHandler={props.deletePersonHandler}
                />
              );
            })}
    </div>
  );
};

export default Persons;
