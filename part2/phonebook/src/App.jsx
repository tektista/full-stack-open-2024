import { useState, useEffect } from "react";
import axios from "axios";
import personsService from "./services/persons";

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

const Persons = ({ persons, filter, onClick }) => {
  return (
    <>
      {persons.map(
        (person, index) =>
          person.name.toLowerCase().includes(filter.toLowerCase()) && (
            <div key={index}>
              {person.name} {person.number}{" "}
              <button onClick={() => onClick(person.id, person.name)}>
                delete
              </button>
            </div>
          )
      )}
    </>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService.remove(id).then((response) => {
        console.log("promise fulfilled");
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
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
    let nameExistsID;

    persons.forEach((person, index) => {
      if (person.name === newName) {
        nameExists = true;
        nameExistsID = person.id;
      }
    });

    if (nameExists === false) {
      personsService.create(newPerson).then((response) => {
        console.log(response);
        setPersons(persons.concat(response.data));
        setErrorMessage(
          `Added ${newName}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personsService.update(nameExistsID, newPerson).then((response) => {
          console.log(response);
          setPersons(
            persons.map((person) =>
              person.id !== nameExistsID ? person : response.data
            )
          );
        });
      }
    }

    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} />

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
      <Persons persons={persons} filter={filter} onClick={deletePerson} />
    </div>
  );
};

export default App;
