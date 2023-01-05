import React from 'react';
import { useState } from 'react';
import * as courses from './../../services/CourseService';

import { useEffect } from 'react';
import GuestDashboard from '../GuestDashboard/GuestDashboard';
import CountryDropdown from '../util/CountryDropdown/CountryDropdown';
import SidebarButton from '../Sidebar/SidebarButton/SidebarButton';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Guest = () => {
  const [viewedCourses, setViewedCourses] = useState([]);
  const [viewTitle, setViewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewingEnrolled, setViewingEnrolled] = useState(false);
  const [buttonPressed, setButtonPressed] = useState('');

  const getAllCourses = async (sortByPopularity) => {
    //get all courses

    setViewTitle('Course Catalog');
    setViewedCourses([]);
    setLoading(true);
    try {
      const response = await courses.getAll();
      if (sortByPopularity) {
        const sortedCourses = response.data.sort(
          (c1, c2) => c2.courseViews - c1.courseViews
        );
        console.log(sortedCourses);
        setViewedCourses(sortedCourses);
      } else {
        setViewedCourses(response.data);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const popularCoursesButtonHandler = () => {
    setButtonPressed('Popular');
    getAllCourses(true);
  };

  const filterCourses = async (rating, subjects, maxPrice, minPrice) => {
    if (viewTitle === 'Enrolled Courses') {
      setViewingEnrolled(true);
    } else {
      setViewingEnrolled(false);
    }
    setViewTitle('Filter Results');
    setLoading(true);
    setViewedCourses([]);
    try {
      // const response = await courses.getAll();
      // const data = response.data;
      // console.log(data);
      const filteredCourses = viewedCourses.filter(
        (course) =>
          (rating.includes(course.rating?.toString()) || rating.length === 0) &&
          (subjects.length === 0 || subjects.includes(course.subject)) &&
          ((course.price <= maxPrice && course.price >= minPrice) ||
            (minPrice === 0 && maxPrice === 0))
      );
      setViewedCourses(filteredCourses);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const searchCourses = async (body) => {
    setViewTitle('Search Results');
    setLoading(true);
    setViewedCourses([]);
    setViewingEnrolled(false);
    try {
      const response = await courses.search(body);
      setViewedCourses(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  //   const accessCourse = async (courseId) => {
  //     for (let i in viewedCourses) {
  //       if (viewedCourses[i].course._id === courseId) {
  //         window.location.href += "/course/" + i + "/";
  //       }
  //     }
  //     // console.log(currentlyViewedCourse);
  //     // if (currentlyViewedCourse.course) {
  //     //   window.location.href += '/course';
  //     // }
  //   };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div>
      {' '}
      <div>
        <div className="container-fluid row main px-0" id="traineeMainPage">
          <div className="col-2">
            {' '}
            <SidebarButton
              icon={faThumbsUp}
              label="Popular Courses"
              primary={buttonPressed === 'Popular' ? true : false}
              click={() => popularCoursesButtonHandler()}
            />
            <CountryDropdown />
          </div>
          <div className="col-10">
            <GuestDashboard
              //   corporate={corporate}
              viewTitle={viewTitle}
              //   id={id}
              viewedCourses={viewedCourses}
              //   enrolledCourses={viewingEnrolled ? viewedCourses : []}
              loading={loading}
              filterHandler={filterCourses}
              searchHandler={searchCourses}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guest;
