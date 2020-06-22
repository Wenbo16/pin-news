import './NewsCard.css';

import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../Auth/Auth'

const redirectToUrl =(event, news) => {
  const {url, digest} = news;
  event.preventDefault();
  sendClickLog(digest);
  window.open(url, '_blank');
};

const handleKeyPress = () => {};

const sendClickLog = (digest) => {
  let url = `http://${process.env.REACT_APP_WEB_SERVER_HOST}:${process.env.REACT_APP_WEB_SERVER_PORT}/news/userId/` + Auth.getEmail()
            + '/newsId/' + digest;

  let request = new Request(encodeURI(url), {
    method: 'POST',
    headers: {
      'Authorization': 'bearer ' + Auth.getToken(),
    }
  });
  fetch(request);
}

const NewsCard = props => {
  const { news } = props;
  return (
    <div
      className="news-container"
      role="button"
      onKeyPress={handleKeyPress}
      tabIndex={-1}
      style={{ cursor: 'pointer' }}
      onClick={(e) => redirectToUrl(e, news)}
    >
      {/* <div className="col s3 image-left">
        <img src={news.urlToImage} alt="news" />
      </div> */}
      
      <div className="news-card-body">
        <div className="image right">
          <img src={news.urlToImage} alt="news" />
        </div>
        <div className="news-title">{news.title}</div>
        <div className="news-description">
          <p>{news.description}</p>
          <div>
            {news.source != null && (
              <div className="chip light-blue news-chip">{news.source.name}</div>
            )}
            {news.reason != null && (
              <div className="chip light-green news-chip">{news.reason}</div>
            )}
            {news.time != null && <div className="chip amber news-chip">{news.time}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  news: PropTypes.shape({}).isRequired
};

export default NewsCard;
