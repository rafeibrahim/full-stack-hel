import React from 'react';

const Filter = (props) => {
    console.log("props from Filter", props)
    return (<div>
        <p>filter shown with <input onChange={props.onChange}/></p>
    </div>     
    );
};

export default Filter;