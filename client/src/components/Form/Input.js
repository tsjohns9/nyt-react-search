import React from 'react';

export const Input = props => (
  <div className="form-group">
    <label htmlFor={props.id}>{props.label}</label>
    <input
      id={props.id}
      onChange={props.onChange}
      className="form-control"
      type={props.text}
      name={props.name}
    />
  </div>
);
