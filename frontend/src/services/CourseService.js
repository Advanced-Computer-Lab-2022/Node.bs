import BaseAxios from '../Requester/BaseAxios';

export const getAll = () => {
  return BaseAxios.get('/course');
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
