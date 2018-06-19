import React, { Component } from 'react';
import API from '../utils/API';
import Wrapper from './Wrapper';
import Article from './Article';
import Btn from './Btn';

class SavedArticles extends Component {
  // will store all saved articles from the db once the DOM loads
  state = {
    savedArticles: []
  };

  // gets all articles from the db
  loadArticles = () => {
    return API.getSavedArticles()
      .then(result => this.setState({ savedArticles: result.data }))
      .catch(err => console.log(err));
  };

  // removes an article. called when the remove article button is pressed
  nukeArticle = event => {
    // saves the target to use in the .then on a successful delete
    const target = event.target;

    // makes a copy of the current saved articles before mutating
    const allArticles = this.state.savedArticles.slice();

    // the article _id gets saved on the button for the article. grabs the article id
    const articleToNuke = { _id: target.getAttribute('data-id') };

    return API.nukeArticle(articleToNuke)
      .then(() => {
        // adds a class to fade out the deleted article
        allArticles[target.getAttribute('data-index')].fade = 'delete-article';

        // updates state to add the fade class to the deleted article
        this.setState({ savedArticles: allArticles });

        // removes the deleted article
        allArticles.splice(target.getAttribute('data-index'), 1);

        // updates state on a successful response from the db with the new articles array
        setTimeout(() => this.setState({ savedArticles: allArticles }), 400);
      })
      .catch(err => console.log(err));
  };

  // loads all saved articles once the DOM loads
  componentDidMount() {
    return this.loadArticles();
  }

  render() {
    const savedArticles = this.state.savedArticles;
    console.log(this.state);
    return (
      <Wrapper>
        {savedArticles.length ? (
          savedArticles.map((a, i) => (
            <div className="mb-4" key={i}>
              <Article
                headline={a.headline}
                snippet={a.snippet}
                date={a.pub_date}
                href={a.web_url}
                fade={a.fade ? a.fade : ''}
              >
                <Btn
                  data-index={i}
                  data-id={a._id}
                  onClick={this.nukeArticle}
                  className="btn save mb-3 btn-secondary"
                >
                  Delete Article
                </Btn>
              </Article>
            </div>
          ))
        ) : (
          <h2 className="text-center">No Saved Articles</h2>
        )}
      </Wrapper>
    );
  }
}

export default SavedArticles;
