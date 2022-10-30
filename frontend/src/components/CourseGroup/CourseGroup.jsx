import CourseCard from './CourseCard/CourseCard';
import './CourseGroup.scss';

const CourseGroup = ({ courses }) => {
  return (
    <div className="container">
      <div className="row">
        {courses.map((course) => {
          return (
            <div className=" col-md-4 col-sm-12 col-xs-12">
              <CourseCard course={course} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseGroup;
