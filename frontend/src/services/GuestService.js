import BaseAxios from '../Requester/BaseAxios';

export const signUp = (userInfo) => {
  return BaseAxios.post('/guest/signup', userInfo);
};

export const signIn = (userInfo) => {
  return BaseAxios.post('/guest/signin', userInfo);
};
export const logOut = () => {
  sessionStorage.setItem('id', '');
  sessionStorage.setItem('type', '');
  localStorage.setItem('id', '');
  localStorage.setItem('type', '');
  return BaseAxios.post('/guest/logout');
};
