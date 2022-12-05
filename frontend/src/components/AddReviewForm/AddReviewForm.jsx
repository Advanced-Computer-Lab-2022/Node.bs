import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './AddReviewForm.scss';
import Swal from 'sweetalert2';
import { reviewCourseIndividual } from '../../services/IndividualTraineeService';
import { reviewCourseCorporate } from '../../services/CorporateTraineeService';

const AddReviewForm = ({ course, type, id }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  // console.log(course.course._id);
  const handleCourseReviewSubmission = async () => {
    if (rating > 1) {
      console.log(id);
      try {
        if (type === 'individual') {
          const addReview = await reviewCourseIndividual({
            individualTraineeId: id,
            courseId: course._id,
            review: { rating: rating, review: review },
          });
        } else if (type === 'corporate') {
          console.log('hasal');
          const addReview = await reviewCourseCorporate({
            corporateTraineeId: id,
            courseId: course._id,
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

  return (
    <div
      class="modal fade"
      id="addReviewModal"
      data-bs-backdrop="false"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Add Review
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
              <div className="col-6 mb-3" style={{ margin: 'auto' }}>
                <div className="star-rating">
                  {[...Array(5)].map((star, index) => {
                    return (
                      <button
                        type="button"
                        key={index + 1}
                        className={index + 1 <= rating ? 'on' : 'off'}
                        onClick={() => setRating(index + 1)}
                      >
                        {console.log(rating)}
                        <span className="star">
                          <FontAwesomeIcon icon={faStar} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label for="inputUsername" class="form-label">
                  Review
                </label>
                <textarea
                  class="form-control"
                  id="message-text"
                  onChange={(e) => setReview(e.target.value)}
                >
                  {console.log(review)}
                </textarea>
              </div>
            </div>

            <button
              className="btn btn-md btn-primary mt-5"
              onClick={
                () => handleCourseReviewSubmission()
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
    </div>
  );
};

export default AddReviewForm;
