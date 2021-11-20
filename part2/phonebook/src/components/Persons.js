import React from 'react';

const Persons = (props) => {
    console.log("props from Persons", props);
    return (
        <div>
            {(props.searchString === "")?
                props.personsArray.map((person) => {
                    return <p key={person.id}>{person.name} {person.number}</p>
                })
                :
                props.personsArray.filter((person) => {
                    return person.name.toLowerCase().includes(props.searchString.toLowerCase());
                }).map((person) => {
                    return <p key={person.id}>{person.name} {person.number}</p>
            })}
        </div>
    );
}

export default Persons;