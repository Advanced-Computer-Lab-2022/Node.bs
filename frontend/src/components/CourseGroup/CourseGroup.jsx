import CourseCard from './CourseCard/CourseCard';
import './CourseGroup.scss';
// import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

const CourseGroup = ({
  courses,
  loading,
  editable,
  accessCourse,
  type,
  id,
  guest
}) => {
  // const currency = useSelector(
  //   (state) => state.region.selectedRegion.currencyCodes[0]
  // );
  return (
    <div className="container card-group" id="courseGroup">
      {/* <div className="row" id="courseGroup"> */}
      {!loading && courses.length === 0 && <h3>No results found.</h3>}
      {loading && (
        <h3>
          <ReactLoading color="black" type="spin" />
        </h3>
      )}
      {/*className=" col-md-4 col-sm-12 col-xs-12"*/}
      {courses.map((course) => {
        return (
          <div className="mx-1">
            <CourseCard
              course={course}
              editable={editable}
              accessCourse={accessCourse}
              type={type}
              id={id}
              guest = {guest}
            />
          </div>
        );
      })}
    </div>
    // </div>
  );
};

export default CourseGroup;
