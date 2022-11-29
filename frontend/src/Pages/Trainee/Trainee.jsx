import React from 'react';
import TraineeDashboard from './../../components/TraineeSpecific/TraineeDashboard/TraineeDashboard';
import TraineeSidebar from '../../components/TraineeSpecific/TraineeSidebar/TraineeSidebar';
import './Trainee.scss';
import { useState, useEffect } from 'react';
import * as courses from './../../services/CourseService';

const Trainee = ({ corporate }) => {
  const [viewedCourses, setViewedCourses] = useState([]);
  const [viewTitle, setViewTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const getAllCourses = async () => {
    //get all courses
    setViewTitle('Course Catalog');
    setViewedCourses([]);
    setLoading(true);
    try {
      const response = await courses.getAll();
      setViewedCourses(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const filterCourses = async (rating, subjects, maxPrice, minPrice) => {
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
    try {
      const response = await courses.search(body);
      setViewedCourses(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div>
      <div className="container-fluid row main px-0" id="traineeMainPage">
        <div className="col-2">
          <TraineeSidebar getCourseCatalog={getAllCourses} />
        </div>
        <div className="col-10">
          <TraineeDashboard
            corporate={corporate}
            viewTitle={viewTitle}
            viewedCourses={viewedCourses}
            loading={loading}
            filterHandler={filterCourses}
            searchHandler={searchCourses}
          />
        </div>
      </div>
    </div>
  );
};
export default Trainee;
