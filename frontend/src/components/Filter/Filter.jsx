import React from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './../util/CountryDropdown/CountryDropdown.scss';
import './Filter.scss';
import { useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

function Filter({ type, changeHandler }) {
  // let allCourses = useSelector((state) => state.courses.all);
  // let filteredCourses = useSelector((state) => state.courses.results);
  const [allSubjects] = useState([
    'Computer Science',
    'Language',
    'Economics',
    'Accounting',
    'Mathematics',
    'Programming',
  ]);
  const [subjects, setSubjects] = useState([]);
  const [rating, setRating] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // results;

  //change handlers
  // const handleSubmit = (e) => {
  //   if (minPrice <= maxPrice) {
  //     if (type !== 'instructor') {
  //       e.preventDefault();
  //       const newFiltered = allCourses.filter((course) => {
  //         return (
  //           (rating.includes(course.rating.toString()) ||
  //             rating.length === 0) &&
  //           (subjects.length === 0 || subjects.includes(course.subject)) &&
  //           ((course.price <= maxPrice && course.price >= minPrice) ||
  //             (minPrice === 0 && maxPrice === 0))
  //         );
  //       });
  //       console.log(rating, subjects, maxPrice, minPrice);
  //       console.log(newFiltered);
  //       dispatch(setFilteredCourses(newFiltered));
  //       dispatch(setAction('filter'));
  //     } else {
  //       dispatch(
  //         searchCourses({
  //           query: {
  //             title: 'bhadsujbaoubobadohbdapsbdsidash',
  //             subject: 'jkbiuvacasbvuocbvoisboiasbab',
  //           },
  //           extQuery: {
  //             query: {
  //               firstName: userInfo.user.firstName,
  //               lastName: userInfo.user.lastName,
  //             },
  //           },
  //         })
  //       );
  //       const newFiltered = filteredCourses.filter((course) => {
  //         return (
  //           (rating.includes(course.rating.toString()) ||
  //             rating.length === 0) &&
  //           (subjects.length === 0 || subjects.includes(course.subject)) &&
  //           ((course.price <= maxPrice && course.price >= minPrice) ||
  //             (minPrice === 0 && maxPrice === 0))
  //         );
  //       });

  //       dispatch(setFilteredCourses(newFiltered));
  //       dispatch(setAction('InstructorFilter'));
  //     }
  //   }
  // };
  //price will be min - max

  return (
    // <div className="col-2">
    <div className="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        data-bs-auto-close="false"
        aria-expanded="false"
      >
        <FontAwesomeIcon
          icon={faFilter}
          className="edit-icon"
          id="filter-icon"
        />
      </button>
      <ul
        class="dropdown-menu dropdown-menu-end "
        aria-labelledby="dropdownMenuClickable"
      >
        <li>
          <div className="filter-item">
            <h6>Subject</h6>

            <Multiselect
              displayValue=""
              isObject={false}
              onRemove={(list) => setSubjects(list)}
              onSelect={(list) => setSubjects(list)}
              options={allSubjects}
              placeholder="select subject(s)"
              selectedValues={{}}
              showCheckbox
              style={{}}
            />
          </div>
        </li>
        <li>
          <div className="filter-item">
            <h6>Rating</h6>

            <Multiselect
              displayValue=""
              isObject={false}
              onRemove={(list) => setRating(list)}
              onSelect={(list) => setRating(list)}
              options={['1', '2', '3', '4', '5']}
              placeholder="select rating(s)"
              selectedValues={{}}
              showCheckbox
              style={{}}
            />
          </div>
        </li>
        {type !== 'corporate' ? (
          <li>
            <div className="filter-item">
              <h6>Price</h6>
              <div className="row justify-content-between">
                <div className="col-5">
                  <input
                    className="filter-input"
                    type="number"
                    name=""
                    id=""
                    placeholder="min"
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="col-5">
                  <input
                    className="filter-input"
                    type="number"
                    name=""
                    id=""
                    placeholder="max"
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </li>
        ) : (
          <></>
        )}
        <li>
          <div className="filter-item row justify-content-center">
            <button
              className="btn btn-primary col-8"
              style={{ marginTop: '3%' }}
              onClick={() => {
                if (type !== 'corporate')
                  changeHandler(rating, subjects, maxPrice, minPrice);
                else changeHandler(rating, subjects, 0, 0);
              }}
            >
              Apply Filters
            </button>
          </div>
        </li>
      </ul>
    </div>
    // </div>
  );
}

export default Filter;
