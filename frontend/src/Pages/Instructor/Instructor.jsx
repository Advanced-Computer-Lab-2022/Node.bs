import { useEffect } from 'react';
import { useState } from 'react';
import InstructorDashboard from './../../components/InstructorSpecific/InstructorDashboard/InstructorDashboard';
import InstructorSidebar from './../../components/InstructorSpecific/InstructorSidebar/InstructorSidebar';
import * as courses from './../../services/CourseService';

const Instructor = () => {
  const [viewedCourses, setViewedCourses] = useState([]);
  const [viewTitle, setViewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [id, setId] = useState(sessionStorage['id']);

  const getInstructorCourses = async () => {
    setLoading(true);
    setViewedCourses([]);
    setEditable(true);
    setViewTitle('My Courses');
    try {
      const response = await courses.filter(id);
      setViewedCourses(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

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

      const filteredCourses = viewedCourses.filter((course) => {
        let x =
          rating.includes(course.rating?.toString()) || rating.length === 0;

        let y = subjects.length === 0 || subjects.includes(course.subject);

        let z =
          (maxPrice === 0 && minPrice === 0) ||
          (minPrice === 0 &&
            (course.currentDiscount
              ? course.price * (1 - course.currentDiscount.percentage)
              : course.price) <= maxPrice) ||
          (maxPrice == 0 &&
            (course.currentDiscount
              ? course.price * (1 - course.currentDiscount.percentage)
              : course.price) >= minPrice) ||
          ((course.currentDiscount
            ? course.price * (1 - course.currentDiscount.percentage)
            : course.price) >= minPrice &&
            (course.currentDiscount
              ? course.price * (1 - course.currentDiscount.percentage)
              : course.price) <= maxPrice);

        return x && y && z;
      });

      setViewedCourses(filteredCourses);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const searchCourses = async (body) => {
    setViewTitle('Search Results');
    setLoading(true);
    setEditable(false);
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
          instructorId={id}
        />
      </div>
      <div className="col-10">
        <InstructorDashboard
          viewTitle={viewTitle}
          viewedCourses={viewedCourses}
          loading={loading}
          filterHandler={filterCourses}
          searchHandler={searchCourses}
          editable={editable}
          id={id}
        />
      </div>
    </div>
  );
};
export default Instructor;
