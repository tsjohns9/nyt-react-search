import React from 'react';
import Btn from '../Btn';
import { Input, SelectOption } from './index';

export const Form = props => (
  <form className="border p-3">
    <Input
      name="searchTerm"
      onChange={props.onChange}
      type="text"
      label="Search Term"
    />
    <SelectOption onChange={props.onChange} name="searchQuantity" />
    <Input
      name="startYear"
      onChange={props.onChange}
      type="number"
      label="Start Year (optional)"
    />
    <Input
      name="endYear"
      onChange={props.onChange}
      type="number"
      label="End Year (optional)"
    />
    <Btn
      id="search-articles"
      className="btn btn-primary mb-2 mb-sm-0 mr-sm-2"
      disabled={props.searchDisable}
      onClick={props.onSearch}
    >
      Search Articles
    </Btn>
    <Btn
      id="clear-articles"
      className="btn btn-primary"
      disabled={props.clearDisable}
      onClick={props.onClear}
    >
      Clear Results
    </Btn>
  </form>
);
