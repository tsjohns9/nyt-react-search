import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Search from './components/Search';
import SavedArticles from './components/SavedArticles';
import Banner from './components/Banner';
// import Footer from './components/Footer';

const App = () => (
  <Router>
    <div>
      <Nav />
      <Banner />
      <Route exact path="/" component={Search} />
      <Route exact path="/saved" component={SavedArticles} />
    </div>
  </Router>
);

export default App;
