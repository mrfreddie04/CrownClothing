export const loggerMiddleware = (store:any) => (next:any) => (action:any) => {
  //middleware logic
  if(!action.type) {
    return next(action);
  }
  console.log("type", action.type)
  console.log("payload", action.payload)
  console.log("current state",store.getState());

  next(action); //synchronous, blocking call

  console.log("updated state",store.getState());
}

//how thunk works
// const thunkMiddleware = (store:any) => (next:any) => (action:any) => {
//   if(typeof action === "function") {
//     action(dispatch, store);
//   }
// }  