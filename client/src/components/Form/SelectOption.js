import React from 'react';

export const SelectOption = props => (
  <div className="form-group">
    <label for="article-count">Number of Records to Retrieve:</label>
    <select className="custom-select" id="article-count">
      <option value="1">1</option>
      <option value="5">5</option>
      <option value="10">10</option>
    </select>
  </div>
);
