import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import Lyrics from './containers/lyrics';
import SongDetails from './containers/song_details';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Switch>
                <Route path="/song/:track&:artist&:id" component={SongDetails} />
                <Route exact path="/" component={Lyrics} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
console.log('test: ', process.env.REACT_APP_YOUTUBE_API_KEY);
