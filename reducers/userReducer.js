const userReducer=(state={
    batchtiming:'',
    class:'',
    email:'',
    imageurl:'',
    name:'',
    phonenumber:'',
    username:'',
    wbrating:0,
    wbpercentage:0,
    jerating:0,
    jepercentage:0
},action)=>{
  switch (action.type) {
    case "MODIFY":
      //  console.log("hii");
        //console.log(action.payload.email+"  "+action.payload.imageurl+"  "+action.payload.username+" ");
        state={
          ...state,
          batchtiming:action.payload.batchtiming,
          class:action.payload.class,
          email:action.payload.email,
          imageurl:action.payload.imageurl,
          name:action.payload.name,
          phonenumber:action.payload.phonenumber,
          username:action.payload.username,
          wbrating:action.payload.wbrating,
          wbpercentage:action.payload.wbpercentage,
          jerating:action.payload.jerating,
          jepercentage:action.payload.jepercentage
        };
        break;
    case "JEEMAINRATE":
      console.log("in jeemainrate"+action.payload.jerating+action.payload.jepercentage)
      state={
        ...state,
        jerating:action.payload.jerating,
        jepercentage:action.payload.jepercentage
      };
      break;
    case "WBJEERATE":
    console.log("in wbjee rate")
      state={
        ...state,
        wbrating:action.payload.wbrating,
        wbpercentage:action.payload.wbpercentage
      };
      break;
  }
  //console.log(state);
  return state;
};
export default userReducer;
