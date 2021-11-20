import React from 'react';

const PersonForm = (props) => {
    console.log("props from PersonForm", props);
    return (
        <div>
            <form onSubmit={props.onFormSubmit}>
                <div>
                    name: <input onChange={props.onNameChange}/>
                </div>
                <div>
                    number: <input onChange={props.onNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;