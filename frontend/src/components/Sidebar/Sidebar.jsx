import React from "react";
import SidebarButton from "./SidebarButton/SidebarButton";
import "./Sidebar.scss";
import {
  faDoorOpen,
  faLaptopHouse,
  faCog,
  faClipboard,
  faMedal,
  faKey,
  faGraduationCap,
  faChalkboardTeacher,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountryDropdown from "./../util/CountryDropdown/CountryDropdown";
import { useSelector } from "react-redux";
import { Multiselect } from "multiselect-react-dropdown";
import {
  AdminService,
  createAdmin,
  createCorporateTrainee,
} from "./../../services/AdminService";
import { create } from "../../services/CourseService";

function Sidebar() {
  const userInfo = useSelector((state) => state.user);
  const allSubjects = useSelector((state) => state.subjects.all);
  const currency = useSelector(
    (state) => state.region.selectedRegion.currencyCodes[0]
  );

  return (
    <div class="container-fluid">
      <div class="logo">
        <h6 className="brand">
          <FontAwesomeIcon icon={faDoorOpen} /> CourseIndoors
        </h6>
      </div>
      <div className="sidebarButtonContainer">
        <SidebarButton icon={faLaptopHouse} label="Dashboard" primary />
        <SidebarButton icon={faMedal} label="Certificates" />
        <SidebarButton icon={faClipboard} label="Tests" />
        <SidebarButton icon={faCog} label="Settings" />
        <CountryDropdown />

        {userInfo.type === "admin" ? (
          <>
            {" "}
            <SidebarButton
              icon={faChalkboardTeacher}
              label="Add Instructor"
              toBeAdded="Instructor"
            />
            <div
              class="modal fade"
              id="addInstructorModal"
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
                      Add Instructor
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div className="row">
                        <div className="col-12">
                          <label for="inputUsername" class="form-label">
                            Username
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputUsername"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <label for="inputPassword" class="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="inputPassword"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-12">
                          <label for="inputPassword" class="form-label">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="inputConfirmationPassword"
                          />
                          {console.log(
                            document.getElementById("inputUsername")?.value
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={async () =>
                          document.getElementById("inputPassword").value ===
                          document.getElementById("inputConfirmationPassword")
                            .value
                            ? await createAdmin({
                                username:
                                  document.getElementById("inputUsername")
                                    .value,
                                password:
                                  document.getElementById("inputPassword")
                                    .value,
                              })
                            : console.log("Passwords do not match")
                        }
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <SidebarButton
              icon={faGraduationCap}
              label="Add Corporate Individual"
              toBeAdded="CorporateIndividual"
            />
            <div
              class="modal fade"
              id="addCorporateIndividualModal"
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
                      Add Corporate Individual
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div className="row">
                        <div className="col-12">
                          <label for="inputUsernameCorp" class="form-label">
                            Username
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputUsernameCorp"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <label for="inputPasswordCorp" class="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="inputPasswordCorp"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-12">
                          <label
                            for="inputConfirmationPasswordCorp"
                            class="form-label"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="inputConfirmationPasswordCorp"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={async () =>
                          document.getElementById("inputPasswordCorp").value ===
                          document.getElementById(
                            "inputConfirmationPasswordCorp"
                          ).value
                            ? await createCorporateTrainee({
                                username:
                                  document.getElementById("inputUsernameCorp")
                                    .value,
                                password:
                                  document.getElementById("inputPasswordCorp")
                                    .value,
                              })
                            : console.log("Passwords do not match")
                        }
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <SidebarButton
              icon={faKey}
              label="Add Adminstrator"
              toBeAdded="Adminstrator"
            />
            <div
              class="modal fade"
              id="addAdminstratorModal"
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
                      Add Adminstator
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div className="row">
                        <div className="col-12">
                          <label for="inputUsernameAdmin" class="form-label">
                            Username
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputUsernameAdmin"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <label for="inputPasswordAdmin" class="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="inputPasswordAdmin"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-12">
                          <label
                            for="inputConfirmationPasswordAdmin"
                            class="form-label"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="inputConfirmationPasswordAdmin"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={async () =>
                          document.getElementById("inputPasswordAdmin")
                            .value ===
                          document.getElementById(
                            "inputConfirmationPasswordAdmin"
                          ).value
                            ? await createCorporateTrainee({
                                username:
                                  document.getElementById("inputUsernameAdmin")
                                    .value,
                                password:
                                  document.getElementById("inputPasswordAdmin")
                                    .value,
                              })
                            : console.log("Passwords do not match")
                        }
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {userInfo.type === "instructor" ? (
          <>
            <SidebarButton
              icon={faBook}
              label="Add Course"
              toBeAdded="Course"
            />
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
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <label for="inputCourseTitle" class="form-label">
                            Course Title
                          </label>
                          <input
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
                            onSelect={function noRefCheck() {}}
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
                            Price in {currency}
                          </label>
                          <input
                            type="number"
                            class="form-control"
                            id="inputPrice"
                          />
                        </div>
                        <div className="col-9">
                          <label for="inputSubtitles" class="form-label">
                            Subtitles
                          </label>
                          <input
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
                            type="text"
                            class="form-control"
                            id="inputDescription"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={async () => {
                          await create({
                            title:
                              document.getElementById("inputCourseTitle").value,
                            hours: document.getElementById("inputHours").value,
                            subjects:
                              document.getElementById("inputSubjects")
                                .selectedValues,
                            subtitles: [
                              ...document
                                .getElementById("inputSubtitles")
                                .value.split(","),
                            ],
                            price: document.getElementById("inputPrice").value,
                            description:
                              document.getElementById("inputDescription").value,
                          });
                        }}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <SidebarButton icon={faCog} label="Test" toBeAdded="Instructor" />
        <div
          class="modal fade modal-fullscreen"
          id="addInstructorModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          // aria-labelledby="staticBackdropLabel"
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
                      style={{ width: "150px", height: "150px" }}
                    />
                    <div className="row mb-3">
                      <div className="col-6">
                        <h1>Intro to Python</h1>
                      </div>
                      <div className="col-6 text-end">
                        <h3>60 USD</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 text-end">
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/kqtD5dpn9C8"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>

                <div className="row mb-3">
                  <p style={{ width: "50%" }}>
                    This is a cool course.This is a cool course.This is a cool
                    course.This is a cool course.This is a cool course.This is a
                    cool course.This is a cool course.This is a cool course.This
                    is a cool course.This is a cool course.This is a cool
                    course.This is a cool course.This is a cool course.This is a
                    cool course.This is a cool course.This is a cool course.This
                    is a cool course.This is a cool course.This is a cool
                    course.This is a cool course.This is a cool course.This is a
                    cool course.This is a cool course.This is a cool course.This
                    is a cool course.This is a cool course.This is a cool
                    course.
                  </p>
                </div>
                <div className="row mb-3">
                  <h6 style={{ color: "#cccc" }}>20 hours for completion</h6>
                </div>
                <div className="row">
                  <div class="accordion" id="subtitleAccordion">
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
                          What is Python?
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
                            <div className="row">
                              <div className="col-6">
                                <li>Installing Python</li>
                              </div>
                              <div className="col-6 text-end">10:00</div>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                <li>Understanding Computer Science</li>
                              </div>

                              <div className="col-6 text-end">10:00</div>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingTwo">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Accordion Item #2
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <strong>
                            This is the second item's accordion body.
                          </strong>{" "}
                          It is hidden by default, until the collapse plugin
                          adds the appropriate classes that we use to style each
                          element. These classes control the overall appearance,
                          as well as the showing and hiding via CSS transitions.
                          You can modify any of this with custom CSS or
                          overriding our default variables. It's also worth
                          noting that just about any HTML can go within the{" "}
                          <code>.accordion-body</code>, though the transition
                          does limit overflow.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingThree">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Accordion Item #3
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <strong>
                            This is the third item's accordion body.
                          </strong>{" "}
                          It is hidden by default, until the collapse plugin
                          adds the appropriate classes that we use to style each
                          element. These classes control the overall appearance,
                          as well as the showing and hiding via CSS transitions.
                          You can modify any of this with custom CSS or
                          overriding our default variables. It's also worth
                          noting that just about any HTML can go within the{" "}
                          <code>.accordion-body</code>, though the transition
                          does limit overflow.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profileDetails"> </div>
    </div>
  );
}

export default Sidebar;
