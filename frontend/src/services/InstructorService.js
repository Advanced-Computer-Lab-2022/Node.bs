import BaseAxios from "../Requester/BaseAxios";

export const getInstructorById = (instructorId) => {
  return BaseAxios.get(`/instructor/byId?id=${instructorId}`);
};

export const getReviews = (instructorId) => {
  return BaseAxios.post("/instructor/instructorReviews", instructorId);
};

export const updateInstructorTerms = (instructorId) => {
  return BaseAxios.patch(`/instructor/${instructorId}`, { accepted: true });
};

export const getInstructorReportsIssued = (body) => {
  return BaseAxios.post("/instructor/reportsIssued", body);
};

export const getMoneyOwedPerMonth = (instructorId) => {
  return BaseAxios.post("/instructor/getMoneyOwedPerMonth", instructorId);
};