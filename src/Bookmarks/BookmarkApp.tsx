import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BookmarkHome from './BookmarkHome';
import Login from './Login';
import Register from './Register';

const BookmarkApp: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={BookmarkHome} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Switch>
        </Router>
    );
}

export default BookmarkApp;