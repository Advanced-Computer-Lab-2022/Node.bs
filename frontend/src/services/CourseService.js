import BaseAxios from '../requester/BaseAxios';

export const getAll = () => {
  return BaseAxios.get('/course');
};

export const filter = (query) => {
  return BaseAxios.get('/course/filter', { data: query });
};

export const search = (query) => {
  return BaseAxios.get('/course/search', { data: query });
};

export const create = (course) => {
  return BaseAxios.post('/course', course);
};
