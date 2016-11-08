import React, { Component } from 'react';
import Control from '../components/Control'
import Results from '../components/Results'

export default class Main extends Component {
    render() {
        const {state} = this.props;
        return (
            <div className="page-wrapp">
                <Control/>
                <Results users = {state.users} />
            </div>
        )
    }
}