import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ReactModal from 'react-modal';
import Swal from 'sweetalert2';
import { addFollowupToReport } from '../../services/CourseService';
const ReportsIssued = (reports) => {
  const [followupBody, setFollowupBody] = useState('');

  const handleAddFollowup = async (reportId) => {
    // console.log(reportId);
    const body = followupBody;
    // console.log("body: " + body);
    const addFollowUpQuery = await addFollowupToReport({
      reportId: reportId,
      followupBody: body,
    });

    if (addFollowUpQuery.status === 200) {
      Swal.fire('Followup added successfully', '', 'success');
    }
  };
  return (
    <div
      class="modal fade"
      id="viewReportsIssuedModal"
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
              Reports Issued
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
                {reports.reports?.data?.map((report, index) => (
                  <div className="row">
                    {console.log(report)}
                    <div className="col-9">
                      <h3>{report.type}</h3>
                      <p>{report.body}</p>
                    </div>
                    <div className="col-3">
                      {/* <div className="row mb-3">
                        {!report.seen ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}
                      </div> */}
                      <div className="row">
                        <h6>Status: {report.status}</h6>
                      </div>
                    </div>
                    <div className="row">
                      {/* <button
                        className="btn btn-outline-secondary ml-3 mb-3"
                        onClick={() => setFollowupOpen(true)}
                      >
                        Add follow-up to report?
                      </button> */}
                      <div
                        class="accordion accordion-flush"
                        id="accordionFlushExample"
                      >
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="flush-headingOne">
                            <button
                              class="accordion-button collapsed mb-3"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={'#flush-collapseOne' + index}
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              Add follow-up to previous report?
                            </button>
                          </h2>
                          <div
                            id={'flush-collapseOne' + index}
                            class="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div class="accordion-body">
                              <div class="mb-3">
                                <label
                                  for="exampleFormControlTextarea1"
                                  class="form-label"
                                >
                                  What do you want to add?
                                </label>
                                <textarea
                                  class="form-control"
                                  id={'followUpTextArea' + index}
                                  rows="2"
                                  onChange={(e) => {
                                    setFollowupBody(e.target.value);
                                    console.log(followupBody);
                                  }}
                                ></textarea>
                                <div className="row">
                                  <button
                                    className="btn btn-outline-primary mt-3"
                                    onClick={() =>
                                      handleAddFollowup(report._id)
                                    }
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default ReportsIssued;
