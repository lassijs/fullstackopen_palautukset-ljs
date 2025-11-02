import { useState } from 'react'


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({stats}) => {
  const {good, neutral, bad, total} = stats

  const average = (good - bad) / total
  const positivity = new Intl.NumberFormat('default', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(good / total)

  if (total === 0) {
    return (
      <>
        <h2>Statistics</h2>

        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positivity" value={positivity} />
        </tbody>
      </table>
    </>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
    setTotal(newGood + neutral + bad)
  }
  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    setTotal(good + newNeutral + bad)
  }
  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    setTotal(good + neutral + newBad)
  }

  return (
    <div>
      <h1>How was your experience today?</h1>

      <Button onClick={handleGood} text='Good' />
      <Button onClick={handleNeutral} text='Neutral' />
      <Button onClick={handleBad} text='Bad' />

      <Statistics stats={{good: good, neutral: neutral, bad: bad, total: total}} />
    </div>
  )
}

export default App