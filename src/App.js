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
    <Router basename="/our-telepathy">
      <Switch>
        <Route path="/team/:teamId/:userName">
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
