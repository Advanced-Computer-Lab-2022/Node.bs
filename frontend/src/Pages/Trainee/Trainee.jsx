import React from "react";
import TraineeDashboard from "./../../components/TraineeSpecific/TraineeDashboard/TraineeDashboard";
import TraineeSidebar from "../../components/TraineeSpecific/TraineeSidebar/TraineeSidebar";
import "./Trainee.scss";
import { useState, useEffect } from "react";
import * as courses from "./../../services/CourseService";
import { Route, Routes } from "react-router-dom";
import ViewCourse from "./../../components/TraineeSpecific/ViewCourse/ViewCourse";

const Trainee = ({ corporate, id }) => {
  const [viewedCourses, setViewedCourses] = useState([]);
  const [viewTitle, setViewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewingEnrolled, setViewingEnrolled] = useState(false);
  // const [currentlyViewedCourse, setCurrentlyViewedCourse] = useState({});

  const getMyCourses = async () => {
    setViewTitle("Enrolled Courses");
    setViewingEnrolled(true);
    setViewedCourses([]);
    setLoading(true);
    try {
      const response = await courses.getMyCourses(corporate, id);
      console.log(response.data);

      setViewedCourses(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const getAllCourses = async (sortByPopularity) => {
    //get all courses
    setViewingEnrolled(false);
    setViewTitle("Course Catalog");
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

  const filterCourses = async (rating, subjects, maxPrice, minPrice) => {
    if (viewTitle === "Enrolled Courses") {
      setViewingEnrolled(true);
    } else {
      setViewingEnrolled(false);
    }
    setViewTitle("Filter Results");
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
    setViewTitle("Search Results");
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
  const accessCourse = async (courseId) => {
    for (let i in viewedCourses) {
      if (viewedCourses[i].course._id === courseId) {
        window.location.href +=
          "/course/" + id + "/" + i + "/" + (corporate ? "1" : "0");
      }
    }
    // console.log(currentlyViewedCourse);
    // if (currentlyViewedCourse.course) {
    //   window.location.href += '/course';
    // }
  };
  // useEffect(() => {
  //   if (currentlyViewedCourse.course) {
  //     console.log(currentlyViewedCourse);
  //     window.location.href += '/course';
  //   }
  // }, [currentlyViewedCourse]);

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <Routes>
      <Route
        path=""
        element={
          <div>
            <div className="container-fluid row main px-0" id="traineeMainPage">
              <div className="col-2">
                <TraineeSidebar
                  getCourseCatalog={getAllCourses}
                  getMyCourses={getMyCourses}
                  id={id}
                  corporate={corporate}
                />
              </div>
              <div className="col-10">
                <TraineeDashboard
                  corporate={corporate}
                  viewTitle={viewTitle}
                  id={id}
                  viewedCourses={
                    viewingEnrolled
                      ? viewedCourses.map((registeredCourse) => {
                          return registeredCourse.course;
                        })
                      : viewedCourses
                  }
                  enrolledCourses={viewingEnrolled ? viewedCourses : []}
                  loading={loading}
                  filterHandler={filterCourses}
                  searchHandler={searchCourses}
                  accessCourse={viewingEnrolled ? accessCourse : undefined}
                />
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="/course/:id/:registeredCourseId/:corporate"
        element={
          <ViewCourse
            // registeredCourse={currentlyViewedCourse}
            corporate={corporate}
            id={id}
          />
        }
      />
    </Routes>
  );
};
export default Trainee;
