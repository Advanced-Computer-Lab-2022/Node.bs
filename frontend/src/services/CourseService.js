import BaseAxios from '../Requester/BaseAxios';

export const getAll = () => {
  return BaseAxios.get('/course');
};

export const getCourseById = (id) => {
  return BaseAxios.get('/course/byId?id=' + id);
};

export const filter = (instructorId) => {
  return BaseAxios.post('/course/filter?instructorId=' + instructorId);
};

export const search = (query) => {
  console.log(query);
  return BaseAxios.post('/course/search', query);
};

export const create = (course) => {
  return BaseAxios.post('/course', course);
};

export const updateCourse = (id, updatedCourse) => {
  return BaseAxios.put('/course?id=' + id, updatedCourse);
};

export const updateSubtitle = (id, updatedSubtitle) => {
  return BaseAxios.put('/course/subtitle?id=' + id, updatedSubtitle);
};
