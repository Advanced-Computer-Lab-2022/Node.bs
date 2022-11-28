import CourseCard from './CourseCard/CourseCard';
import './CourseGroup.scss';
// import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

const CourseGroup = ({ courses, loading }) => {
  // const currency = useSelector(
  //   (state) => state.region.selectedRegion.currencyCodes[0]
  // );
  return (
    <div className="container" id="courseGroup">
      <div className="row" id="courseGroup">
        {!loading && courses.length === 0 && <h3>No results found.</h3>}
        {loading && (
          <h3>
            <ReactLoading color="black" type="spin" />
          </h3>
        )}
        {courses.map((course) => {
          return (
            <>
              <div className=" col-md-4 col-sm-12 col-xs-12">
                <CourseCard course={course} />
              </div>
              {/* <div
                class="modal fade modal-fullscreen"
                // id={course.title.split(' ').join('')}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-fullscreen">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">
                        Course Preview
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
                        <div className="col-6">
                          <img
                            src="https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png"
                            style={{ width: '150px', height: '150px' }}
                          />
                          <div className="row mb-3">
                            <div className="col-6">
                              <h1>{course.title}</h1>
                            </div>
                            <div className="col-6 text-end">
                              <h3>
                                {course.price} {currency}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="col-6 text-end">
                          <iframe
                            width="560"
                            height="315"
                            src={course.videoURL}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <p style={{ width: '50%' }}>{course.description}</p>
                      </div>
                      <div className="row mb-3">
                        <h6 style={{ color: '#cccc' }}>{course.totalHours}</h6>
                      </div>
                      <div className="row">
                        <div class="accordion" id="subtitleAccordion">
                          {course.subtitles.map((subtitle) => {
                            <div class="accordion-item">
                              <h2 class="accordion-header" id="headingOne">
                                <button
                                  class="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  {subtitle.name}
                                </button>
                              </h2>
                              <div
                                id="collapseOne"
                                class="accordion-collapse collapse show"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                              >
                                <div class="accordion-body">
                                  <ul>
                                    {subtitle.lessons?.map((lesson) => {
                                      <div className="row">
                                        <div className="col-6">
                                          <li>{lesson.name}</li>
                                        </div>
                                        <div className="col-6 text-end">
                                          {lesson.hours}
                                        </div>
                                      </div>;
                                    })}
                                  </ul>
                                </div>
                              </div>
                            </div>;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CourseGroup;
