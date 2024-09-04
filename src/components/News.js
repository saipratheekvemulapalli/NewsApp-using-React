import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ category = 'Home', pageSize = 5, country = 'in', apiKey, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const upcase = category.charAt(0).toUpperCase() + category.slice(1);
    document.title = `${upcase} - News`;

    fetchArticles(currentPage);
  }, [category, currentPage]);

  const fetchArticles = async (page) => {
    try {
      setLoading(true);
      setProgress(10);
      const url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.articles) {
        throw new Error('No articles found');
      }
      
      setArticles((prevArticles) => prevArticles.concat(data.articles));
      setCurrentPage(page);
      setTotalResults(data.totalResults);
      setLoading(false);
      
      setProgress(100);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
      setProgress(100);
    }
  };
  

  const fetchMoreData = async () => {
    const nextPage = currentPage + 1;
    await fetchArticles(nextPage);
  };

  const filteredArticles = articles.filter(article => article && article.title !== "[Removed]");
  const upcaseforheading = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="container my-3">
      <h2 className="text-center" style={{ marginTop: '70px' }}>NewsApp TopHeadlines- {upcaseforheading}</h2>
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
};

News.propTypes = {
  apiKey: PropTypes.string.isRequired,
  category: PropTypes.string,
  country: PropTypes.string,
  pageSize: PropTypes.number,
  setProgress: PropTypes.func.isRequired,
};

export default News;
