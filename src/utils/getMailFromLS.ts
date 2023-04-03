export const getMailFromLS = (arg: string, defType: string) => {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data)[arg] : defType;
};
