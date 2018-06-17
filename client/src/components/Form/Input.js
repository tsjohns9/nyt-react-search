import React from 'react';

export const Input = props => (
  <div className="form-group">
    <label for={props.id}>{props.label}</label>
    <input id={props.id} className="form-control" type={props.text} name={props.name} />
  </div>
);
