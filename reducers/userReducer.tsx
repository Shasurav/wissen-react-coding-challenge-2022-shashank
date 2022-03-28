const initialState = {
  users: [],
  isLoggedIn: false,
  status: '',
  expireTime: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        users: action.payload,
      };
    case 'SET_LOGGEDIN':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    case 'SET_TIMER':
      return {
        ...state,
        expireTimer: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
