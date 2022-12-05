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
