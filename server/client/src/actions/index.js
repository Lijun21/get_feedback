import axios from 'axios';
import { FETCH_USER, FETCH_SURVEY } from './types';

//redux-thunk, whenever see action creator return function, add dispatch function to it
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    // console.log(res);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchSurvey = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    console.log(res);
    dispatch({ type: FETCH_SURVEY, payload: res.data });
};


  
  