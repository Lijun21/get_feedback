import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmail from '../../utils/validateEmails';

import formFields from './formFields';

class SurveyForm extends Component {
    renderFields(){
        return _.map(formFields, ({label, name}) => {
            return (
                <Field 
                key={name}
                component={SurveyField} 
                type="text" 
                label={label}
                name={name}
                />
            )
        })
    }
//onSubmit={this.props.handleSubmit(values => console.log(values))}
    render(){
        return (
            <div>
                <form onSubmit={this.props.handleSubmit( () => this.props.onSurveySubmit() )}
                >
                    {this.renderFields()}
                    <Link to='/surveys' className="red btn-flat white-text">Cancel</Link>
                    <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

function validate(values){
    const errors = {};
    //if no emails provided, give it empty string, when first build up the app, form forced to build up
    //validation automatically run one time with values = "";
    errors.emails = validateEmail(values.emails || "");
    // values.name return the key
    // values[name] reutrn the value on the fly
    _.forEach(formFields, ({ name }) => {
        if (!values[name]){
            errors[name] = `*You must provide a ${name}`;
        }
    })
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);