import React from 'react';
import './CoursePreview.scss';
import ReactModal from 'react-modal';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CoursePreview({
  course,
  isOpen,
  onRequestClose,
  currency,
  exRate,
  editable,
}) {
  console.log(course);
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="container">
        <div className="row">
          <div className="col-10 d-flex">
            <h1>{course.title}</h1>
            {editable && (
              <div
                className="edit-icon-container"
                onClick={() => {
                  window.location.href = `/instructor/editcourse/${course._id}`;
                }}
              >
                <FontAwesomeIcon icon={faPencil} className="edit-icon" />
              </div>
            )}
          </div>
          <div className="col-2 text-end p-2">
            <h4 id="currency">
              {course.currentDiscount &&
                new Date(course.currentDiscount?.expiryDate) >
                  new Date().getTime() && <s>{course.price} </s>}
              &nbsp;
              {course.price === 0
                ? 'FREE'
                : course.currentDiscount &&
                  new Date(course.currentDiscount?.expiryDate) >
                    new Date().getTime()
                ? (
                    course.price *
                    (1 - course?.currentDiscount?.percentage) *
                    exRate
                  ).toFixed(2)
                : (course.price * exRate).toFixed(2)}
              {' ' + currency}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <iframe
              width="800"
              height="500"
              style={{ borderRadius: '10px' }}
              src={
                course.videoURL || 'https://www.youtube.com/embed/mON4wycpawk'
              }
              title="YouTube video player"
              frameBorder="2px"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              srcDoc={'<p>Loading preview...</p>'}
              onLoad={(e) => e.currentTarget.removeAttribute('srcdoc')}
            />
          </div>
          <div className="col-4">
            <div className="row">
              <h3>Description</h3>
              <p>{course.description}</p>
            </div>
            <div className="row">
              <h3>Subtitles</h3>
              <div className="accordion accordion-flush" id="subtitleacc">
                {course.subtitles.map((subtitle) => {
                  return (
                    <div className="subtitle accordion-item">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={'#a' + subtitle._id}
                      >
                        <h4>{subtitle.name}</h4>
                      </button>
                      <div
                        id={'a' + subtitle._id}
                        class="accordion-collapse collapse "
                        data-bs-parent="#subtitleacc"
                      >
                        <div class="accordion-body">
                          <p>{subtitle.hours} Hours</p>
                          <h6>Lessons and exercises</h6>
                          {subtitle.lessons.map((lesson) => {
                            return (
                              <p>
                                {lesson.name} - {lesson.hours} Hours
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="row"></div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default CoursePreview;
