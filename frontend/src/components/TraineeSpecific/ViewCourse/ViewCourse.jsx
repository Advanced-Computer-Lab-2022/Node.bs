import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import * as courses from './../../../services/CourseService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import ReactLoading from 'react-loading';
import ReactModal from 'react-modal';
import './ViewCourse.scss';
import alert from 'sweetalert2';

const ViewCourse = () => {
  const { id, registeredCourseId, corporate } = useParams();
  const [loading, setLoading] = useState(false);
  const [registeredCourse, setRegisteredCourse] = useState(null);
  const [course, setCourse] = useState(null);
  const [viewedLesson, setViewedLesson] = useState(null);
  const [viewedSubtitle, setViewedSubtitle] = useState(null);
  const [showTest, setShowTest] = useState(false);
  const [finishedSubmission, setFinishedSubmission] = useState(null);
  const [canTakeTest, setCanTakeTest] = useState(false);

  const checkCanTakeTest = (lesson) => {
    for (let submission in registeredCourse.submissions) {
      if (
        lesson.test &&
        registeredCourse.submissions[submission].test._id === lesson.test._id
      ) {
        setFinishedSubmission(registeredCourse.submissions[submission]);
        setCanTakeTest(false);
        return;
      }
    }
    setFinishedSubmission(null);
    setCanTakeTest(true);
  };

  const handleTestSubmit = async () => {
    let complete = true;
    let grade = 0;
    let answers = viewedLesson.test.exercises.map((exercise) => {
      let options = document.getElementsByName('answer' + exercise._id);
      for (let i in options) {
        if (options[i].checked) {
          if (options[i].value === exercise.answer) {
            grade++;
          }
          return options[i].value;
        }
      }
      return null;
    });
    grade = (grade / viewedLesson.test.exercises.length) * 100;
    if (answers.length === 0) {
      grade = 100;
    }
    const submission = {
      answers,
      grade,
      date: new Date(),
      test: viewedLesson.test._id,
    };
    for (let answer in answers) {
      if (answers[answer] === null) {
        complete = false;
      }
    }
    if (complete) {
      try {
        const response = await courses.submitTest(
          corporate === '1' ? true : false,
          submission,
          id,
          course._id
        );
        if (response.status === 200) {
          alert.fire(
            'Test submitted successfully',
            'Congratulations! ',
            'success'
          );
        }
        setShowTest(false);

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        alert.fire('An error has occured', 'try again later', 'error');
      }
    } else {
      alert.fire('Bad input!', 'Please answer all questions', 'warning');
    }
  };
  const getMyCourses = async () => {
    setLoading(true);
    try {
      const response = await courses.getMyCourses(
        corporate === '1' ? true : false,
        id
      );

      setRegisteredCourse(response.data[parseInt(registeredCourseId)]);
      setCourse(response.data[parseInt(registeredCourseId)].course);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  return (
    <div className="container-fluid row main px-0 h-100 ">
      <div className="row">
        <div class="logo">
          <h6 className="brand mx-3">
            <FontAwesomeIcon icon={faDoorOpen} /> CourseIndoors
          </h6>
        </div>
      </div>
      {registeredCourse && (
        <div className="row">
          <div className="col-3 mx-3 my-5">
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
                      onClick={() => {
                        setViewedSubtitle(subtitle);
                        setViewedLesson(null);
                      }}
                    >
                      <h4>
                        {subtitle.name}{' '}
                        {subtitle.hours && '- ' + subtitle.hours + ' Hours'}
                      </h4>
                    </button>
                    <div
                      id={'a' + subtitle._id}
                      class="accordion-collapse collapse "
                      data-bs-parent="#subtitleacc"
                    >
                      <div class="accordion-body">
                        <h5>Lessons and exercises</h5>
                        {subtitle.lessons.map((lesson) => {
                          return (
                            <p
                              onClick={() => {
                                setViewedLesson(lesson);
                                setViewedSubtitle(null);
                                checkCanTakeTest(lesson);
                              }}
                              className="lesson-hover"
                            >
                              {lesson.name} - {lesson.hours} Hours
                            </p>
                          );
                        })}
                        {subtitle.lessons.length === 0 && (
                          <p>No lessons available yet, check again later!</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-8">
            <h3 className="text-start">{course.title}</h3>
            <hr />
            {viewedSubtitle && (
              <div className="container-fluid">
                <div className="subtitle-preview">
                  <h4>{viewedSubtitle.name}</h4>
                  <h5>Subtitle Preview</h5>
                  <iframe
                    width="800"
                    height="500"
                    style={{ borderRadius: '10px' }}
                    src={
                      viewedSubtitle.videoURL ||
                      'https://www.youtube.com/embed/mON4wycpawk'
                    }
                    title="YouTube video player"
                    frameBorder="2px"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    srcDoc={'<p>Loading preview...</p>'}
                    onLoad={(e) => e.currentTarget.removeAttribute('srcdoc')}
                  />
                  <p>{viewedSubtitle.description}</p>
                </div>
              </div>
            )}
            {viewedLesson && (
              <div className="container-fluid">
                <div className="lesson-container">
                  <h5>Lesson - {viewedLesson.name}</h5>
                  {console.log(viewedLesson)}
                  {viewedLesson.learningResources.map((resource) => {
                    if (resource.type === 'video') {
                      return (
                        <div>
                          <h6>{resource.title}</h6>
                          <iframe
                            width="800"
                            height="500"
                            style={{ borderRadius: '10px' }}
                            src={
                              resource.URL ||
                              'https://www.youtube.com/embed/mON4wycpawk'
                            }
                            title="YouTube video player"
                            frameBorder="2px"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            srcDoc={'<p>Loading preview...</p>'}
                            onLoad={(e) =>
                              e.currentTarget.removeAttribute('srcdoc')
                            }
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <h6>{resource.title}</h6>
                          <a className="lesson-hover" href={resource.URL}>
                            Read More!
                          </a>
                        </div>
                      );
                    }
                  })}

                  {!canTakeTest && (
                    <div>
                      <hr />
                      <h5>Lesson Test Results</h5>
                      <p>Grade : {finishedSubmission.grade}%</p>
                      <h5>Questions and answers</h5>
                      {finishedSubmission.test.exercises.map(
                        (exercise, exerciseIndex) => {
                          return (
                            <>
                              <h6>Q: {exercise.question}</h6>
                              <ul>
                                <li>Options</li>
                                <ul>
                                  <li
                                    style={{
                                      color:
                                        finishedSubmission.answers[
                                          exerciseIndex
                                        ] === 'A'
                                          ? finishedSubmission.answers[
                                              exerciseIndex
                                            ] === exercise.answer
                                            ? 'green'
                                            : 'red'
                                          : '#545454',
                                    }}
                                  >
                                    A: {exercise.options['A']}
                                  </li>
                                  <li
                                    style={{
                                      color:
                                        finishedSubmission.answers[
                                          exerciseIndex
                                        ] === 'B'
                                          ? finishedSubmission.answers[
                                              exerciseIndex
                                            ] === exercise.answer
                                            ? 'green'
                                            : 'red'
                                          : '#545454',
                                    }}
                                  >
                                    B: {exercise.options['B']}
                                  </li>
                                  <li
                                    style={{
                                      color:
                                        finishedSubmission.answers[
                                          exerciseIndex
                                        ] === 'C'
                                          ? finishedSubmission.answers[
                                              exerciseIndex
                                            ] === exercise.answer
                                            ? 'green'
                                            : 'red'
                                          : '#545454',
                                    }}
                                  >
                                    C: {exercise.options['C']}
                                  </li>
                                  <li
                                    style={{
                                      color:
                                        finishedSubmission.answers[
                                          exerciseIndex
                                        ] === 'D'
                                          ? finishedSubmission.answers[
                                              exerciseIndex
                                            ] === exercise.answer
                                            ? 'green'
                                            : 'red'
                                          : '#545454',
                                    }}
                                  >
                                    D: {exercise.options['D']}
                                  </li>
                                </ul>
                                <li>
                                  Correct answer: {exercise.answer}:
                                  {exercise.options[exercise.answer]}
                                </li>
                              </ul>
                            </>
                          );
                        }
                      )}
                    </div>
                  )}
                  {canTakeTest && (
                    <div>
                      <hr />
                      <h6>Lesson Test</h6>
                      {viewedLesson.test && (
                        <button
                          id="searchButton"
                          className="mx-2 btn btn-outline-primary"
                          onClick={() => setShowTest(true)}
                        >
                          Take Test!
                        </button>
                      )}
                      <ReactModal
                        style={{
                          content: {
                            width: '28vw',
                            height: '45vh',
                            margin: 'auto',
                          },
                        }}
                        isOpen={showTest}
                        onRequestClose={() => setShowTest(false)}
                      >
                        <h2>{viewedLesson.name} Test</h2>
                        {viewedLesson.test?.exercises.map(
                          (exercise, exerciseIndex) => {
                            return (
                              <div className="container-fluid">
                                <h4>
                                  {exerciseIndex + 1}.{exercise.question}
                                </h4>

                                <input
                                  type="radio"
                                  name={'answer' + exercise._id}
                                  id={'exercise' + exercise._id}
                                  value="A"
                                />
                                <label htmlFor="">
                                  &nbsp;{exercise.options.A}
                                </label>
                                <br />
                                <input
                                  type="radio"
                                  name={'answer' + exercise._id}
                                  id={'exercise' + exercise._id}
                                  value="B"
                                />
                                <label htmlFor="">
                                  &nbsp; {exercise.options.B}
                                </label>
                                <br />
                                <input
                                  type="radio"
                                  name={'answer' + exercise._id}
                                  id={'exercise' + exercise._id}
                                  value="C"
                                />
                                <label htmlFor="">
                                  &nbsp;{exercise.options.C}
                                </label>
                                <br />
                                <input
                                  type="radio"
                                  name={'answer' + exercise._id}
                                  id={'exercise' + exercise._id}
                                  value="D"
                                />
                                <label htmlFor="">
                                  &nbsp; {exercise.options.D}
                                </label>
                                <hr />
                              </div>
                            );
                          }
                        )}
                        <button
                          id="searchButton"
                          className="mx-2 btn btn-outline-primary"
                          onClick={() => handleTestSubmit()}
                        >
                          Submit Test!
                        </button>
                      </ReactModal>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {!registeredCourse && loading && (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1>Loading...</h1>
          </div>
          <div>
            <h1>
              <ReactLoading color="black" type="spin" />
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCourse;
