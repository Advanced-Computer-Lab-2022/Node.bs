import React from "react";
import "./CoursePreview.scss";
import ReactModal from "react-modal";
import { faPencil, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import SidebarButton from "../Sidebar/SidebarButton/SidebarButton";
import AddReviewForm from "../AddReviewForm/AddReviewForm";
import CourseReviews from "../CourseReviews/CourseReviews";
import { useState } from "react";
function CoursePreview({
  course,
  isOpen,
  onRequestClose,
  currency,
  exRate,
  editable,
  canEnroll,
}) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const sampleData = [
    {
      username: "omaar",
      rating: 5,
      review: "Easiest course I have had in a while. Would recommend",
    },
    { username: "coolio123", rating: 3, review: "Not bad :)" },
  ];
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
                  new Date().getTime() && (
                  <s>
                    {course.price}
                    {" " + currency}
                  </s>
                )}
              {course.price === 0
                ? "FREE"
                : course.currentDiscount &&
                  new Date(course.currentDiscount?.expiryDate) >
                    new Date().getTime()
                ? (
                    course.price *
                    (1 - course?.currentDiscount?.percentage) *
                    exRate
                  ).toFixed(2)
                : (course.price * exRate).toFixed(2)}
              {" " + currency}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <iframe
              width="800"
              height="500"
              style={{ borderRadius: "10px" }}
              src={
                course.videoURL || "https://www.youtube.com/embed/mON4wycpawk"
              }
              title="YouTube video player"
              frameBorder="2px"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              srcDoc={"<p>Loading preview...</p>"}
              onLoad={(e) => e.currentTarget.removeAttribute("srcdoc")}
            />
          </div>
          <div className="col-4">
            <div className="row">
              <h3>Instructor(s)</h3>
              {course.instructors.map((instructor) => (
                <>
                  <button
                    className="btn btn-outline-primary mb-3 mx-auto"
                    data-bs-toggle="modal"
                    data-bs-target={"#i" + instructor._id}
                  >
                    {console.log(instructor)}
                    {instructor.firstName + " " + instructor.lastName}
                  </button>
                  <div
                    class="modal fade"
                    id={"i" + instructor._id}
                    data-bs-backdrop="false"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="false"
                  >
                    <div class="modal-dialog modal-xl">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h3 class="modal-title" id="staticBackdropLabel">
                            {instructor.firstName + " " + instructor.lastName}
                          </h3>
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
                                src="https://img.huffingtonpost.com/asset/5bae32aa240000500054d79b.jpeg?ops=scalefit_720_noupscale"
                                style={{
                                  width: "90%",
                                  height: "90%",
                                  margin: "auto",
                                  objectFit: "cover"
                                }}
                              />
                            </div>
                            <div className="col-6 ml-2">
                              <h3>Overall Rating: </h3>

                              <div
                                className="row-6 ml-5"
                                style={{ display: "flex", flexWrap: "nowrap" }}
                              >
                                {[...Array(instructor.rating)].map((star) => (
                                  <>
                                    <h3>
                                      <FontAwesomeIcon
                                        icon={faStar}
                                        style={{ color: "#FFD700" }}
                                      />
                                    </h3>
                                    &nbsp;
                                  </>
                                ))}
                              </div>
                              <br />

                              <h3>Field Of Expertise:</h3>

                              <p>{instructor.fieldOfExpertise}</p>
                              <h3>Biography: </h3>

                              <p>{instructor.overview}</p>

                              

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
                                      <FontAwesomeIcon icon={faStar} /> Review
                                      Instructor
                                    </button>
                                  </h2>
                                  <div
                                    id="collapseOne"
                                    class="accordion-collapse collapse show"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div class="accordion-body">
                                      <div className="row">
                                        <div
                                          className="col-6 mb-3"
                                          style={{ margin: "auto" }}
                                        >
                                          <div className="star-rating">
                                            {[...Array(5)].map(
                                              (star, index) => {
                                                return (
                                                  <button
                                                    type="button"
                                                    key={index + 1}
                                                    className={
                                                      index + 1 <= rating
                                                        ? "on"
                                                        : "off"
                                                    }
                                                    onClick={() =>
                                                      setRating(index + 1)
                                                    }
                                                  >
                                                    {console.log(rating)}
                                                    <span className="star">
                                                      <FontAwesomeIcon
                                                        icon={faStar}
                                                      />
                                                    </span>
                                                  </button>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-12">
                                          <label
                                            for="inputUsername"
                                            class="form-label"
                                          >
                                            Review
                                          </label>
                                          <textarea
                                            class="form-control"
                                            id="message-text"
                                            onChange={(e) =>
                                              setReview(e.target.value)
                                            }
                                          >
                                            {console.log(review)}
                                          </textarea>
                                        </div>
                                      </div>

                                      <button
                                        class="btn btn-md btn-primary ml-2 mt-2"

                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                       
                                        onClick={() =>
                                          Swal.fire(
                                            "Submitted!",
                                            "Your review has been submitted successfully.",
                                            "success"
                                          )
                                        }
                                      >
                                        Submit review
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                {/* <AddReviewForm /> */}
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <InstructorPreview instructor={instructor} /> */}
                </>
              ))}
            </div>
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
                        data-bs-target={"#a" + subtitle._id}
                      >
                        <h4>{subtitle.name}</h4>
                      </button>
                      <div
                        id={"a" + subtitle._id}
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

              <button
                type="button"
                class="btn btn-md btn-secondary ml-2 mt-5"
                id="viewCourseReviewsButton"
                data-bs-toggle="modal"
                data-bs-target="#viewCourseReviewsModal"
              >
                See what other students think of this course
              </button>
              <CourseReviews reviews={sampleData} />

              {false ? (
                <button
                  type="button"
                  class="btn btn-md btn-primary ml-2 mt-2"
                  onClick={() =>
                    Swal.fire({
                      title: "Are you sure you want to enroll in this course?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "No",
                      confirmButtonText: "Yes!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire(
                          "Enrolled!!",
                          "You have succesfully enrolled in this course!",
                          "success"
                        );
                      }
                    })
                  }
                >
                  <span className="content">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    Enroll in Course?
                  </span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    class="btn btn-md btn-dark ml-2 mt-3"
                    data-bs-toggle="modal"
                    data-bs-target="#addReviewModal"
                  >
                    <span className="content">
                      <FontAwesomeIcon icon={faStar} className="icon" />
                      Rate Course
                    </span>
                  </button>

                  <AddReviewForm />
                </>
              )}
            </div>
            <div className="row"></div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default CoursePreview;
