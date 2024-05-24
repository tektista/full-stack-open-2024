const Course = ({ course }) => {
    return (
      <>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    );
  };

  const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
  };
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
      </div>
    );
  };
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };
  
  const Total = ({ parts }) => {
    const total = parts.reduce(
      (sum, currentElement) => sum + currentElement.exercises,
      0
    );
  
    return (
      <p>
        <b>
          {"total of "} {total} {" exercises"}
        </b>
      </p>
    );
  };

  export default Course