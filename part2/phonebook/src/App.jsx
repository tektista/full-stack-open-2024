import { useState } from "react";

const Filter = ({ filter, onChange }) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({
  nameVal,
  numberVal,
  nameOnChange,
  numberOnChange,
  buttonOnClick,
}) => {
  return (
    <>
      <div>
        name: <input value={nameVal} onChange={nameOnChange} />
      </div>
      <div>
        number: <input value={numberVal} onChange={numberOnChange} />
      </div>
      <div>
        <button onClick={buttonOnClick} type="submit">
          add
        </button>
      </div>
    </>
  );
};

const Persons = ({ persons, filter }) => {
  return (
    <>
      {persons.map(
        (person, index) =>
          person.name.toLowerCase().includes(filter.toLowerCase()) && (
            <div key={index}>
              {person.name} {person.number}
            </div>
          )
      )}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    let nameExists = false;

    persons.forEach((person, index) => {
      if (person.name === newName) {
        nameExists = true;
      }
    });

    if (nameExists === false) {
      setPersons(persons.concat(newPerson));
    } else {
      window.alert(`${newName} is already added to the phonebook`);
    }

    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} onChange={handleFilterChange} />
      <h1>add a new</h1>

      <PersonForm
        nameVal={newName}
        numberVal={newNumber}
        nameOnChange={handleNameChange}
        numberOnChange={handleNumberChange}
        buttonOnClick={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  );
};

export default App;
