import React from 'react';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getCourseById,
  updateCourse,
  updateSubtitle,
} from '../../../services/CourseService';
import alert from 'sweetalert2';
import AddLesson from '../AddLesson/AddLesson';
import AddTest from '../../../new components/AddTest/AddTest';
import AddResource from '../AddResource/AddResource';

const EditCourse = () => {
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const coursePreviewURL = useRef();
  const courseDiscount = useRef();
  const courseValidThrough = useRef();

  useEffect(() => {
    const fetchCourse = async () => {
      const result = await getCourseById(id);
      setCourse(result.data);
    };
    fetchCourse();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <h1>Edit Course</h1>
      </div>
      <div className="row course-preview-edit">
        <div className="col-2 pt-2">
          <h5>Course preview URL</h5>
        </div>
        <div className="col-3 text-start">
          <input
            type="text"
            placeholder={course.videoURL}
            ref={coursePreviewURL}
          />
          <button
            id="searchButton"
            className="mx-2 btn btn-outline-primary"
            onClick={async () => {
              if (coursePreviewURL.current.value !== '') {
                try {
                  const response = await updateCourse(id, {
                    videoURL: coursePreviewURL.current.value,
                  });
                  if (response.status === 204)
                    alert.fire('Video URL updated successfully', '', 'success');
                  else alert.fire('Something went wrong :/', '', 'warning');
                } catch (e) {
                  alert.fire(
                    'Something went wrong',
                    'please try again later',
                    'error'
                  );
                }
              }
            }}
          >
            Save
          </button>
        </div>
      </div>

      <div className="row course-discount-edit">
        <h5>Course Discount</h5>

        <div className="col-6 text-start">
          <label className="px-1">
            <p>Discount Value</p>
          </label>
          <input
            ref={courseDiscount}
            className="px-1"
            type="number"
            min={'0'}
            max={'100'}
            placeholder={course.currentDiscount?.percentage * 100}
          />
          <label className="px-1">
            <p>Valid through</p>
          </label>
          <input type="date" ref={courseValidThrough} />
          <button
            id="searchButton"
            className="mx-2 btn btn-outline-primary"
            onClick={async () => {
              if (courseDiscount.current.value) {
                try {
                  const response = await updateCourse(id, {
                    currentDiscount: {
                      percentage: courseDiscount.current.value / 100,
                      expiryDate: courseValidThrough.current.value,
                    },
                  });
                  if (response.status === 204)
                    alert.fire('Discount updated successfully', '', 'success');
                  else alert.fire('Something went wrong :/', '', 'warning');
                } catch (e) {
                  console.log(e);
                  alert.fire(
                    'Something went wrong',
                    'please try again later',
                    'error'
                  );
                }
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="row">
        <h5>Subtitles</h5>
        <div className="accordion accordion-flush" id="subtitleacc">
          {course.subtitles?.map((subtitle, subtitleIndex) => {
            return (
              <div className="subtitle accordion-item">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={'#a' + subtitle._id}
                >
                  <h5>{subtitle.name}</h5>
                </button>
                <div
                  id={'a' + subtitle._id}
                  class="accordion-collapse collapse "
                  data-bs-parent="#subtitleacc"
                >
                  <div class="accordion-body">
                    <div className=" ">
                      <label className="mx-2">Subtitle video URL</label>
                      <input type="text" id={'st' + subtitle._id} />
                      <button
                        id="searchButton"
                        className="mx-2 btn btn-outline-primary"
                        onClick={async () => {
                          if (
                            document.getElementById('st' + subtitle._id).value
                          ) {
                            try {
                              const response = await updateSubtitle(
                                subtitle._id,
                                {
                                  videoURL: document.getElementById(
                                    'st' + subtitle._id
                                  ).value,
                                }
                              );
                              if (response.status === 204)
                                alert.fire(
                                  'Subtitle video updated successfully',
                                  '',
                                  'success'
                                );
                              else
                                alert.fire(
                                  'Something went wrong :/',
                                  '',
                                  'warning'
                                );
                            } catch (e) {
                              console.log(e);
                              alert.fire(
                                'Something went wrong',
                                'please try again later',
                                'error'
                              );
                            }
                          }
                        }}
                      >
                        Save
                      </button>
                      <br />
                      <label className="mx-2">Video description</label>
                      <input type="text" id={'sb' + subtitle._id} />
                      <button
                        id="searchButton"
                        className="mx-2 btn btn-outline-primary"
                        onClick={async () => {
                          if (
                            document.getElementById('sb' + subtitle._id).value
                          ) {
                            try {
                              const response = await updateSubtitle(
                                subtitle._id,
                                {
                                  description: document.getElementById(
                                    'sb' + subtitle._id
                                  ).value,
                                }
                              );
                              if (response.status === 204)
                                alert.fire(
                                  'Subtitle description updated successfully',
                                  '',
                                  'success'
                                );
                              else
                                alert.fire(
                                  'Something went wrong :/',
                                  '',
                                  'warning'
                                );
                            } catch (e) {
                              console.log(e);
                              alert.fire(
                                'Something went wrong',
                                'please try again later',
                                'error'
                              );
                            }
                          }
                        }}
                      >
                        Save
                      </button>
                      <br />
                      <label className="mx-2">Hours</label>
                      <input type="number" id={'hrs' + subtitle._id} />
                      <button
                        id="searchButton"
                        className="mx-2 btn btn-outline-primary"
                        onClick={async () => {
                          if (
                            document.getElementById('hrs' + subtitle._id).value
                          ) {
                            try {
                              const response = await updateSubtitle(
                                subtitle._id,
                                {
                                  hours: document.getElementById(
                                    'hrs' + subtitle._id
                                  ).value,
                                }
                              );
                              if (response.status === 204)
                                alert.fire(
                                  'Subtitle Hours updated successfully',
                                  '',
                                  'success'
                                );
                              else
                                alert.fire(
                                  'Something went wrong :/',
                                  '',
                                  'warning'
                                );
                            } catch (e) {
                              console.log(e);
                              alert.fire(
                                'Something went wrong',
                                'please try again later',
                                'error'
                              );
                            }
                          }
                        }}
                      >
                        Save
                      </button>
                      <h5>Lessons</h5>
                      {subtitle.lessons.map((lesson) => {
                        return (
                          <div className="">
                            <p className="mx-2">{lesson.name}</p>
                            {!lesson.test && <AddTest lesson={lesson} />}
                            <AddResource lesson={lesson} />
                            <hr />
                          </div>
                        );
                      })}
                      <AddLesson subtitle={subtitle} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-end ">
        <button
          className="btn btn-outline-success my-2 "
          onClick={() => {
            window.location.href = '/instructor';
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default EditCourse;
