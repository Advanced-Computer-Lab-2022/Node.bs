import React, { useState } from 'react';
import Searchbar from './../../Searchbar/Searchbar';
import CourseGroup from './../../CourseGroup/CourseGroup';
import ProfileCard from '../../ProfileCard/ProfileCard';
import ProgressCard from '../../ProgressCard/ProgressCard';
import Filter from '../../Filter/Filter';
import { Routes, Route } from 'react-router-dom';
import EditCourse from '../EditCourse/EditCourse';

const InstructorDashboard = ({
  viewedCourses,
  viewTitle,
  loading,
  filterHandler,
  searchHandler,
  editable,
  id,
}) => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <div className="container-fluid row ">
            <div className="col-8">
              <div className="row">
                <div className="col-6" style={{ marginBottom: '8%' }}>
                  <h2>Dashboard</h2>
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
                  <Filter changeHandler={filterHandler} type={'instructor'} />
                </div>

                <CourseGroup
                  courses={viewedCourses}
                  loading={loading}
                  editable={editable}
                  type={'instructor'}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <ProfileCard type={'instructor'} id={id} />
              </div>
            </div>
          </div>
        }
      />

      <Route path="editcourse/:id" element={<EditCourse />} />
    </Routes>
  );
};

export default InstructorDashboard;
