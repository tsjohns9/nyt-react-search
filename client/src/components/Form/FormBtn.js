import React from 'react';

export const FormBtn = props => (
  <button {...props} className="btn btn-success mr-2">
    {props.children}
  </button>
);
