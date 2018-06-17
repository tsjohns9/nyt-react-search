import React from 'react';

const Article = props => (
  <div>
    <a href={props.href} target="_blank">
      <h3>{props.headline}</h3>
    </a>
    <p>{props.snippet}</p>
    <p>{props.date}</p>
  </div>
);

export default Article;
