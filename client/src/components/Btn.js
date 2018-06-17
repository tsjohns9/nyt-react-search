import React from 'react';

const Btn = props => (
  <button onClick={props.onClick} className={props.styles} data-index={props.index}>
    {props.children}
  </button>
);

export default Btn;
