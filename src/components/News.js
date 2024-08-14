import React, { Component } from 'react';

import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      currentPage: 1,
      totalResults: 0,
      articlesPerPage: 10,
      loading: true, // Set loading to true initially
    };
    let upcase = `${props.category}`;
    document.title = upcase.slice(0,1).toUpperCase()+upcase.slice(1) +" - News"
  }

  //   async fetchArticles(page) {
  //     this.setState({ loading: true }); // Set loading to true when starting fetch
  //     const apiKey = 'c8feb903a76d475993b0bc379ded400c';
  //     const category = 'Sports';  /////////////////////////////////////////////////////// here we can set the category
  //     // const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=${this.state.articlesPerPage}&page=${page}&apiKey=${apiKey}`;
  // const url = `https://newsapi.org/v2/everything?q=${category}&apiKey=c8feb903a76d475993b0bc379ded400c`;

  //     const response = await fetch(url);
  //     const data = await response.json();
  //     const filteredArticles = data.articles
  //     // .filter(
  //     //   (article) =>
  //     //     article.source.name !== 'Business Insider' &&
  //     //     article.source.name !== 'Biztoc.com' &&
  //     //     article.source.name !== 'Drive.com.au',
  //     // );
  //     this.setState({
  //       articles: filteredArticles,
  //       currentPage: page,
  //       totalResults: data.totalResults,
  //       loading: false // Set loading to false once data is fetched
  //     });
  //   }
  async fetchArticles(page) {
    this.setState({ loading: true }); // Set loading to true when starting fetch
    const apiKey = 'c8feb903a76d475993b0bc379ded400c';
    // const category = 'Sports'; //////////////////////////////////////////////////////////////// we can set the category
    const pageSize = 21; // Number of articles per page

    // Update URL to use pageSize and page
    const url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;

    const response = await fetch(url);
    const data = await response.json();
    const filteredArticles = data.articles;

    this.setState({
      articles: filteredArticles,
      currentPage: page,
      totalResults: data.totalResults,
      loading: false, // Set loading to false once data is fetched
    });
  }

  async componentDidMount() {
    await this.fetchArticles(this.state.currentPage);
  }

  // handleNextClick = async () => {
  //   const nextPage = this.state.currentPage + 1;
  //   await this.fetchArticles(nextPage);
  // };

  // handlePreviousClick = async () => {
  //   const previousPage = this.state.currentPage - 1;
  //   if (previousPage >= 1) {
  //     await this.fetchArticles(previousPage);
  //   }
  // };

  handleNextClick = async () => {
    const nextPage = this.state.currentPage + 1;
    await this.fetchArticles(nextPage);
  };

  handlePreviousClick = async () => {
    const previousPage = this.state.currentPage - 1;
    if (previousPage >= 1) {
      await this.fetchArticles(previousPage);
    }
  };

  render() {
    const filteredArticles = this.state.articles.filter(article => article.title !== "[Removed]");
    return (
      
      <div className="container my-3">
        <h2 className="text-center">NewsApp</h2>
        {this.state.loading && <Spinner />} {/* Show spinner if loading */}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element, index) => (
            <div className="col-md-4" key={`${element.url}-${index}`}>
              <Newsitem
                title={
                  element.title
                    ? element.title.slice(0, 45)
                    : 'No Title Available'
                }
                description={
                  element.description
                    ? element.description.slice(0, 88)
                    : 'No Description Available'
                }
                imageUrl={
                  element.urlToImage
                    ? element.urlToImage
                    : 'https://via.placeholder.com/150'
                }
                author={element.author}
                date={element.publishedAt}
                url={element.url}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.currentPage <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button 
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
  
}

// News.propTypes = {
//   apiKey: PropTypes.string.isRequired,
//   category: PropTypes.string,
//   country:PropTypes.string,
//   pageSize:PropTypes.number
// };

// // Define defaultProps to provide default values for props
// News.defaultProps = {
//   category: 'general',
//   pageSize:8,
//   country:'in',
// };

News.propTypes = {
  apiKey: PropTypes.string.isRequired,
  category: PropTypes.string,
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

News.defaultProps = {
  category: 'Home',
  pageSize: 5,
  country: 'in',
};