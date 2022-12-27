import React from 'react';
import SidebarButton from '../../Sidebar/SidebarButton/SidebarButton';
import {
  faDoorOpen,
  faLaptopHouse,
  faCog,
  faClipboard,
  faMedal,
  faChalkboardTeacher,
  faBook,
  faCheck,
  faStar,
  faArrowTurnDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountryDropdown from './../../util/CountryDropdown/CountryDropdown';
import AddCourse from '../AddCourse/AddCourse';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  getInstructorById,
  getReviews,
} from '../../../services/InstructorService';
import ReactModal from 'react-modal';
import AcceptTerms from '../AcceptTerms/AcceptTerms';
import InstructorReviews from '../../InstructorReviews/InstructorReviews';
import { resetPassword } from '../../../services/AdminService';

const InstructorSidebar = ({
  showInstructorCourses,
  getCourseCatalog,
  instructorId,
}) => {
  const [allReviews, setAllReviews] = useState({});
  const getInstructorReviews = async () => {
    const returnedReviews = await getReviews({ instructorId: instructorId });
    setAllReviews(returnedReviews);
  };
  const dashboardButtonHandler = () => {
    getCourseCatalog();
    setButtonPressed('Dashboard');
  };
  const myCoursesButtonHandler = () => {
    showInstructorCourses();
    setButtonPressed('My Courses');
  };
  const sendMeAnEmail = async () => {
    // console.log(instructorId);
    const returned = await resetPassword(instructorId);
    console.log(returned);
  };
  const [buttonPressed, setButtonPressed] = useState('Dashboard');
  const [showAccept, setShowAccept] = useState(false);
  const [notAccepted, setNotAccepted] = useState(true);
  useEffect(() => {
    const checkAcceptance = async () => {
      const response = await getInstructorById(instructorId);
      if (response.data.accepted) {
        setNotAccepted(false);
      }
    };
    checkAcceptance();
  }, []);
  const handleAccept = () => {};
  return (
    <div class="container-fluid sidebar-container" id="inverted-color">
      <div className="logo">
        <h6 className="brand">
          <FontAwesomeIcon icon={faDoorOpen} /> CourseIndoors
        </h6>
      </div>
      <div className="sidebarButtonContainer">
        <SidebarButton
          click={dashboardButtonHandler}
          icon={faLaptopHouse}
          label="Dashboard"
          primary={buttonPressed === 'Dashboard' ? true : false}
        />
        <SidebarButton
          primary={buttonPressed === 'Certificates' ? true : false}
          icon={faMedal}
          label="Certificates"
          click={() => setButtonPressed('Certificates')}
        />
        <SidebarButton
          primary={buttonPressed === 'Tests' ? true : false}
          icon={faClipboard}
          label="Tests"
          click={() => setButtonPressed('Tests')}
        />
        <SidebarButton
          primary={buttonPressed === 'Settings' ? true : false}
          icon={faCog}
          label="Settings"
          click={() => setButtonPressed('Settings')}
        />
        <SidebarButton
          primary={buttonPressed === 'Add Course' ? true : false}
          icon={faBook}
          label="Add Course"
          toBeAdded="Course"
          click={() => setButtonPressed('Add Course')}
        />
        <AddCourse InstructorId={instructorId} />
        <SidebarButton
          primary={buttonPressed === 'My Courses' ? true : false}
          icon={faChalkboardTeacher}
          label="My Courses"
          click={myCoursesButtonHandler}
        />
        <SidebarButton
          primary={buttonPressed === 'My Reviews' ? true : false}
          icon={faStar}
          label="My Reviews"
          toBeViewed={'InstructorReviews'}
          click={getInstructorReviews}
        />
        <InstructorReviews reviews={allReviews} />
        <SidebarButton
          icon={faArrowTurnDown}
          click={() => sendMeAnEmail()}
          label="Reset Password"
        />
        {notAccepted && (
          <>
            {' '}
            <SidebarButton
              primary={buttonPressed === 'Accept Terms' ? true : false}
              icon={faCheck}
              label="Accept Terms"
              click={() => {
                setButtonPressed('Accept Terms');
                setShowAccept(true);
              }}
            />
            <ReactModal
              isOpen={showAccept}
              onRequestClose={() => setShowAccept(false)}
              style={{
                content: {
                  width: '30vw',
                  height: '33vh',
                  margin: 'auto',
                },
              }}
            >
              <AcceptTerms id={instructorId} />
            </ReactModal>
          </>
        )}

        <CountryDropdown />
      </div>
    </div>
  );
};

export default InstructorSidebar;
