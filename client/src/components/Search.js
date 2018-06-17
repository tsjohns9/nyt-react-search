import React, { Component } from 'react';
import { Input, FormBtn, SelectOption } from './Form';
import API from '../utils/API';

class Search extends Component {
  state = {
    searchTerm: '',
    searchQuantity: '',
    startYear: '',
    endYear: ''
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.trim()
    });
  };

  searchArticles = e => {
    e.preventDefault();
    API.scrapeArticles(this.state);
  };

  render() {
    console.log(this.state);
    return (
      <div className="container">
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
          <FormBtn id="search-articles" onClick={this.searchArticles}>
            Search Articles
          </FormBtn>
          <FormBtn id="clear-articles">Clear Results</FormBtn>
        </form>
      </div>
    );
  }
}

export default Search;
