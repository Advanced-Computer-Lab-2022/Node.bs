import BaseAxios from "../Requester/BaseAxios";

export const createAdmin = (admin) => {
  return BaseAxios.post("/admin", admin);
};

export const createCorporateTrainee = (trainee) => {
  return BaseAxios.post("/admin/corporate", trainee);
};

export const createInstructor = (instructor) => {
  return BaseAxios.post("/admin/instructor", instructor);
};

export const resetPassword = (id) => {
  return BaseAxios.post("/admin/resetPassword", { id });
};

export const markReportAsPending = (reportId) => {
  return BaseAxios.post("/admin/markReportAsPending", reportId);
};
export const markReportAsResolved = (reportId) => {
  return BaseAxios.post("/admin/markReportAsResolved", reportId);
};

export const getCorporateTrainees = () => {
  return BaseAxios.post("/admin/getCorporateTrainees");
};
export const grantAccessToCourse = (corporateTraineeId, courseId) => {
  return BaseAxios.post(
    "/admin/grantAccessToCourse",
    corporateTraineeId,
    courseId
  );
};

export const returnCoursesFromSearch = (query) => {
  return BaseAxios.post("/admin/searchCourses", query);
};

export const applyPromotionOnCourses = (
  courses,
  promotion,
  promotionEndDate
) => {
  return BaseAxios.post(
    "/admin/applyPromotion",
    courses,
    promotion,
    promotionEndDate
  );
};

export const getRefundRequests = () => {
  return BaseAxios.post("/admin/refundRequests");
};

export const grantRefund = (individualTraineeId, courseId) => {
  return BaseAxios.post("/admin/grantRefund", individualTraineeId, courseId);
};

export const sendCertificate = (
  courseName,
  traineeName,
  instructors,
  email,
  date
) => {
  return BaseAxios.post(
    "/admin/sendCertificate",
    courseName,
    traineeName,
    instructors,
    email,
    date
  );
};
