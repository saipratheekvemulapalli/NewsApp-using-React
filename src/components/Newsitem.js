import React, { Component } from 'react';

export default class Newsitem extends Component {
    
  render() {
    const { title, description, imageUrl, url, author, date } = this.props;
    let finaldate =new Date(date);
    let formateddate = `${finaldate.getDate()}-${finaldate.getMonth()+1}-${finaldate.getFullYear()} ${finaldate.getHours()>12?finaldate.getHours()-12:finaldate.getHours()}:${finaldate.getMinutes()} ${finaldate.getHours()>12?"PM":"AM"}`;
     

    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={
              !imageUrl
                ? "https://imageio.forbes.com/specials-images/imageserve/66b6a91856b13b39ded769ed/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds"
                : imageUrl
            }
            className="card-img-top"
            alt="News"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown source" : author} last updated on {formateddate}
              </small>
            </p>
            <a
              rel="noopener noreferrer"
              href={url}
              target='_blank'
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
