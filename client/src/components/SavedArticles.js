import React, { Component } from 'react';
import API from '../utils/API';
import Wrapper from './Wrapper';
import Article from './Article';
import Btn from './Btn';

class SavedArticles extends Component {
  state = {
    savedArticles: []
  };

  loadArticles = () => {
    return API.getSavedArticles()
      .then(result => this.setState({ savedArticles: result.data }))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    return this.loadArticles();
  }

  render() {
    console.log(this.state);
    return (
      <Wrapper>
        {this.state.savedArticles.map((a, i) => (
          <div className="mb-4" key={a.headline}>
            <Article headline={a.headline} snippet={a.snippet} date={a.pub_date} href={a.web_url} />
            <Btn index={i} styles="btn btn-primary delete-article">
              Delete Article
            </Btn>
          </div>
        ))}
      </Wrapper>
    );
  }
}

export default SavedArticles;
