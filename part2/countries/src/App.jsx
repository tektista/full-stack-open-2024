import { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ value, onChange }) => {
  return (
    <>
      <input value={value} onChange={onChange} />
    </>
  );
};

const CountryView = ({ countries, cityWeather, buttonHandler }) => {
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

        {Object.values(country.languages).map((value, index) => {
          return <ul key={index}>{value}</ul>;
        })}

        <img src={country.flags.png} alt="Description of the image" />

        <h2>Weather in {country.capital[0]}</h2>
        {cityWeather ? (
          <>
            <div>temperature {cityWeather.main.temp} °C</div>
            <img
              src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
              alt="Description of the image"
            />
            <div>wind {cityWeather.wind.speed} m/s</div>
          </>
        ) : (
          <div>Loading weather data...</div>
        )}
      </div>
    );
  }

  if (countries.length > 1 && countries.length < 11) {
    return (
      <div>
        {countries.map((country, index) => (
          <div key={index}>
            {country.name.common}{" "}
            <button onClick={() => buttonHandler(country.name.common)}>
              show
            </button>
          </div>
        ))}
      </div>
    );
  }

  return <div>Too many matches, specify another filter</div>;
};

const App = () => {
  const [searchBarValue, setSearchBarValue] = useState("");
  const [countries, setCountries] = useState(null);
  const [cityWeather, setCityWeather] = useState(null);

  const handleSearchBarChange = (event) => {
    setSearchBarValue(event.target.value);
  };

  const getFilteredCountries = (countryList) => {
    return countryList.filter((country) =>
      country.name.common.toLowerCase().includes(searchBarValue.toLowerCase())
    );
  };

  const showCountry = (countryName) => {
    const country = countries.filter(
      (country) => country.name.common === countryName
    );
    setCountries(country);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(getFilteredCountries(response.data));
      });
  }, [searchBarValue]);

  useEffect(() => {
    if (countries && countries.length === 1) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            countries[0].capital[0]
          }&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`
        )
        .then((response) => {
          console.log(response.data);
          setCityWeather(response.data);
        });
    }
  }, [countries]);

  return (
    <>
      <div>
        find countries
        <SearchBar value={searchBarValue} onChange={handleSearchBarChange} />
        <CountryView
          countries={countries}
          cityWeather={cityWeather}
          buttonHandler={showCountry}
        />
      </div>
    </>
  );
};

export default App;
