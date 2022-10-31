import React from 'react';
import './Searchbar.scss';
import './../ProfileCard/ProfileCard.scss';
import './../util/CountryDropdown/CountryDropdown.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCourses, setAction } from '../../redux/features/resultSlice';

function Searchbar() {
  const [searchText, setSearchText] = useState('');
  const inputHandler = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(searchText);
  }, [searchText]);

  const handleSearch = () => {
    if (searchText !== '') {
      dispatch(
        searchCourses({
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
        })
      );
      dispatch(setAction('search'));
    }
  };
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
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
