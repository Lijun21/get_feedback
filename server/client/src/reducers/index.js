import { combineReducers } from 'redux';
import { reducer as ReduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  form: ReduxForm
});
