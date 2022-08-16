import React from 'react';

const PersonForm = (props) => {
    console.log("props from PersonForm", props);
    return (
        <div>
            <form onSubmit={props.onFormSubmit}>
                <div>
                    name: <input onChange={props.onNameChange} value={props.name}/>
                </div>
                <div>
                    number: <input onChange={props.onNumberChange} value={props.number} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;