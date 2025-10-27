const Header = (course) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = (part) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = (content) => {
  return (
    <div>
      <Part name={content.part[0]} exercises={content.exercises[0]} />
      <Part name={content.part[1]} exercises={content.exercises[1]} />
      <Part name={content.part[2]} exercises={content.exercises[2]} />
    </div>
  )
}

const Total = (total) => {
  return (
    <p>Number of exercises {total.count}</p>
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
      <Header name={course}/>

      <Content part={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />

      <Total count={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App