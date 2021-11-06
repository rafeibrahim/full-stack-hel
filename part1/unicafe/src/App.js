import React, { useState } from 'react'

const StatisticLine = ({text, value}) => {
    return(
        <>
            <td>{text}</td>
            <td>{value}</td>
        </>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = good / all * 100
    return (
        <div>
            {(all > 0)
                ? <table>
                    <tbody>
                        <tr><StatisticLine text="good" value ={good} /></tr>
                        <tr><StatisticLine text="neutral" value ={neutral} /></tr>
                        <tr><StatisticLine text="bad" value ={bad} /></tr>
                        <tr><StatisticLine text="all" value ={all} /></tr>
                        <tr><StatisticLine text="average" value ={average} /></tr>
                        <tr><StatisticLine text="positive" value ={positive} /></tr>
                    </tbody>    
                  </table>
                : <div>
                    <p>No feedback given </p>
                  </div>
            }   
        </div>
    )
  }

const Button = (props) => {
    return (
      <button onClick={props.onClick}>
        {props.text}
      </button>
    )
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good + 1);
  const increaseNeutralByOne = () => setNeutral(neutral + 1);
  const increaseBadByOne = () => setBad(bad + 1);

  return (
    <div>
        <h1>give feedback</h1>
        <Button onClick={increaseGoodByOne} text="good"/>
        <Button onClick={increaseNeutralByOne} text="neutral"/>
        <Button onClick={increaseBadByOne} text="bad"/>
        <h1>statistics</h1>
        <Statistics
            good={good}
            neutral={neutral}
            bad={bad} 
        />
    </div>
  )
}

export default App