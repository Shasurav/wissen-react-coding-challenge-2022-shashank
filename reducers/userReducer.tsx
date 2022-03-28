const initialState = {
  users: [],
  isLoggedIn: false,
  status: '',
  expireTime: 0,
};

const userReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        users: action.payload,
      };
    case 'SET_LOGGEDIN':
      console.log('vvvvvvvvvvvvvv');
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
      console.log('called', action.payload);
      return {
        ...state,
        expireTimer: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
