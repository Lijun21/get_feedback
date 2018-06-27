import { FETCH_USER } from '../actions/types';

//to make sure the function return null or false or user modle
export default function(state = null, action) {
    //all the actions that this reducer get call with, emails it receives
    // console.log(action);
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}
  