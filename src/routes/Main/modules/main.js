// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_DATA = 'LOAD_DATA'
let firebase = require("firebase");
let config = {
    apiKey: "AIzaSyA-HlcV4jtbhB0sL2D74SK9RVH9oZIQgVU",
    authDomain: "js-fuseday-2016-stream.firebaseapp.com",
    databaseURL: "https://js-fuseday-2016-stream.firebaseio.com",
    storageBucket: "js-fuseday-2016-stream.appspot.com",
    messagingSenderId: "533084422648"
};

firebase.initializeApp(config);
let database = firebase.database();
// ------------------------------------
// Actions
// ------------------------------------
export function loadDataAction (value = {}) {
  return {
    type    : LOAD_DATA,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

export const loadData = () => {
  return (dispatch, getState) => {

    return firebase.database().ref('/stream').once('value')
      .then(function(snapshot) {
        console.log("once",snapshot.val());
        dispatch(loadDataAction(snapshot.val()));
      });

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     dispatch(loadDataAction({ name: 'name', type: 'type' }))
    //     resolve()
    //   }, 200)
    // })
  }
}

export const actions = {
  loadData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_DATA] : (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0

export default function mainReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
