import './CourseCard.scss';
import AvatarGrouping from '../../util/AvatarGroup/AvatarGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CourseCard = ({ course }) => {
  // https://picsum.photos/160/100/
  return (
    <div className="card my-2">
      <img
        src="https://img.freepik.com/free-psd/3d-rendering-ui-icon_23-2149182280.jpg?w=1380&t=st=1666956873~exp=1666957473~hmac=d6871289272b36f6fb1d1d99fa2195bf8599b686ed7e2d86419e8bf371d03147"
        className="card-img-top"
        alt=""
        height={180}
      />
      <div className="card-body container pt-0 pb-2 px-3 ">
        <div className="row mb-3 ">
          <h3 className="card-title font font-primary mb-0 ">{course.title}</h3>
          <p className="card-text font font-secondary">
            {course.subtitles.length} Sections
          </p>
        </div>
        <br />
        <div className="row my-0 py-0">
          <div className="col-md-9 item-wrapper">
            <AvatarGrouping instructors={course.instructors} />
          </div>
          <div className="arrow text-end col-md-3 ">
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
