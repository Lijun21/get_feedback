//show users their form inputs
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues }) => {
    const reviewFields = _.map(formFields)
    return (
        <div>
            <h5>please confirm your entries</h5>
            <button
            className="yellow darken-3 btn-flat"
            onClick={onCancel}
            >
                Back
            </button>
        </div>
    )
}

function MapStateToProps ({ form }) {
    // console.log(form);
    return { formValues: form.surveyForm.values };
}
  

export default connect(MapStateToProps)(SurveyFormReview);