import React from 'react'
import {render} from 'react-dom';
import Main from './containers/Main'
import store from './modules/storage'


const renderPage = () => {
    render(
        <Main state = {store.getState()}/>,
        document.getElementById('root')
    );
}

store.subscribe(renderPage);
renderPage();
