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
      .then(res =>
        this.setState({
          returnedArticles: res.data.response.docs.slice(0, this.state.searchQuantity)
        })
      )
      .catch(err => console.log(err));
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
            <Btn id="clear-articles" styles="btn btn-danger">
              Clear Results
            </Btn>
          </form>
        </div>
        <div className="container">
          <Wrapper>
            {this.state.returnedArticles.map(a => (
              <div className="mb-4">
                <Article
                  headline={a.headline.main}
                  snippet={a.snippet}
                  date={a.pub_date.split('T')[0]}
                  href={a.web_url}
                  key={a.headline.main}
                />
                <Btn styles="btn btn-primary save">Save Article</Btn>
              </div>
            ))}
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default Search;
