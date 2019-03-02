const index=(state={
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
    case "ZERO":
    state={
      value:0
    }
    break;
  }
  return state;
};
export default index;
