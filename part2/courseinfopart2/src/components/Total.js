import React from 'react';

const Total = (props) => {
    console.log("props Total", props);
    const sum = props.parts.reduce((a, b) => {
        console.log("total reduce a, b", a, b);
        return a + b.exercises;
    }, 0);
    return (
        <h3>total of {sum} exercises</h3>
    )
}

export default Total;