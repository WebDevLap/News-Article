export const getUserDataLS = (arg: string, defType: any) => {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data)[arg] : defType;
};
