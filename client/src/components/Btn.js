import React from 'react';

const Btn = props => (
  <button onClick={props.onClick} className={props.styles}>
    {props.children}
  </button>
);

export default Btn;
