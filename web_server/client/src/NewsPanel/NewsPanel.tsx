import './NewsPanel.css';
import React from 'react';
import _ from 'lodash';
import Auth from '../Auth/Auth';
import NewsCard from '../NewsCard/NewsCard';

interface News {
  digest: string
}

interface FormState {
  news: News[],
  pageNum: number,
  loadedAll: boolean
}

class NewsPanel extends React.Component<any, FormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      news: [],
      pageNum: 1,
      loadedAll: false
    };
  }

  componentDidMount() {
    this.loadMoreNews();
    this.loadMoreNews = _.debounce(this.loadMoreNews, 1000);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (): void => {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
      console.log('Loading more news...');
      this.loadMoreNews();
    }
  };

  loadMoreNews = () => {
    const { news, pageNum, loadedAll } = this.state;

    if (loadedAll) {
      return;
    }

    let url = 'http://localhost:8080/news/userId/' + Auth.getEmail() + '/pageNum/' + pageNum;

    const request = new Request(encodeURI(url), {
      method: 'GET',
      headers: {
        Authorization: `bearer ${Auth.getToken()}`
      }
    });
    
    fetch(request)
      .then(res => res.json())
      .then(loadedNews => {
        if (!loadedNews || loadedNews.length === 0) {
          console.log('news.length === 0')
          this.setState({ loadedAll: true });
        }
        this.setState({
          news: news ? news.concat(loadedNews) : loadedNews,
          pageNum: this.state.pageNum + 1
        });
      });
  };

  renderNews() {
    const { news } = this.state;
    const newsList = news.map(i => (
      <a className="list-group-item" href="/" key={i.digest}>
        <NewsCard news={i} />
      </a>
    ));

    return (
      <div className="container-fluid">
        <div className="list-group">{newsList}</div>
      </div>
    );
  }

  render() {
    const { news } = this.state;
    if (news) {
      return <div className="news-panel-content">
        <div className="feed-main-title">
            <span>For You</span>
        </div>
        {this.renderNews()}
      </div>
    }
    return <div>Loading...</div>;
  }
}

export default NewsPanel;