import React, { Component } from 'react';
import { Input, FormBtn, SelectOption } from './Form';
import API from '../utils/API';

class Search extends Component {
  state = {
    searchTerm: null,
    searchQuantity: null,
    startYear: null,
    endYear: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  searchArticles = e => {
    e.preventDefault();
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
          <SelectOption onChange={this.handleInputChange} id="searchQuantity" />
          <Input
            name="startYear"
            onChange={this.handleInputChange}
            id="startYear"
            type="text"
            label="Start Year (optional)"
          />
          <Input
            name="endYear"
            onChange={this.handleInputChange}
            id="endYear"
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
