const wbindex=(state={
  value:0
},action)=>{
  switch (action.type) {
    case "INCREAMENT":
      state={
        value:state.value+action.payload
      };
      break;
    case "JUMBLED":
      state={
        value:action.payload
      }
      break;
    case "ZEROWB":
    state={
      value:0
    }
    break;
  }
  return state;
};
export default wbindex;
