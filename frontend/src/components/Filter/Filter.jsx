import React from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../util/CountryDropdown/CountryDropdown.scss";
import "./Filter.scss";
import { useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { useSelector } from "react-redux";

function Filter() {
  const allSubjects = useSelector((state) => state.subjects.all);
  const [subjects, setSubjects] = useState([]);
  const [rating, setRating] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const userInfo = useSelector((state) => state.user);

  //price will be min - max

  return (
    <div className="col-2">
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
                onKeyPressFn={function noRefCheck() {}}
                onRemove={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={function noRefCheck() {}}
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
                onKeyPressFn={function noRefCheck() {}}
                onRemove={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={function noRefCheck() {}}
                options={["1", "2", "3", "4", "5"]}
                placeholder="select rating(s)"
                selectedValues={{}}
                showCheckbox
                style={{}}
              />
            </div>
          </li>
          {userInfo.type !== "corporate" ? (
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
                    />
                  </div>
                  <div className="col-5">
                    <input
                      className="filter-input"
                      type="number"
                      name=""
                      id=""
                      placeholder="max"
                    />
                  </div>
                </div>
              </div>
            </li>
          ) : (
            <></>
          )}
          <li>
            <div className="filter-item row ">
              <button
                className="btn btn-primary col-12"
                style={{ marginTop: "3%" }}
              >
                Apply Filters
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filter;
