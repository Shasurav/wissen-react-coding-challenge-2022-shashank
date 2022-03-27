export const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const logout = () => {
  localStorage.clear();
};

export const getTableHeader = (data) => {
  let headers = [];
  for (let key in data[0]) {
    headers.push(key);
  }
  return headers;
};
