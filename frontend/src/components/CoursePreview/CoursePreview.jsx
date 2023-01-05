import React from 'react';
import './CoursePreview.scss';
import ReactModal from 'react-modal';
import {
  faPencil,
  faPlus,
  faStar,
  faFlag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import * as courses from './../../services/CourseService';
import AddReviewForm from '../AddReviewForm/AddReviewForm';
import CourseReviews from '../CourseReviews/CourseReviews';
import { useState } from 'react';
import {
  registerToCourse as registerToCourseIndividual,
  updateIndividual,
} from '../../services/IndividualTraineeService';
import {
  registerToCourse as registerToCourseCorporate,
  requestAccessToCourse,
  reviewInstructorCorporate,
} from '../../services/CorporateTraineeService';

import { getMyCourses } from '../../services/CourseService';

import { getCourseReviews } from '../../services/CourseService';

import { reviewInstructorIndividual } from '../../services/IndividualTraineeService';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { getTrainee } from '../../services/IndividualTraineeService';
import { registerToCourse as indi } from '../../services/IndividualTraineeService';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_test_51MJgDSB83C7nM6cpUcvMU0emvlX5JWBD4ejCvUTgYSGjj49qdaDJSiSYv77yOMnK807yV7t0qMH7ZyQd18tF13BO00PUT2lVNv'
    );
  }

  return stripePromise;
};

function CoursePreview({
  course,
  isOpen,
  onRequestClose,
  currency,
  exRate,
  editable,
  type,
  id,
  guest,
}) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [canEnroll, setCanEnroll] = useState(true);

  const item = {
    price: course.priceId,
    quantity: 1,
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: 'payment',
    successUrl: `${window.location.origin}/enroll/${course._id}/${id}/${
      type === 'individual' ? 1 : 0
    }`,
    cancelUrl: `${window.location.origin}/${type}`,
  };

  const redirectToCheckout = async () => {
    console.log('redirectToCheckout');
    const stripe = await getStripe();
    const { err } = await stripe.redirectToCheckout(checkoutOptions);
    console.log('stripe checkout error: ', err);
  };

  const enrollWithWallet = async () => {
    const myFunds = await getTrainee({ individualTraineeId: id });
    if (myFunds.data.wallet < course.price) {
      Swal.fire('Insufficient funds!', '', 'error');
    } else {
      //update funds

      const update = updateIndividual(id, {
        wallet:
          myFunds.data.wallet -
          ((course.currentDiscount &&
            new Date(course.currentDiscount.expiryDate)) > new Date().getTime()
            ? parseInt(
                course.price *
                  (1 - parseFloat(course.currentDiscount.percentage))
              )
            : parseInt(course.price)),
      });

      //register in course
      const response = await indi({
        individualTraineeId: id,
        courseId: course._id,
      });

      if (response.status == 200) {
        Swal.fire('Registered in course successfully!', '', 'success');
      } else {
        Swal.fire('An Error has occured, please try again later', '', 'error');
      }
    }
  };

  useEffect(() => {
    if (type !== 'instructor' && id) {
      const checkEnrolled = async () => {
        const myCourses = await getMyCourses(type === 'corporate', id);
        // console.log(myCourses.data)
        myCourses.data.forEach((registeration) => {
          // console.log(registeration)
          if (registeration.course._id === course._id) {
            setCanEnroll(false);
          }
        });
      };
      checkEnrolled();
    }
  }, []);

  const handleRegistration = async () => {
    Swal.fire({
      title: 'Are you sure you want to enroll in this course?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        //ADD CONDITION TO CHECK WETHER TRAINEE IS INDIVIDUAL OR CORPORATE !!!
        try {
          let registration = null;
          if (type === 'individual') {
            registration = await registerToCourseIndividual({
              individualTraineeId: id,
              courseId: course._id,
            });
          } else if (type === 'corporate') {
            registration = await registerToCourseCorporate({
              corporateTraineeId: id,
              courseId: course._id,
            });
          }
          if (registration.status === 200) {
            Swal.fire(
              'Enrolled!!',
              'You have succesfully enrolled in this course!',
              'success'
            );
            window.location.reload();
          } else {
            Swal.fire(
              'An error has occured',
              "Couldn't enroll in course",
              'error'
            );
          }
        } catch (error) {
          Swal.fire(
            'An error has occured',
            "Couldn't enroll in course",
            'error'
          );
        }
      }
    });
  };

  //CREDIT CARD
  const [creditCardOpen, setCreditCardOpen] = useState(false);

  //REPORT

  const [reportBody, setReportBody] = useState('');
  const [reportType, setReportType] = useState('');
  const [reportOpen, setReportOpen] = useState(false);

  const handleAddReport = async () => {
    const instructorId = id;

    const reportToBeAdded = {
      instructorId: instructorId,
      courseId: id,
      reportType: reportType,
      reportBody: reportBody,
      // (type === 'individual'?individualTrainee:)
    };
    if (reportBody === '') {
      Swal.fire(
        'Bad Input!',
        "Don't leave the body of the report blank.",
        'warning'
      );
    } else {
      const response = await courses.addReport(reportToBeAdded);

      if (response.status === 200) {
        Swal.fire(
          'Report Submitted',
          'Your report has been submitted successfuly!',
          'success'
        );
      } else {
        Swal.fire('An error occurred', 'Something went wrong...', 'error');
      }
    }
  };

  const [allReviews, setAllReviews] = useState('');

  const getReviews = async () => {
    const returnedReviews = await getCourseReviews({ courseId: course._id });
    setAllReviews(returnedReviews);
    // console.log(returnedReviews.data);
  };

  const handleInstructorReviewSubmission = async (instructorId) => {
    // console.log('reviewing Instructor');
    if (rating > 1) {
      try {
        if (type === 'individual') {
          const addReview = await reviewInstructorIndividual({
            user: id,
            instructorId: instructorId,
            review: { rating: rating, review: review },
          });
        } else if (type === 'corporate') {
          const addReview = await reviewInstructorCorporate({
            user: id,
            instructorId: instructorId,
            review: { rating: rating, review: review },
          });
        }
        Swal.fire(
          'Submitted!',
          'Your review has been submitted successfully.',
          'success'
        );
      } catch (error) {
        Swal.fire('Error', 'an error has occured!', 'error');
      }
    } else {
      Swal.fire('Bad input!', "please don't leave any blanks", 'warning');
    }
  };

  const handleRequestAccessToCourse = async (course) => {
    const corporateTraineeId = id;
    const courseId = course;

    console.log('CORPT : ' + corporateTraineeId);
    console.log('course: ' + courseId);
    const functionCall = await requestAccessToCourse({
      corporateTraineeId: corporateTraineeId,
      courseId: courseId,
    });

    if (functionCall.status == 200) {
      Swal.fire(
        'Your request has been submitted!',
        'Our adminstators will look into you request..',
        'success'
      );
    } else {
      Swal.fire('Error', 'Something went wrong!', 'erro');
    }
  };

  // const handleCourseReviewSubmission = async () => {
  //   const addReview = await reviewCourseIndividual({
  //     individualTraineeId: "638796ae23b3b73229cb811b",
  //     courseId: "638948f347f5b856a309d600",
  //     review: { rating: rating, review: review },
  //   });
  //   Swal.fire(
  //     "Submitted!",
  //     "Your review has been submitted successfully.",
  //     "success"
  //   );
  // };
  const sampleData = [
    {
      username: 'omaar',
      rating: 5,
      review: 'Easiest course I have had in a while. Would recommend',
    },
    { username: 'coolio123', rating: 3, review: 'Not bad :)' },
  ];
  // console.log(course);
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
              {course?.currentDiscount &&
                new Date(course.currentDiscount?.expiryDate) >
                  new Date().getTime() && <s>{course.price} </s>}
              &nbsp;
              {course?.price === 0
                ? 'FREE'
                : course.currentDiscount &&
                  new Date(course.currentDiscount?.expiryDate) >
                    new Date().getTime()
                ? (
                    course?.price *
                    (1 - course?.currentDiscount?.percentage) *
                    exRate
                  ).toFixed(2)
                : (course?.price * exRate).toFixed(2)}
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
              <h3>Instructor(s)</h3>
              {course.instructors.map((instructor) => (
                <>
                  <button
                    className="btn btn-outline-primary mb-3 mx-auto"
                    data-bs-toggle="modal"
                    data-bs-target={'#i' + instructor._id}
                  >
                    {/* {console.log(instructor)} */}
                    {instructor.firstName
                      ? instructor.firstName + ' ' + instructor.lastName
                      : instructor.username}
                  </button>
                  <div
                    class="modal fade"
                    id={'i' + instructor._id}
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
                            {instructor.firstName
                              ? instructor.firstName + ' ' + instructor.lastName
                              : instructor.username}
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
                                  width: '90%',
                                  height: '90%',
                                  margin: 'auto',
                                  objectFit: 'cover',
                                }}
                              />
                            </div>
                            <div className="col-6 ml-2">
                              <h3>Overall Rating: </h3>

                              <div
                                className="row-6 ml-5"
                                style={{ display: 'flex', flexWrap: 'nowrap' }}
                              >
                                {[...Array(instructor.rating)].map((star) => (
                                  <>
                                    <h3>
                                      <FontAwesomeIcon
                                        icon={faStar}
                                        style={{ color: '#FFD700' }}
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
                              {type !== 'instructor' && !guest && (
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
                                          style={{ margin: 'auto' }}
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
                                                        ? 'on'
                                                        : 'off'
                                                    }
                                                    onClick={() =>
                                                      setRating(index + 1)
                                                    }
                                                  >
                                                    {/* {console.log(rating)} */}
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
                                            {/* {console.log(review)} */}
                                          </textarea>
                                        </div>
                                      </div>

                                      <button
                                        class="btn btn-md btn-primary ml-2 mt-2"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        onClick={
                                          () =>
                                            handleInstructorReviewSubmission(
                                              instructor._id
                                            )
                                          // Swal.fire(
                                          //   "Submitted!",
                                          //   "Your review has been submitted successfully.",
                                          //   "success"
                                          // )
                                        }
                                      >
                                        Submit review
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
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
              {course.subtitles.length === 0 && (
                <h5>No Subtitles available now, please check again later!</h5>
              )}
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
                          {subtitle?.lessons?.map((lesson) => {
                            return (
                              <p>
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

              <button
                type="button"
                class="btn btn-md btn-secondary ml-2 mt-5"
                id="viewCourseReviewsButton"
                data-bs-toggle="modal"
                data-bs-target="#viewCourseReviewsModal"
                onClick={() => getReviews()}
              >
                See what students think of this course
              </button>
              <CourseReviews reviews={allReviews} />
              {/* {insert report button here if type is instructor and if instructor teaches this course} */}

              {canEnroll &&
                type !== 'instructor' &&
                type == 'individual' &&
                !guest && (
                  <>
                    <button
                      type="button"
                      class="btn btn-md btn-primary ml-2 mt-2"
                      // onClick={() => handleRegistration()}
                      // onClick={() => setCreditCardOpen(true)}
                      onClick={() => redirectToCheckout()}
                    >
                      <span className="content">
                        <FontAwesomeIcon icon={faPlus} className="icon" />
                        Enroll in Course using credit card?
                      </span>
                    </button>
                    <button
                      type="button"
                      class="btn btn-md btn-primary ml-2 mt-2"
                      // onClick={() => handleRegistration()}
                      // onClick={() => setCreditCardOpen(true)}
                      onClick={() => enrollWithWallet()}
                    >
                      <span className="content">
                        <FontAwesomeIcon icon={faPlus} className="icon" />
                        Enroll in Course using wallet?
                      </span>
                    </button>
                    {/* <ReactModal
                      isOpen={creditCardOpen}
                      onRequestClose={() => setCreditCardOpen(false)}
                      style={{
                        content: {
                          width: '100vh',
                          height: '70vh',
                          margin: 'auto',
                        },
                      }}
                    >
                      <h1>Credit Card details:</h1>
                      <hr />
                      <form>
                        <div class="row mb-4">
                          <div class="col">
                            <div class="form-outline">
                              <label class="form-label" for="formNameOnCard">
                                Name on card
                              </label>
                              <input
                                type="text"
                                id="formNameOnCard"
                                class="form-control"
                              />
                            </div>
                          </div>
                          <div class="col">
                            <div class="form-outline">
                              <label class="form-label" for="formCardNumber">
                                Credit card number
                              </label>
                              <input
                                type="text"
                                id="formCardNumber"
                                class="form-control"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="row mb-4">
                          <div class="col-3">
                            <div class="form-outline">
                              <label class="form-label" for="formExpiration">
                                Expiration
                              </label>
                              <input
                                type="text"
                                id="formExpiration"
                                class="form-control"
                              />
                            </div>
                          </div>
                          <div class="col-3">
                            <div class="form-outline">
                              <label class="form-label" for="formCVV">
                                CVV
                              </label>
                              <input
                                type="text"
                                id="formCVV"
                                class="form-control"
                              />
                            </div>
                          </div>
                        </div>

                        <h6 style={{ color: 'red', fontStyle: '' }}>
                          Warning: The price of the course will be deducted from
                          you credit card when pressing "Confirm Payment". Are
                          you sure you want to proceed?
                        </h6>
                        <div className="row">
                          <div className="col-9"> </div>
                          <div class="col-3">
                            <button
                              class="btn btn-outline-primary btn-md mt-5 ml-5"
                              type="button"
                              onClick={() => handleRegistration()}
                            >
                              Confirm Payment
                            </button>
                          </div>
                        </div>
                      </form>
                    </ReactModal> */}
                  </>
                )}
              {canEnroll &&
                !guest &&
                type !== 'instructor' &&
                type == 'corporate' && (
                  <>
                    <button
                      type="button"
                      class="btn btn-md btn-primary ml-2 mt-2"
                      onClick={() => handleRequestAccessToCourse(course._id)}
                      // onClick={() => setCreditCardOpen(true)}
                    >
                      <span className="content">
                        <FontAwesomeIcon icon={faPlus} className="icon" />
                        Request access to this course
                      </span>
                    </button>
                  </>
                )}
              {!guest && type === 'instructor' && (
                <div className="row">
                  <button
                    className="btn btn-outline-danger btn-md mt-2"
                    onClick={() => {
                      setReportOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faFlag} /> Report
                  </button>
                  <ReactModal
                    isOpen={reportOpen}
                    onRequestClose={() => {
                      setReportOpen(false);
                    }}
                    style={{
                      content: {
                        margin: 'auto',
                        width: '60vw',
                        height: '40vw',
                      },
                    }}
                  >
                    <div className="container">
                      <h1>Report a problem</h1>
                      <hr />
                      <h3>Type of problem</h3>
                      <div className="container mt-2">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio1"
                            value="option1"
                            onClick={() => {
                              setReportType('Technical');
                            }}
                          />
                          <label class="form-check-label" for="inlineRadio1">
                            Technical
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio2"
                            value="option2"
                            onClick={() => {
                              setReportType('Financial');
                            }}
                          />
                          <label class="form-check-label" for="inlineRadio2">
                            Financial
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio3"
                            value="option3"
                            onClick={() => {
                              setReportType('Other');
                            }}
                          />
                          <label class="form-check-label" for="inlineRadio3">
                            Other
                          </label>
                        </div>
                      </div>
                      <div className="container mt-5">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlTextarea1"
                            class="form-label"
                          >
                            <h3>Explain your problem</h3>
                          </label>
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="9"
                            onChange={(e) => setReportBody(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className="row mt-5 p-3">
                        {type === 'instructor' && (
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleAddReport()}
                          >
                            Submit Report
                          </button>
                        )}
                      </div>
                    </div>
                  </ReactModal>
                </div>
              )}
              {!canEnroll && type !== 'instructor' && !guest && (
                <>
                  <button
                    type="button"
                    class="btn btn-md btn-dark ml-2 mt-2"
                    data-bs-toggle="modal"
                    data-bs-target="#addReviewModal"
                  >
                    <span className="content">
                      <FontAwesomeIcon icon={faStar} className="icon" />
                      Rate Course
                    </span>
                  </button>
                  {console.log(type)}
                  <AddReviewForm course={course} type={type} id={id} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default CoursePreview;
