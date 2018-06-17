import React from 'react';

export const SelectOption = props => (
  <div className="form-group">
    <label htmlFor={props.id}>Number of Records to Retrieve:</label>
    <select name={props.id} className="custom-select" id={props.id} onChange={props.onChange}>
      <option value="1">1</option>
      <option value="5">5</option>
      <option value="10">10</option>
    </select>
  </div>
);
