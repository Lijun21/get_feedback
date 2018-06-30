import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { new: true };
    // }
    //initalize the state same as above
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview === true){
            return <SurveyFormReview 
            onCancel={ () => this.setState({ showFormReview: false }) }/>
        }
        return <SurveyForm onSurveySubmit={ () => this.setState({ showFormReview: true })}/>
    }

    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default SurveyNew;