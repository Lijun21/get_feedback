// import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurvey } from '../../actions';

class SurveyList extends Component {

    componentDidMount() {
        this.props.fetchSurvey();
    } 

    renderSurvey(surveyList) {
        return this.props.survey.reverse().map(eachSurvey => {
            return (
                <div className="card blue-grey darken-1" key={eachSurvey._id}>
                    <div className="card-content white-text">
                        <span className="card-title">{eachSurvey.title}</span>
                        <p>{eachSurvey.body}</p>
                        <p className="right">
                            Sent On: {new Date(eachSurvey.dataSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {eachSurvey.yes}</a>
                        <a>No: {eachSurvey.no}</a>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderSurvey()}
            </div>
        )
    }
}

function MapStateToProps ({ survey }) {

    return { survey };
}

export default connect(MapStateToProps, { fetchSurvey })(SurveyList);