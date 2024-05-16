import { useState } from "react";

const Header = ({ title }) => {
  return <h1> {title} </h1>;
};

const AppButton = ({ name, onClick }) => {
  return <button onClick={onClick}> {name} </button>;
};

const Statistic = ({ name, count }) => {
  return name === "positive" ? (
    <div>
      {name} {count} {"%"}
    </div>
  ) : (
    <div>
      {name} {count}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0.0);
  const [positive, setPositive] = useState(0.0);
  const [score, setScore] = useState([]);

  const incrementGood = () => {
    let tempGood = good + 1;
    setGood(tempGood);

    let tempTotal = total + 1;
    setTotal(tempTotal);

    addScore(1, tempTotal);
  };

  const incrementNeutral = () => {
    let tempNeutral = neutral + 1;
    setNeutral(tempNeutral);

    let tempTotal = total + 1;
    setTotal(tempTotal);

    addScore(0, tempTotal);
  };

  const incrementBad = () => {
    let tempBad = bad + 1;
    setBad(tempBad);

    let tempTotal = total + 1;
    setTotal(tempTotal);

    addScore(-1, tempTotal);
  };

  const addScore = (scoreInput, total) => {
    const tempScore = score.concat(scoreInput);
    setScore(tempScore);

    setAverage(calculateAverage(tempScore));

    setPositive(calculatePositive(tempScore));
  };

  const calculateAverage = (array) => {
    let elementCount = array.length;
    let totalScore = 0;

    array.forEach((element, index) => {
      totalScore = totalScore + element;
    });

    return totalScore / elementCount;
  };

  const calculatePositive = (array) => {
    let elementCount = array.length;
    let positiveScoreCount = 0;

    array.forEach((element, index) => {
      if (element === 1) {
        positiveScoreCount++;
      }
    });

    return (positiveScoreCount / elementCount) * 100;
  };

  return (
    <>
      <Header title={"give feedback"} />
      <AppButton name={"good"} onClick={incrementGood}></AppButton>
      <AppButton name={"neutral"} onClick={incrementNeutral}></AppButton>
      <AppButton name={"bad"} onClick={incrementBad}></AppButton>

      <Header title={"statistics"} />
      {total > 0 ? (
        <>
          <Statistic name={"good"} count={good} />
          <Statistic name={"neutral"} count={neutral} />
          <Statistic name={"bad"} count={bad} />
          <Statistic name={"total"} count={total} />
          <Statistic name={"average"} count={average} />
          <Statistic name={"positive"} count={positive} />
        </>
      ) : (
        <>
          <div>No feedback given</div>
        </>
      )}
    </>
  );
};

export default App;
