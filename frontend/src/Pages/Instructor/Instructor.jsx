import { useEffect } from 'react';
import { useState } from 'react';
import InstructorDashboard from '../../new components/InstructorDashboard/InstructorDashboard';
import InstructorSidebar from '../../new components/InstructorSidebar/InstructorSidebar';
import * as courses from './../../services/CourseService';

const Instructor = ({ instructorId }) => {
  const [viewedCourses, setViewedCourses] = useState([]);
  const [viewTitle, setViewTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const getInstructorCourses = async () => {
    setLoading(true);
    setViewedCourses([]);
    setViewTitle('My Courses');
    try {
      const response = await courses.filter(instructorId);
      setViewedCourses(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

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

  useEffect(() => {
    getAllCourses();
  }, []);

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

  return (
    <div className="container-fluid row main px-0" id="instructorMainPage">
      <div className="col-2">
        <InstructorSidebar
          getCourseCatalog={getAllCourses}
          showInstructorCourses={getInstructorCourses}
        />
      </div>
      <div className="col-10">
        <InstructorDashboard
          id={instructorId}
          viewTitle={viewTitle}
          viewedCourses={viewedCourses}
          loading={loading}
          filterHandler={filterCourses}
          searchHandler={searchCourses}
        />
      </div>
    </div>
  );
};
export default Instructor;
