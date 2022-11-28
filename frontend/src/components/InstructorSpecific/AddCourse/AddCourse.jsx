import Multiselect from 'multiselect-react-dropdown';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { create as createCourse } from '../../../services/CourseService';
import alert from 'sweetalert2';

const AddCourse = ({ InstructorId }) => {
  const handleCourseSubmit = async () => {
    try {
      const course = {
        title: courseTitleRef.current.value,
        totalHours: courseHoursRef.current.value,
        subject: courseSubject,
        subtitles: courseSubtitlesRef.current.value?.split(','),
        price: coursePriceRef.current.value,
        description: courseDescriptionRef.current.value,
        instructors: [InstructorId],
      };
      if (
        course.title === '' ||
        course.totalHours === '' ||
        course.subject === undefined ||
        course.subtitles[0] === '' ||
        course.price === '' ||
        course.description === ''
      ) {
        alert.fire(
          'Bad Input!',
          `Please don't leave any blank fields`,
          'warning'
        );
      } else {
        await createCourse(course);
        alert.fire('Added Course', '', 'success');
        closeButton.current.click();
      }
    } catch (e) {
      console.log(e);
      alert.fire('Unexpected error has occured!', e.message, 'error');
      closeButton.current.click();
    }
  };
  const [allSubjects] = useState([
    'Computer Science',
    'Language',
    'Economics',
    'Accounting',
    'Mathematics',
    'Programming',
  ]);
  const courseTitleRef = useRef(null);
  const courseHoursRef = useRef(null);
  const [courseSubject, setCourseSubject] = useState('');
  const coursePriceRef = useRef(null);
  const courseSubtitlesRef = useRef(null);
  const courseDescriptionRef = useRef(null);
  const closeButton = useRef(null);
  return (
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
              ref={closeButton}
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
                  ref={courseTitleRef}
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
                  ref={courseHoursRef}
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
                  onSelect={(list, item) => {
                    setCourseSubject(item);
                  }}
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
                  Price in USD
                </label>
                <input
                  type="number"
                  ref={coursePriceRef}
                  class="form-control"
                  id="inputPrice"
                />
              </div>
              <div className="col-9">
                <label for="inputSubtitles" class="form-label">
                  Subtitles
                </label>
                <input
                  ref={courseSubtitlesRef}
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
                  ref={courseDescriptionRef}
                  type="text"
                  class="form-control"
                  id="inputDescription"
                  required
                />
              </div>
            </div>

            <button
              class="btn btn-primary"
              type="submit"
              onClick={async () => handleCourseSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
