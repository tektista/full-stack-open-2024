import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
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
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button onClick={addPerson} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <div key={index}>{person.name} {person.number}</div>
      ))}
    </div>
  );
};

export default App;
