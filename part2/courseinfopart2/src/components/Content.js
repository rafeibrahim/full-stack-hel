import React from 'react';
import Part from './Part';
import Total from './Total';

const Content = (props) => {
    console.log("content props", props)
    return (
      <div>
          <h2>{props.course.name}</h2>
          {props.course.parts.map((part) => <Part part={part} key={part.id} />)}
          <Total parts={props.course.parts}/>
      </div>
    )
  };

  export default Content;