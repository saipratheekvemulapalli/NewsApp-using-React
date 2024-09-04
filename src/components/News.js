import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let upcase = `${props.category}`;
    document.title = upcase.slice(0, 1).toUpperCase() + upcase.slice(1) + " - News";

    fetchArticles(currentPage);
  }, []);

  const fetchArticles = async (page) => {
    setLoading(true);
    props.setProgress(10);
    const apiKey = 'c8feb903a76d475993b0bc379ded400c';
    const pageSize = 21;
    const url = `https://newsapi.org/v2/everything?q=${props.category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;
    
    const response = await fetch(url);
    const data = await response.json();

    setArticles((prevArticles) => prevArticles.concat(data.articles || []));
    setCurrentPage(page);
    setTotalResults(data.totalResults || 0);
    setLoading(false);
    
    props.setProgress(100);
  }

  const fetchMoreData = async () => {
    const nextPage = currentPage + 1;
    await fetchArticles(nextPage);
  };

  const filteredArticles = articles.filter(article => article && article.title !== "[Removed]");

  return (
    <div className="container my-3">
      <h2 className="text-center">NewsApp</h2>
      {loading && <Spinner />}
      
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {filteredArticles.map((element, index) => (
            <div className="col-md-4 col-sm-6 col-12" key={`${element?.url}-${index}`}>
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

export default News;
