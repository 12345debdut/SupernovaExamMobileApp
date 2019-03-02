const mathReducer=(state={
  value:1
},action)=>{
  switch (action.type) {
    case "ADD":
      state={
        ...state,
        value:action.payload
      };
      break;
  }
  return state;
};
export default mathReducer;
