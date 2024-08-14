import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      currentPage: 1,
      totalResults: 0,
      loading: true,
    };
    let upcase = `${props.category}`;
    document.title = upcase.slice(0, 1).toUpperCase() + upcase.slice(1) + " - News";
  }

  async fetchArticles(page) {
    this.setState({ loading: true });
    const apiKey = 'c8feb903a76d475993b0bc379ded400c';
    const pageSize = 21;
    const url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;
    
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      articles: this.state.articles.concat(data.articles || []),  // Append new articles, ensuring it's an array
      currentPage: page,
      totalResults: data.totalResults || 0,  // Ensure totalResults is not undefined
      loading: false,
    });
  }

  async componentDidMount() {
    await this.fetchArticles(this.state.currentPage);
  }

  fetchMoreData = async () => {
    const nextPage = this.state.currentPage + 1;
    await this.fetchArticles(nextPage);
  };

  render() {
    const filteredArticles = this.state.articles.filter(article => article && article.title !== "[Removed]");
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsApp</h2>
        {this.state.loading && <Spinner />}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}  // Compare length with totalResults
          loader={<Spinner />}
        >
          <div className="row">
            {filteredArticles.map((element, index) => (
              <div className="col-md-4" key={`${element?.url}-${index}`}>
                <Newsitem
                  title={element?.title ? element.title.slice(0, 45) : 'No Title Available'}
                  description={element?.description ? element.description.slice(0, 88) : 'No Description Available'}
                  imageUrl={element?.urlToImage ? element.urlToImage : 'https://via.placeholder.com/150'}
                  author={element?.author || 'Unknown'}
                  date={element?.publishedAt || 'Unknown Date'}
                  url={element?.url}
                  source={element?.source?.name || 'Unknown Source'}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

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
