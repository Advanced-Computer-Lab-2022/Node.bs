import React from 'react';
import Searchbar from './../../components/Searchbar/Searchbar';
import CourseGroup from './../../components/CourseGroup/CourseGroup';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProgressCard from '../../components/ProgressCard/ProgressCard';
import Filter from '../../components/Filter/Filter';

const InstructorDashboard = ({
  id,
  viewedCourses,
  viewTitle,
  loading,
  filterHandler,
  searchHandler,
}) => {
  return (
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

          <CourseGroup courses={viewedCourses} loading={loading} />
          {console.log(viewedCourses)}
        </div>
      </div>
      <div className="col-4">
        <div className="row">
          <ProfileCard />
        </div>
        <div className="row">
          <ProgressCard />
          <ProgressCard />
          <ProgressCard />
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
