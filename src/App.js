import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Main from './route/Main';
import Home from './route/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/team/:teamId">
          <Main />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
