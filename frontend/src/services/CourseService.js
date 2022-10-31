import BaseAxios from '../requester/BaseAxios';
import { stringify } from 'qs';

export const getAll = () => {
  return BaseAxios.get('/course');
};

export const filter = (query) => {
  return BaseAxios.post('/course/filter', query);
};

export const search = (query) => {
  console.log(query);
  return BaseAxios.post('/course/search', query);
};

export const create = (course) => {
  return BaseAxios.post('/course', course);
};
