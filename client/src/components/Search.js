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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.trim()
    });
  };

  searchArticles = e => {
    e.preventDefault();
    API.scrapeArticles(this.state)
      .then(res => {
        res = res.data.response.docs.map(a => {
          const headline = a.headline.main;
          delete a.headline;
          delete a.score;
          a.pub_date = a.pub_date.split('T')[0];
          a.headline = headline;
          return a;
        });
        this.setState({
          returnedArticles: res.slice(0, this.state.searchQuantity)
        });
      })
      .catch(err => console.log(err));
  };

  clearArticles = () => {
    this.setState({ returnedArticles: [] });
  };

  saveArticle = event => {
    const article = this.state.returnedArticles[event.target.getAttribute('data-index')];
    console.log('EVENT:', event.target);
    console.log('ARTICLE:', article);
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
            <Btn id="search-articles" styles="btn btn-success mr-2" onClick={this.searchArticles}>
              Search Articles
            </Btn>
            <Btn id="clear-articles" styles="btn btn-danger" onClick={this.clearArticles}>
              Clear Results
            </Btn>
          </form>
        </div>
        <div className="container">
          <Wrapper>
            {this.state.returnedArticles.map((a, i) => (
              <div className="mb-4" key={a.headline}>
                <Article
                  headline={a.headline.main}
                  snippet={a.snippet}
                  date={a.pub_date}
                  href={a.web_url}
                />
                <Btn onClick={this.saveArticle} index={i} styles="btn btn-primary save">
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
