import React from 'react';
import SidebarButton from './SidebarButton/SidebarButton';
import './Sidebar.scss';
import {
  faDoorOpen,
  faLaptopHouse,
  faCog,
  faClipboard,
  faMedal,
  faKey,
  faGraduationCap,
  faChalkboardTeacher,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountryDropdown from './../util/CountryDropdown/CountryDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Multiselect } from 'multiselect-react-dropdown';
import {
  createAdmin,
  createCorporateTrainee,
  createInstructor,
} from './../../services/AdminService';
import { create } from '../../services/CourseService';
import {
  searchCourses,
  createCourse,
  setAction,
} from '../../redux/features/resultSlice';
import AddForm from '../AddForm/AddForm';
import { useState } from 'react';

function Sidebar() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const showInstructorCourses = () => {
    dispatch(
      searchCourses({
        query: {
          title: 'bhadsujbaoubobadohbdapsbdsidash',
          subject: 'jkbiuvacasbvuocbvoisboiasbab',
        },
        extQuery: {
          query: {
            firstName: userInfo.user.firstName,
            lastName: userInfo.user.lastName,
          },
        },
      })
    );
    dispatch(setAction('instructorView'));
  };

  const [showSuccess, setSuccess] = useState(false);

  const allSubjects = useSelector((state) => state.subjects.all);
  const currency = useSelector(
    (state) => state.region.selectedRegion.currencyCodes[0]
  );
  const addCorporateTrainee = async () => {
    try {
      const response = await createCorporateTrainee({
        username: document.getElementById('inputUsernameCorporateTrainee')
          .value,
        password: document.getElementById('inputPasswordCorporateTrainee')
          .value,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      document.getElementById('inputUsernameCorporateTrainee').value = '';
      document.getElementById('inputPasswordCorporateTrainee').value = '';
      document.getElementById(
        'inputConfirmationPasswordCorporateTrainee'
      ).value = '';
    } catch (e) {
      console.log(e);
    }
  };

  const addInstructor = async () => {
    try {
      const response = await createInstructor({
        username: document.getElementById('inputUsernameInstructor').value,
        password: document.getElementById('inputPasswordInstructor').value,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      document.getElementById('inputUsernameInstructor').value = '';
      document.getElementById('inputPasswordInstructor').value = '';
      document.getElementById('inputConfirmationPasswordInstructor').value = '';
    } catch (e) {
      console.log(e);
    }
  };
  const addAdminstrator = async () => {
    try {
      const response = await createAdmin({
        username: document.getElementById('inputUsernameAdminstrator').value,
        password: document.getElementById('inputPasswordAdminstrator').value,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      document.getElementById('inputUsernameAdminstrator').value = '';
      document.getElementById('inputPasswordAdminstrator').value = '';
      document.getElementById('inputConfirmationPasswordAdminstrator').value =
        '';
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <div class="container-fluid">
      <div class="logo">
        <h6 className="brand">
          <FontAwesomeIcon icon={faDoorOpen} /> CourseIndoors
        </h6>
      </div>
      <div className="sidebarButtonContainer">
        <SidebarButton icon={faLaptopHouse} label="Dashboard" primary />
        <SidebarButton icon={faMedal} label="Certificates" />
        <SidebarButton icon={faClipboard} label="Tests" />
        <SidebarButton icon={faCog} label="Settings" />

        {userInfo.type === 'admin' ? (
          <>
            {' '}
            <SidebarButton
              icon={faChalkboardTeacher}
              label="Add Instructor"
              toBeAdded="Instructor"
            />
            <AddForm toBeAdded="Instructor" handleSubmit={addInstructor} />
            <SidebarButton
              icon={faGraduationCap}
              label="Add Corporate Trainee"
              toBeAdded="CorporateTrainee"
            />
            <AddForm
              toBeAdded="CorporateTrainee"
              handleSubmit={addCorporateTrainee}
            />
            <SidebarButton
              icon={faKey}
              label="Add Adminstrator"
              toBeAdded="Adminstrator"
            />
            <AddForm toBeAdded="Adminstrator" handleSubmit={addAdminstrator} />
          </>
        ) : (
          <></>
        )}
        {userInfo.type === 'instructor' ? (
          <>
            <SidebarButton
              icon={faBook}
              label="Add Course"
              toBeAdded="Course"
            />
            <div
              class="modal fade"
              id="addCourseModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      Add Course
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label for="inputCourseTitle" class="form-label">
                          Course Title
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputCourseTitle"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <label for="inputHours" class="form-label">
                          Total hours to complete
                        </label>
                        <input
                          type="number"
                          min="0"
                          class="form-control"
                          id="inputHours"
                        />
                      </div>
                      <div className="col-9">
                        <label for="inputSubjects" class="form-label">
                          Subject(s)
                        </label>
                        <Multiselect
                          id="inputSubjects"
                          displayValue=""
                          isObject={false}
                          onKeyPressFn={function noRefCheck() {}}
                          onRemove={function noRefCheck() {}}
                          onSearch={function noRefCheck() {}}
                          onSelect={function noRefCheck() {}}
                          options={allSubjects}
                          placeholder="select subject(s)"
                          selectedValues={{}}
                          showCheckbox
                          style={{}}
                          singleSelect={true}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-3">
                        <label for="inputPrice" class="form-label">
                          Price in {currency}
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="inputPrice"
                        />
                      </div>
                      <div className="col-9">
                        <label for="inputSubtitles" class="form-label">
                          Subtitles
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputSubtitles"
                          placeholder="Subtitle_1, Subtitle_2, Subtitle_3,..."
                        />
                      </div>
                      <div className="col-12">
                        <label for="inputDescription" class="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputDescription"
                        />
                      </div>
                    </div>

                    <button
                      class="btn btn-primary"
                      onClick={async () => {
                        await create({
                          title:
                            document.getElementById('inputCourseTitle').value,
                          hours: document.getElementById('inputHours').value,
                          subjects:
                            document.getElementById('inputSubjects')
                              .selectedValues,
                          subtitles: [
                            ...document
                              .getElementById('inputSubtitles')
                              .value.split(','),
                          ],
                          price: document.getElementById('inputPrice').value,
                          description:
                            document.getElementById('inputDescription').value,
                          instructors: [userInfo.user._id],
                        });
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <SidebarButton
              icon={faChalkboardTeacher}
              label="My Courses"
              click={showInstructorCourses}
            />
          </>
        ) : (
          <></>
        )}

        <CountryDropdown />
      </div>
    </div>
  );
}

export default Sidebar;
