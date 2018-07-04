import { combineReducers } from 'redux';
import { reducer as ReduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';

export default combineReducers({
  auth: authReducer,
  form: ReduxForm,
  survey: surveyReducer
});
