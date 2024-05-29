import { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ value, onChange }) => {
  return (
    <>
      <input value={value} onChange={onChange} />
    </>
  );
};

const CountryView = ({ countries, buttonHandler }) => {
  if (!countries) {
    return null;
  }

  if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]} </div>
        <div>area {country.area}</div>
        <h2>languages:</h2>

        {Object.values(country.languages).map((value) => {
          return <ul>{value}</ul>;
        })}

        <img src={country.flags.png} alt="Description of the image" />
      </div>
    );
  }

  if (countries.length > 1 && countries.length < 11) {
    return (
      <div>
        {countries.map((country, index) => (
          <div key={index}>{country.name.common} <button onClick={() => buttonHandler(country.name.common)}>show</button></div>
        ))}
      </div>
    );
  }

  return <div>Too many matches, specify another filter</div>;
};

const App = () => {
  //on search bar change, filter the the countries received from the request note: where to store this

  const [searchBarValue, setSearchBarValue] = useState("");
  const [countries, setCountries] = useState(null);

  const handleSearchBarChange = (event) => {
    setSearchBarValue(event.target.value);
  };

  const getFilteredCountries = (countryList) => {
    const filteredCountryList = countryList.filter((country) =>
      country.name.common.toLowerCase().includes(searchBarValue.toLowerCase())
    );
    return filteredCountryList;
  };

  const showCountry = (countryName) => {
    const country = countries.filter(country => country.name.common === countryName )
    setCountries(country);
  }

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(getFilteredCountries(response.data));
      });
  }, [searchBarValue]);

  return (
    <>
      <div>
        find countries
        <SearchBar value={searchBarValue} onChange={handleSearchBarChange} />
        <CountryView countries={countries} buttonHandler={showCountry} />
      </div>
    </>
  );
};

export default App;
