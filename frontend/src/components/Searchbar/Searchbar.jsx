import React from 'react';
import './Searchbar.scss';
import './../ProfileCard/ProfileCard.scss';
import './../util/CountryDropdown/CountryDropdown.scss';
import { useEffect } from 'react';
import { useState } from 'react';

const Searchbar = ({ searchHandler }) => {
  const [searchText, setSearchText] = useState('');
  const inputHandler = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  useEffect(() => {
    console.log(searchText);
  }, [searchText]);

  return (
    <div className="form-outline row ">
      <div className="col-9">
        <input
          onChange={inputHandler}
          id="searchbar"
          type="text"
          className="form-control form-input"
          placeholder="&#x1F50D; Search courses.."
          style={{ borderRadius: '25px' }}
        />
      </div>
      <div className="col-3">
        <button
          className="btn btn-outline-secondary"
          id="searchButton"
          onClick={(e) => {
            e.preventDefault();
            if (searchText !== '') {
              searchHandler({
                query: {
                  title: searchText,
                  subject: searchText,
                },
                extQuery: {
                  query: {
                    firstName: searchText,
                    lastName: searchText,
                  },
                },
              });
            }
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
