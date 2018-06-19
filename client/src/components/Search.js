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
          returnedArticles: res.slice(0, this.state.searchQuantity)
        });
      })
      .catch(err => console.log(err));
  };

  // clears the article results
  clearArticles = e => {
    e.preventDefault();
    this.setState({ returnedArticles: [] });
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
            <SelectOption
              onChange={this.handleInputChange}
              name="searchQuantity"
            />
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
              className="btn btn-primary mb-2 mb-sm-0 mr-sm-2"
              onClick={this.searchArticles}
            >
              Search Articles
            </Btn>
            <Btn
              id="clear-articles"
              className="btn btn-primary"
              onClick={this.clearArticles}
            >
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
                >
                  {!a.result ? (
                    <Btn
                      onClick={this.saveArticle}
                      data-index={i}
                      className="btn mb-3 btn-secondary"
                    >
                      Save Article
                    </Btn>
                  ) : (
                    // renders a response when saving an article
                    <p
                      className={
                        a.result === 'Article Saved'
                          ? 'text-success'
                          : 'text-danger'
                      }
                    >
                      {a.result}
                    </p>
                  )}
                </Article>
              </div>
            ))}
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default Search;
