import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const InstructorReviews = (reviews) => {
  return (
    <div
      class="modal fade"
      id="viewInstructorReviewsModal"
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
              My Reviews
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                {reviews.reviews.data?.map((review) => (
                  <div>
                    {/* {console.log(reviews?.reviews)} */}
                    <h6>
                      {review?.user?.firstName + ' ' + review?.user?.lastName}
                    </h6>

                    {[...Array(review?.rating)].map((star) => (
                      <FontAwesomeIcon icon={faStar} />
                    ))}
                    <p>{review?.review}</p>
                    <hr />
                  </div>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorReviews;
