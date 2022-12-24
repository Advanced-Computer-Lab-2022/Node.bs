import {
  faLaptopHouse,
  faCog,
  faClipboard,
  faMedal,
  faKey,
  faGraduationCap,
  faChalkboardTeacher,
  faDoorOpen,
  faFlag,
  faEyeSlash,
  faPerson,
  faPercent,
  faPercentage,
  faPlusCircle,
  faMoneyBill1Wave,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarButton from "../../Sidebar/SidebarButton/SidebarButton";
import AddForm from "../../AddForm/AddForm";
import {
  createCorporateTrainee,
  createInstructor,
  createAdmin,
  markReportAsResolved,
  markReportAsPending,
  getCorporateTrainees,
  grantAccessToCourse,
  returnCoursesFromSearch,
  applyPromotionOnCourses,
  getRefundRequests,
} from "../../../services/AdminService";
import "./AdminSidebar.scss";
import { useState } from "react";
import Swal from "sweetalert2";
import { getAllReports } from "./../../../services/CourseService";
import ReactModal from "react-modal";
const AdminSidebar = () => {
  const addInstructor = async (body) => {
    await createInstructor(body);
  };
  const addCorporateTrainee = async (body) => {
    await createCorporateTrainee(body);
  };
  const addAdminstrator = async (body) => {
    await createAdmin(body);
  };

  const [openResolveReports, setOpenResolveReports] = useState(false);
  const [allReports, setAllReports] = useState({});

  const getAllReportsSubmitted = async () => {
    const returnedReports = await getAllReports();

    setAllReports(returnedReports);
  };

  const handleMarkReportAsResolved = async (reportId) => {
    const reportToBeResolved = await markReportAsResolved({
      reportId: reportId,
    });
    if (reportToBeResolved) {
      Swal.fire("Success", "Report has been markes as resolved", "success");
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
  const handleMarkReportAsPending = async (reportId) => {
    const reportToBeResolved = await markReportAsPending({
      reportId: reportId,
    });
    if (reportToBeResolved) {
      Swal.fire("Success", "Report has been markes as resolved", "success");
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  ////////////////////////REQUESTS//////////////////////
  const [openRequests, setOpenRequests] = useState(false);
  const [corporateTrainees, setCorporateTrainees] = useState([]);
  const handleGetCourseRequests = async () => {
    const corporateTrainees = await getCorporateTrainees();
    console.log(corporateTrainees.data);
    setCorporateTrainees(corporateTrainees.data);
  };

  const handleGrantAccess = async (corporateTraineeId, courseId) => {
    const callFunction = await grantAccessToCourse({
      corporateTraineeId: corporateTraineeId,
      courseId: courseId,
    });

    if (callFunction.status == 200) {
      Swal.fire(
        "Success",
        "Course has been granted to corporate trainee",
        "success"
      );
    } else {
      Swal.fire("An error has occurred", "Something went wrong", "error");
    }
  };

  ////////////////////PROMOTIONS////////////////////////

  const [openPromotion, setOpenPromotion] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseSearchResult, setCourseSearchResult] = useState([]);
  const handleSearchCourses = async () => {
    const result = await returnCoursesFromSearch({ query: searchQuery });
    setCourseSearchResult(result.data);
    console.log(result.data);
  };

  const [coursesToApplyPromotion, setCoursesToApplyPromotion] = useState([]);
  const [promotion, setPromotion] = useState(0.0);
  const [promotionDate, setPromotionDate] = useState("12/12/2030");

  const handleApplyPromotion = async () => {
    const apply = await applyPromotionOnCourses({
      courses: coursesToApplyPromotion,
      promotion: promotion,
      promotionEndDate: promotionDate,
    });
    if (apply) {
      Swal.fire(
        "Promotion Applied",
        "Promotion has been applied on courses in list",
        "success"
      );
    } else {
      Swal.fire("Error occurred", "Something went wrong", "error");
    }
  };

  /////////////////////REFUNDS///////////////////////
  const [openRefund, setOpenRefund] = useState(false);
  const [traineesRequesting, setTraineesRequesting] = useState([]);

  const handleGetRefundRequests = async () => {
    const query = await getRefundRequests();
    console.log(query.data);
    if (query) {
      setTraineesRequesting(query.data);
    }
  };
  return (
    <div class="container-fluid sidebar-container">
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
        <SidebarButton
          icon={faChalkboardTeacher}
          label="Add Instructor"
          toBeAdded="Instructor"
        />
        <AddForm toBeAdded="Instructor" handleSubmit={addInstructor} />
        <SidebarButton
          icon={faGraduationCap}
          label="Add Corporate Trainee"
          toBeAdded="CorporateTrainee"
        />
        <AddForm
          toBeAdded="CorporateTrainee"
          handleSubmit={addCorporateTrainee}
        />
        <SidebarButton
          icon={faKey}
          label="Add Adminstrator"
          toBeAdded="Adminstrator"
        />
        <AddForm toBeAdded="Adminstrator" handleSubmit={addAdminstrator} />

        <SidebarButton
          icon={faFlag}
          label="Resolve Reports"
          click={() => {
            setOpenResolveReports(true);
            getAllReportsSubmitted();
          }}
        />

        <ReactModal
          isOpen={openResolveReports}
          onRequestClose={() => setOpenResolveReports(false)}
        >
          <h3>Reports submitted</h3>
          <hr />

          {console.log(
            allReports.data?.map((report) => {
              console.log(report);
            })
          )}

          {allReports.data?.map((report) => (
            <div class="row">
              <div className="col-6">
                <h3>
                  {report.instructor?.firstName} {report.instructor?.lastName}
                </h3>

                <h3>
                  {report.individualTrainee?.firstName}{" "}
                  {report.individualTrainee?.lastName}
                </h3>

                <h3>
                  {report.corporateTrainee?.firstName}{" "}
                  {report.corporateTrainee?.lastName}
                </h3>
              </div>
              {/* <div className="col-4"> </div> */}
              <div className="col-6">
                <h6 style={{ fontStyle: "bold" }}>
                  Report Status: {report.status}
                </h6>
                <button
                  className="btn btn-outline-success"
                  onClick={() => handleMarkReportAsResolved(report._id)}
                >
                  Mark as Resolved
                </button>{" "}
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleMarkReportAsPending(report._id)}
                >
                  Mark as Pending
                </button>
              </div>
              {!report.seen ? (
                <>
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    style={{ marginLeft: "15%", textAlign: "right" }}
                  />
                </>
              ) : (
                <></>
              )}

              <br />
              <h5>Report concerning the course: {report?.course?.title}</h5>
              <p>Type: {report.type}</p>
              <p style={{ fontStyle: "italic", color: "black" }}>
                {report.body}
              </p>
              <div className="container m-3">
                <p>followups: </p>
                {report.followups?.map((followup) => (
                  <>
                    <h6> @ {followup?.dateAdded}</h6>
                    <h6
                      style={{
                        paddingLeft: "2%",
                        fontStyle: "italic",
                        color: "#5A5A5A.",
                      }}
                    >
                      {followup?.followupBody}
                    </h6>
                    <hr />
                  </>
                ))}
              </div>
              <hr />
              <hr />
            </div>
          ))}
        </ReactModal>

        <SidebarButton
          icon={faPerson}
          label="Grant Access to Courses"
          click={() => {
            setOpenRequests(true);
            handleGetCourseRequests();
          }}
        />
        <ReactModal
          isOpen={openRequests}
          onRequestClose={() => setOpenRequests(false)}
        >
          <h1>Requested Courses</h1>
          <hr />
          {corporateTrainees.map(
            (CT) =>
              CT.requestedCourses &&
              CT.requestedCourses.length > 0 && (
                <div className="row">
                  <h3>username: {CT.username}</h3>
                  <p style={{ fontStyle: "italic" }}>
                    pending requests to courses:{" "}
                  </p>

                  {CT.requestedCourses.map((requestedCourse) => (
                    <div className="row m-3">
                      <div className="col-8">
                        <h4 style={{ fontStyle: "italic" }}>
                          {requestedCourse.title}
                        </h4>
                      </div>
                      <div className="col-4">
                        <button
                          className="btn btn-outline-success btn-md m-2"
                          onClick={() =>
                            handleGrantAccess(CT._id, requestedCourse._id)
                          }
                        >
                          Grant Access
                        </button>
                      </div>
                      <hr />
                    </div>
                  ))}

                  <hr />
                  <hr />
                </div>
              )
          )}
        </ReactModal>

        <SidebarButton
          icon={faPercentage}
          label="Set a promotion on courses"
          click={() => {
            handleSearchCourses();
            setOpenPromotion(true);
          }}
        />
        <ReactModal
          isOpen={openPromotion}
          onRequestClose={() => setOpenPromotion(false)}
        >
          <h1>Select courses to apply promotion on</h1>
          <hr />
          <div className="row">
            <div className="col-8">
              {" "}
              <input
                placeholder="Promotion percentage"
                type="number"
                className="m-2"
                onChange={(e) => {
                  setPromotion(e.target.value);
                  console.log(promotion);
                }}
              />
              <input
                placeholder="End date"
                type="date"
                className="m-2"
                onChange={(e) => {
                  setPromotionDate(e.target.value);
                  console.log(promotionDate);
                }}
              />
            </div>
            <div className="col-4">
              <input
                placeholder="Search.."
                className="input m-2"
                onChange={(e) => {
                  handleSearchCourses();
                  setSearchQuery(e.target.value);
                }}
              />
            </div>
            <hr />
          </div>
          {courseSearchResult.map((course) => (
            <div className="row m-2">
              <div className="col-4">
                {" "}
                <h3>{course.title}</h3>
              </div>
              <div className="col-5"></div>
              <div className="col-3">
                <button
                  className="btn btn-outline-success m-2"
                  style={{ border: "none" }}
                  onClick={() => {
                    {
                      !coursesToApplyPromotion.includes(course._id) &&
                        setCoursesToApplyPromotion([
                          ...coursesToApplyPromotion,
                          course._id,
                        ]);
                      Swal.fire(
                        "Added Course!",
                        "Course has been added to the promotion list",
                        "success"
                      );
                    }
                    {
                      coursesToApplyPromotion.includes(course._id) &&
                        Swal.fire(
                          "Course Included",
                          "Course already included in promotion list",
                          "info"
                        );
                    }
                    console.log(coursesToApplyPromotion);
                  }}
                >
                  <h3>
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </h3>
                </button>
              </div>
              <hr />
            </div>
          ))}
          <div className="row">
            <button
              className="btn btn-outline-success"
              onClick={() => handleApplyPromotion()}
            >
              Apply promotion
            </button>
          </div>
        </ReactModal>

        <SidebarButton
          icon={faMoneyBillTransfer}
          label="Resolve Refund Requests"
          click={() => {
            setOpenRefund(true);
            handleGetRefundRequests();
          }}
        />
        <ReactModal
          isOpen={openRefund}
          onRequestClose={() => setOpenRefund(false)}
   
        >
          <h1>Refund Requests</h1>
          <hr />
          {traineesRequesting.map((trainee) => (
            <div className="row">
              <div className="">
                <h3> {trainee.firstName + " " + trainee.lastName}</h3>
                <div className="row m-2">
                  {trainee.refundRequests.map((request) => (
                    <>
                    <div className="col-10">
                    <h6>On the course: {request.course?.title} {console.log(request)}</h6>
                    <h6>@ {request.requestedAt}</h6>
                    <h6 style={{color: "green", fontWeight: "bolder"}}>refund value: {request.course?.price}</h6>
                    </div>
                    <div className="col-2">
                    <button className="btn btn-outline-success">
                      Grant Refund
                    </button>
                   
                  </div>
                  <hr />
                  </>
                 ))}
                </div>
              </div>
           

              <hr />
            </div>
          ))}
        </ReactModal>
      </div>
    </div>
  );
};

export default AdminSidebar;
