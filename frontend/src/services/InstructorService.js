import BaseAxios from '../Requester/BaseAxios';

export const getInstructorById = (instructorId) => {
  return BaseAxios.get(`/instructor/byId?id=${instructorId}`);
};

export const getReviews = (instructorId) => {
  return BaseAxios.post('/instructor/instructorReviews', instructorId);
};

export const updateInstructorTerms = (instructorId) => {
  return BaseAxios.patch(`/instructor/${instructorId}`, { accepted: true });
};
<<<<<<< Updated upstream
=======

export const getInstructorReportsIssued = (body) => {
  return BaseAxios.post('/instructor/reportsIssued', body);
};

export const getMoneyOwedPerMonth = (instructorId) => {
  return BaseAxios.post('/instructor/getMoneyOwedPerMonth', instructorId);
};

export const updateOverview = (instructorId, overview) => {
  return BaseAxios.post('/instructor/updateOverview', instructorId, overview);
};

export const updatePassword = (instructorId, password) => {
  return BaseAxios.post('/instructor/updatePassword', instructorId, password);
};
>>>>>>> Stashed changes
