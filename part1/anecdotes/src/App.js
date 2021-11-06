import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0});
  const [topAnectodeIndex, setTopAnectodeIndex] = useState(0)

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const setAnectodeIndex = () => {
    const randomInt = getRandomInt(7);
    setSelected(randomInt);
  };

  const addVote = () => {
    console.log("votes", votes[selected]);
    const newVotes = {
      ...votes,
      [`${selected}`]: ++votes[selected]
    };
    const topAnectodeIndex = anectodeWithMostVotesIndex(newVotes);
    setTopAnectodeIndex(topAnectodeIndex);
    setVotes(newVotes);
  }

  const anectodeWithMostVotesIndex = (votesObject) => {
    return Object.keys(votesObject).reduce((a, b) => (votesObject[a] > votesObject[b]) ? a : b);
  }

  return (
    <div>
      <h1>Anectode of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" onClick={addVote}/>
      <Button text="next anectode" onClick={setAnectodeIndex}/>
      <h1>Anectode with most votes</h1>
      <p>{anecdotes[topAnectodeIndex]}</p>
      <p>has {votes[topAnectodeIndex]} votes</p>
    </div>
  )
}

export default App