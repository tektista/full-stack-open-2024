import { useState } from 'react'

const Header = ({title}) => {
  return <h1> {title} </h1>
}

const AppButton = ({name, onClick}) => {
  return <button onClick={onClick}> {name} </button>
}

const Statistic = ({name, count}) => {
  return <div>{name} {count}</div>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <> 
      <Header title={"give feedback"} />
      <AppButton name={"good"} onClick={()=>setGood(good + 1)}></AppButton>
      <AppButton name={"neutral"} onClick={()=>setNeutral(neutral + 1)}></AppButton>
      <AppButton name={"bad"} onClick={()=>setBad(bad + 1)}></AppButton>

      <Header title={"statistics"} />
      <Statistic name={"good"} count={good}/>
      <Statistic name={"neutral"} count={neutral}/>
      <Statistic name={"bad"} count={bad}/>
    </>
  )
}

export default App