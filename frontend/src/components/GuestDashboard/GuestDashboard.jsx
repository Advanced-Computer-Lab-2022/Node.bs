import React from "react";
import Searchbar from "../Searchbar/Searchbar";
import Filter from "../Filter/Filter";
import CourseGroup from "../CourseGroup/CourseGroup";

const GuestDashboard = ({
  viewedCourses,
  viewTitle,
  loading,
  filterHandler,
  searchHandler,
  corporate,
  accessCourse,
  id,
}) => {
  return (
    <div>
      {" "}
      <div className="container-fluid row ">
        <div className="col-8">
          <div className="row">
            <div className="col-6" style={{ marginBottom: "8%" }}>
              <h2>View our various couses!</h2>
            </div>
            <div className="col-6 row ">
              <Searchbar searchHandler={searchHandler} />
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              <h4>{viewTitle}</h4>
            </div>
            <div className="col-3 text-end ">
              <Filter
                changeHandler={filterHandler}
                type={corporate ? "corporate" : "individual"}
              />
            </div>

            <CourseGroup
              courses={viewedCourses}
              loading={loading}
              editable={false}
              canEnroll={true}
              accessCourse={accessCourse}
              //   type={corporate ? 'corporate' : 'individual'}
              id={id}
              guest={true}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="row">
            <h2>Like to enroll in one of our courses?</h2>
            <button
              className="btn btn-outline-primary mb-5"
              onClick={() => (window.location.href = "/signup")}
            >
              Sign Up
            </button>
          </div>
          <div className="row">
            {" "}
            <h2>Came back to learn more?</h2>
            <button
              className="btn btn-outline-primary mb-5"
              onClick={() => (window.location.href = "/signin")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;
