//show users their form inputs
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, ({ label, name }) => {
        return (
        <div key={name}>
            <label>{label}</label>
            <div>
                {formValues[name]}
            </div>
        </div>
        )
    })
    return (
        <div>
            <h5>please confirm your entries</h5>
            <div>
                {reviewFields}
            </div>
            <button
            className="yellow darken-3 white-text btn-flat"
            onClick={onCancel}
            >
                Back
            </button>
            <button 
            onClick={ () => submitSurvey(formValues, history)}
            className="green darken-3 white-text btn-flat right" type="submit">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

function MapStateToProps ({ form }) {
    // console.log(form); why it print out 2 times here??????
    return { formValues: form.surveyForm.values };
}
  

export default connect(MapStateToProps, actions)(withRouter(SurveyFormReview));