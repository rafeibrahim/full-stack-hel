import React from 'react';
import ReactDOM from 'react-dom';

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
  return (
    <div>
      <p>Number of exercises {props.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[{
          name: part1,
          exercises: exercises1
        },
        {
          name: part2,
          exercises: exercises2
        },
        {
          name: part3,
          exercises: exercises3
        }
      ]}/>
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

