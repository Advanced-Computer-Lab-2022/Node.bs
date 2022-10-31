import BaseAxios from '../Requester/BaseAxios';

export const createAdmin = (admin) => {
  return BaseAxios.post('/admin', admin);
};

export const createCorporateTrainee = (trainee) => {
  return BaseAxios.post('/admin/corporate', trainee);
};

export const createInstructor = (instructor) => {
  return BaseAxios.post('/admin/instructor', instructor);
};
