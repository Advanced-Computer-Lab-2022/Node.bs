import BaseAxios from "../Requester/BaseAxios";

export const createNewCorporateTrainee = (newCorporateTrainee) => {
  return BaseAxios.post("/corporate/newCorporateTrainee", newCorporateTrainee);
};

export const viewRegisteredCourse = (corpoateTraineeId) => {
  return BaseAxios.get(
    "/corporate/registeredCoursesCorporate",
    corpoateTraineeId
  );
};

export const registerToCourse = (corpoateTraineeId, courseId) => {
  return BaseAxios.post(
    "/corporate/registerToCourseCorporate",
    corpoateTraineeId,
    courseId
  );
};

export const reviewCourseCorporate = (corporateTraineeId, courseId, review) => {
  return BaseAxios.post(
    "/corporate/addCourseReviewCorporate",
    corporateTraineeId,
    courseId,
    review
  );
};

export const reviewInstructorCorporate = (
  corpoateTraineeId,
  instructorId,
  review
) => {
  return BaseAxios.post(
    "/corporate/addInstructorReviewCorporate",
    corpoateTraineeId,
    instructorId,
    review
  );
};
