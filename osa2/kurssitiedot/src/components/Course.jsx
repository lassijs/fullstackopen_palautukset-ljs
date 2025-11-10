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

const Total = ({total}) => <p>Number of exercises: {total}</p>

const Content = ({parts}) => {
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0)

  return (
    <div>
      {parts.map((part) =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <Total total={total} />
    </div>
  )
}


const Course = ({course}) => {
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </>
  )
}

export default Course