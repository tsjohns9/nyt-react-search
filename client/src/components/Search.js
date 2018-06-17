import React from 'react';
import { Input, FormBtn, SelectOption } from './Form';

const Search = () => (
  <div className="container">
    <form>
      <Input name="search" id="search" type="text" label="Search Term" />
      <SelectOption />
      <Input name="startyear" type="text" label="Start Year (optional)" />
      <Input name="endyear" type="text" label="End Year (optional)" />
      <FormBtn id="search-articles">Search Articles</FormBtn>
      <FormBtn id="clear-articles">Clear Results</FormBtn>
    </form>
  </div>
);

export default Search;
