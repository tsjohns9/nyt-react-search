import React, { Component } from 'react';
import { Input, SelectOption } from './Form';
import Btn from './Btn';
import Wrapper from './Wrapper';
import Article from './Article';
import API from '../utils/API';

class Search extends Component {
  state = {
    searchTerm: '',
    searchQuantity: 1,
    startYear: '',
    endYear: '',
    returnedArticles: []
  };

  // used to store the search parameters. updates state on change
  handleInputChange = event => {
    const { name, value } = event.target;
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

          // delete the extra values stored on headline
          delete a.headline;

          // delete the returned score value
          delete a.score;

          // grab the human readable date
          a.pub_date = a.pub_date.split('T')[0];

          // update the headline to have the main headline only
          a.headline = headline;

          return a;
        });
        // the api result returns 10 articles each time.
        // slice return the result based on the quantity param
        this.setState({
          returnedArticles: res.slice(0, this.state.searchQuantity)
        });
      })
      .catch(err => console.log(err));
  };

  // clears the article results
  clearArticles = () => {
    this.setState({ returnedArticles: [] });
  };

  // saves an article to the db
  saveArticle = event => {
    // grabs the article to save based on its index value in the state.returnedArticles array
    const article = this.state.returnedArticles[event.target.getAttribute('data-index')];
    API.saveArticle(article)
      .then(result => console.log('RESULT:', result))
      .catch(err => console.log('ERR:', err));
  };

  render() {
    console.log('STATE:', this.state);
    return (
      <div>
        <div className="container mb-3">
          <form className="border p-3">
            <Input
              name="searchTerm"
              onChange={this.handleInputChange}
              id="searchTerm"
              type="text"
              label="Search Term"
            />
            <SelectOption onChange={this.handleInputChange} name="searchQuantity" />
            <Input
              name="startYear"
              onChange={this.handleInputChange}
              type="text"
              label="Start Year (optional)"
            />
            <Input
              name="endYear"
              onChange={this.handleInputChange}
              type="text"
              label="End Year (optional)"
            />
            <Btn
              id="search-articles"
              className="btn btn-success mr-2"
              onClick={this.searchArticles}
            >
              Search Articles
            </Btn>
            <Btn id="clear-articles" className="btn btn-danger" onClick={this.clearArticles}>
              Clear Results
            </Btn>
          </form>
        </div>
        <div className="container">
          <Wrapper>
            {this.state.returnedArticles.map((a, i) => (
              <div className="mb-4" key={a.headline}>
                <Article
                  headline={a.headline}
                  snippet={a.snippet}
                  date={a.pub_date}
                  href={a.web_url}
                />
                <Btn onClick={this.saveArticle} data-index={i} className="btn btn-primary save">
                  Save Article
                </Btn>
              </div>
            ))}
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default Search;
