
export const  loginReducer = (state,action) =>{

    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...state,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...state,
          userToken: action.token,
          userName: action.userName,
          phoneNumber: action.phoneNumber,
          isLoading: false,
        };
      case "SIGNUP":
        return {
          ...state,
          userToken: action.token,
          userName: action.userName,
          phoneNumber: action.phoneNumber,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...state,
          isLoading: false,
        };

      default:
        return state;
    }
}