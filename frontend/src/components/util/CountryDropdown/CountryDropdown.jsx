import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './CountryDropdown.scss';

const timer = (ms) => new Promise((res) => setTimeout(res, ms));
const CountryDropdown = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async (offset) => {
      const options = {
        method: 'GET',
        url:
          'https://wft-geo-db.p.rapidapi.com/v1/geo/countries?offset=' +
          offset +
          '&limit=10',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_COUNTRY_API_KEY,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      };

      for (let i = 0; i <= 190; i += 10) {
        offset = i;
        let url =
          'https://wft-geo-db.p.rapidapi.com/v1/geo/countries?offset=' +
          offset +
          '&limit=10';
        options.url = url;
        const response = await axios.request(options);
        setCountries([...countries, response.data.data]);
        await timer(1000);
        if (i == 190) {
          console.log(countries);
        }
      }
    };

    fetchCountries(0);
  }, []);

  return (
    <div className="dropdown">
      <button
        className=" dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <FontAwesomeIcon icon={faGlobe} />
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {countries?.map((country) => {
          return (
            <li key={country.name}>
              <a className="dropdown-item" href="abc">
                {country.name} - {country.currencyCodes[0]}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CountryDropdown;
