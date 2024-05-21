import { useState } from "react";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      anecdote: "If it hurts, do it more often.",
      voteCount: 0,
    },
    {
      anecdote: "Adding manpower to a late software project makes it later!",
      voteCount: 0,
    },
    {
      anecdote:
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      voteCount: 0,
    },
    {
      anecdote:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      voteCount: 0,
    },
    {
      anecdote: "Premature optimization is the root of all evil.",
      voteCount: 0,
    },
    {
      anecdote:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      voteCount: 0,
    },
    {
      anecdote:
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      voteCount: 0,
    },
    {
      anecdote: "The only way to go fast, is to go well.",
      voteCount: 0,
    },
  ]);

  const [selected, setSelected] = useState(0);

  const selectAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const incrementAnecdoteVoteCount = () => {
    const indexOfSelectedIndex = selected;

    const tempAnecdotes = [...anecdotes];

    const tempAnecdotesToCopy = tempAnecdotes.map( (anecdote, index) => {
      if (index === indexOfSelectedIndex) {
        return {...anecdote, voteCount: anecdote.voteCount + 1};
      }
      return anecdote;
    })

    setAnecdotes(tempAnecdotesToCopy);
  }

  return (
    <div>
      <div>{anecdotes[selected].anecdote}</div>
      <div>has {anecdotes[selected].voteCount} votes</div>
      <button onClick={incrementAnecdoteVoteCount}>vote</button>
      <button onClick={selectAnecdote}>next anecdote</button>
      
    </div>
  );
};

export default App;
