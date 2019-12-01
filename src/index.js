import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Profile from './components/Profile';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/profile" component={Profile} />
        </div>
    </Router>
    </ApolloProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
