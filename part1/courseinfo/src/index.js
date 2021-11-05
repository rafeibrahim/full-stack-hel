import React from 'react';
import ReactDOM from 'react-dom';

//added comments to check repository working with remote github

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  console.log(props.parts)
  return (
    <div>
      {/*solution if number of parts is unknown */}
      {/* {props.parts.map((part, index) => <Part key={index} name={part.name} exercises={part.exercises}/>)} */}
      {/* //solution as per example given in 1.2 */}
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  const {name, exercises} = props
  return (
    <p>{name} {exercises}</p>
  )
}

const Total = (props) => {
  const [part1, part2, part3] = props.parts
  const totalExercises = part1.exercises + part2.exercises + part3.exercises
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

