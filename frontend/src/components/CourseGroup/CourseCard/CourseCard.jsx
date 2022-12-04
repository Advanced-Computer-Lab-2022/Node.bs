import './CourseCard.scss';
import AvatarGrouping from '../../util/AvatarGroup/AvatarGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Rating from 'react-star-rating-lite';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CoursePreview from '../../CoursePreview/CoursePreview';

<<<<<<< HEAD
const CourseCard = ({ course, editable, canEnroll }) => {
=======
const CourseCard = ({ course, editable, accessCourse }) => {
>>>>>>> mezmez
  const userInfo = useSelector((state) => state.user);
  const currency = useSelector(
    (state) => state.region.selectedRegion.currencyCodes[0]
  );
  const [exRate, setExRate] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (currency !== 'USD') {
      const options = {
        method: 'GET',
        url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest',
        params: { from: 'USD', to: currency },
        headers: {
          'X-RapidAPI-Key':
            'f72163360cmsh09ef48913e0dc1ep173f30jsn2d648e344719',
          'X-RapidAPI-Host':
            'currency-conversion-and-exchange-rates.p.rapidapi.com',
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setExRate(response.data.rates[currency]);
          console.log(exRate);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      setExRate(1);
    }
  }, [currency, exRate]);

  // https://picsum.photos/160/100/
  return (
    <div className="card my-1" id="course-card">
      <img
        src="https://img.freepik.com/free-psd/3d-rendering-ui-icon_23-2149182280.jpg?w=1380&t=st=1666956873~exp=1666957473~hmac=d6871289272b36f6fb1d1d99fa2195bf8599b686ed7e2d86419e8bf371d03147"
        className={'card-img-top ' + (accessCourse ? 'hover' : '')}
        alt=""
        height={180}
        onClick={() => {
          if (accessCourse) accessCourse(course._id);
        }}
      />
      <div className="card-body container pt-0 pb-2 px-3 ">
        <div className="row mb-3 ">
          <h3
            onClick={() => {
              if (accessCourse) accessCourse(course._id);
            }}
            className={
              'card-title font font-primary mb-0' +
              (accessCourse ? 'hover' : '')
            }
          >
            {course?.title}
          </h3>
          <div className="col-5 p-0 px-2">
            <p className="card-text font font-secondary m-0">
              {course?.totalHours} Hours
            </p>
          </div>
          {userInfo.type !== 'corporate' ? (
            <div className="col-7 text-end p-0">
              <p id="currency">
                {course.price === 0
                  ? 'FREE'
                  : course.currentDiscount &&
                    new Date(course.currentDiscount?.expiryDate) >
                      new Date().getTime()
                  ? (
                      course.price *
                      (1 - course?.currentDiscount?.percentage) *
                      exRate
                    ).toFixed(2)
                  : (course.price * exRate).toFixed(2)}
                {' ' + currency}
              </p>
            </div>
          ) : (
            <></>
          )}
          <div className="col-12 text-center">
            <Rating readonly value={course.rating} weight={'22'} />
          </div>
        </div>
        {/* <br /> */}
        <div className="row my-0 py-0">
          <div className="col-md-9 item-wrapper">
            <AvatarGrouping instructors={course?.instructors} />
          </div>
          <div className="arrow text-end col-md-3 ">
            <button
              type="button"
              className="btn btn-primary"
              id="card-button"
              onClick={() => setIsOpen(true)}
              // data-bs-toggle="modal"
              // data-bs-target={'#' + course.title.split(' ').join('')}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>

      <CoursePreview
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        course={course}
        currency={currency}
        exRate={exRate}
        editable={editable}
        canEnroll = {canEnroll}
      />
    </div>
  );
};

export default CourseCard;
