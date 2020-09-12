import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Start from './route/Start';
import Main from './route/Main';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/start">
          <Start />
        </Route>
        <Route path="/team/:teamId">
          <Main />
        </Route>
        <Route path="/">
          <div><Link to="/start">시작하기</Link></div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
