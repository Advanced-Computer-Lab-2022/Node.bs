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

export const getCourseReviews = (courseId) => {
  return BaseAxios.post('/course/courseReviews', courseId);
};
export const createLesson = (body) => {
  return BaseAxios.post('/course/lesson', body);
};
export const createTest = (test) => {
  return BaseAxios.post('/instructor/addTest', test);
};
export const getMyCourses = (corporate, id) => {
  if (corporate) {
    return BaseAxios.get('/corporate/courses?id=' + id);
  } else {
    return BaseAxios.get('/individual/courses?id=' + id);
  }
};
export const submitTest = (corporate, submission, traineeId, courseId) => {
  if (corporate) {
    return BaseAxios.post('/corporate/test/submit', {
      submission,
      traineeId,
      courseId,
    });
  } else {
    return BaseAxios.post('/individual/test/submit', {
      submission,
      traineeId,
      courseId,
    });
  }
};

export const createResource = (body) => {
  return BaseAxios.post('/course/addresource', body);
};
