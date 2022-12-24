import BaseAxios from "../Requester/BaseAxios";

export const createNewIndividualTrainee = (newIndividualTrainee) => {
  return BaseAxios.post(
    "/individual/newIndividualTrainee",
    newIndividualTrainee
  );
};

export const viewRegisteredCourse = (individualTraineeId) => {
  return BaseAxios.get(
    "individual/registeredCoursesIndividual",
    individualTraineeId
  );
};
export const registerToCourse = (individualTraineeId, courseId) => {
  return BaseAxios.post(
    "/individual/registerToCourseIndividual",
    individualTraineeId,
    courseId
  );
};

export const reviewCourseIndividual = (
  individualTraineeId,
  courseId,
  review
) => {
  return BaseAxios.post(
    "/individual/addCourseReviewIndividual",
    individualTraineeId,
    courseId,
    review
  );
};

export const reviewInstructorIndividual = (
  individualTraineeId,
  instructorId,
  review
) => {
  return BaseAxios.post(
    "/individual/addInstructorReviewIndividual",
    individualTraineeId,
    instructorId,
    review
  );
};

export const getIndividualTraineeReportsIssued = (individualTraineeId) => {
  return BaseAxios.post("/individual/reportsIssued", individualTraineeId);
};

export const requestRefund = (individualTraineeId, courseId) => {
  return BaseAxios.post(
    "/individual/requestRefund",
    individualTraineeId,
    courseId
  );
};

export const getWalletAmount = (individualTraineeId) => {
  return BaseAxios.post("/individual/wallet", individualTraineeId);
};

export const markResourceAsSeen = (resourceId, traineeId, courseId) => {
  return BaseAxios.post(
    "/individual/markResourceAsSeen",
    {resourceId,
    traineeId,
    courseId}
  );
};

