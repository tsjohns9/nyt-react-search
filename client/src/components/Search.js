import React, { Component } from 'react';
import { Form } from './Form';
import Wrapper from './Wrapper';
import ColumnOffset from './ColumnOffset';
import API from '../utils/API';
import ReallySmoothScroll from 'really-smooth-scroll';

ReallySmoothScroll.shim();

class Search extends Component {
  state = {
    searchTerm: '',
    searchQuantity: 1,
    startYear: '',
    endYear: '',
    errMsg: '',
    returnedArticles: []
  };

  // used to store the search parameters. updates state on change
  handleInputChange = event => {
    const { name } = event.target;
    let { value } = event.target;

    // removes letters from start and end year search
    if (name === 'startYear' || name === 'endYear') {
      if (isNaN(value.slice(-1))) {
        value = value.replace(/[^0-9]+/g, '');
      }
    }

    // prevents the user from searching a year with more than 4 digits
    if (name === 'startYear' || (name === 'endYear' && value.length > 4)) {
      value = value.slice(0, 4);
    }

    this.setState({
      [name]: value.trim()
    });
  };

  // searches for articles based on user input
  searchArticles = e => {
    e.preventDefault();
    // send the current state values to API
    API.scrapeArticles(this.state)
      .then(res => {
        // update each article to match the Article Schema requirements
        res = res.data.response.docs.map(a => {
          // grab the main headline
          const headline = a.headline.main;

          // delete the original headline value
          delete a.headline;

          // delete the returned score value
          delete a.score;

          // grab the human readable date
          a.pub_date = a.pub_date.split('T')[0];

          // create new headline with main headline info only
          a.headline = headline;

          return a;
        });
        // the api result returns 10 articles each time.
        // slice return the result based on the quantity param
        this.setState({
          searchTerm: '',
          startYear: '',
          endYear: '',
          errMsg: '',
          returnedArticles: res.slice(0, this.state.searchQuantity)
        });

        window.scrollTo(0, 500);
      })
      .catch(() => {
        this.setState({ errMsg: 'No articles found' });
        window.scrollTo(0, 80);
      });
  };

  // clears the article results
  clearArticles = e => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setTimeout(() => this.setState({ returnedArticles: [] }), 500);
  };

  // saves an article to the db
  saveArticle = event => {
    // creates a copy of the current state of returned articles so its values can be mutated
    const allArticles = this.state.returnedArticles.slice();

    // grabs the article to save based on its index value in the state.returnedArticles array
    const article = allArticles[event.target.getAttribute('data-index')];

    // article.result is used to indicate a user successfuly saved an article, or if it was already saved.
    API.saveArticle(article)
      .then(res => {
        article.result = res.data;
        this.setState({ returnedArticles: allArticles });
      })
      .catch(() => {
        article.result = 'An error occured while saving the article';
        this.setState({ returnedArticles: allArticles });
      });
  };

  render() {
    const state = this.state;
    console.log('STATE:', this.state);
    return (
      <div>
        <div className="container mb-3">
          <ColumnOffset>
            <Form
              value={this.state}
              onChange={this.handleInputChange}
              onSearch={this.searchArticles}
              onClear={this.clearArticles}
              searchDisable={!state.searchTerm ? true : false}
              clearDisable={!state.returnedArticles.length ? true : false}
            />
          </ColumnOffset>
        </div>
        {!state.errMsg ? (
          <Wrapper
            articles={state.returnedArticles}
            onClick={this.saveArticle}
            btnText="Save Article"
          />
        ) : (
          <h2 className="text-center">{state.errMsg}</h2>
        )}
      </div>
    );
  }
}

export default Search;
