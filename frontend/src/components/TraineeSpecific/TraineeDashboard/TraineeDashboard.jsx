import React from 'react';
import Searchbar from '../../Searchbar/Searchbar';
import Filter from '../../Filter/Filter';
import CourseGroup from '../../CourseGroup/CourseGroup';
import ProfileCard from '../../ProfileCard/ProfileCard';

const TraineeDashboard = ({
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
            <Filter
              changeHandler={filterHandler}
              type={corporate ? 'corporate' : 'individual'}
            />
          </div>

          <CourseGroup
            courses={viewedCourses}
            loading={loading}
            editable={false}
            canEnroll={true}
            accessCourse={accessCourse}
            type={corporate ? 'corporate' : 'individual'}
            id={id}
          />
        </div>
      </div>
      <div className="col-4">
        <div className="row">
          <ProfileCard id={id} type={corporate ? 'corporate' : 'individual'} />
        </div>
      </div>
    </div>
  );
};

export default TraineeDashboard;
