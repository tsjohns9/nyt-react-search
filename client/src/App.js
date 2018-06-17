import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Search from './components/Search';

const App = () => (
  <Router>
    <div>
      <Nav />
      <Route exact path="/" component={Search} />
    </div>
  </Router>
);

export default App;
