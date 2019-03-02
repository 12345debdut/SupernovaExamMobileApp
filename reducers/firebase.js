const firebaseReducer=(state={
  firebase:{}
},action)=>{
  switch (action.type) {
    case "Firebase":
      state={
        ...state,
        firebase:action.payload
      };
      break;
  }
  return state;
};
export default firebaseReducer;
