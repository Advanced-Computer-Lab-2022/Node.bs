import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCheck } from '@fortawesome/free-solid-svg-icons';
import './CountryDropdown.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setRegion } from '../../../redux/features/regionSlice';

const CountryDropdown = () => {
  const countries = useSelector((state) => state.region.allCountries);
  const selectedRegion = useSelector((state) => state.region.selectedRegion);
  const dispatch = useDispatch();
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
              <div
                className="dropdown-item country-dropdown"
                onClick={() => {
                  dispatch(setRegion({ selectedRegion: country }));
                }}
              >
                {country.name} - {country.currencyCodes[0]}{' '}
                {country.name === selectedRegion.name ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <></>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CountryDropdown;
