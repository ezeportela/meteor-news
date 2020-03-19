import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { News } from '../../api/news';
import M from 'materialize-css';
import Container from '../components/Container';
import Card from '../components/Card';
import MessageBox from '../components/MessageBox';
import { getDateNow } from '../../api/common/moment';
import './styles/News.css';

const Home = props => {
  useEffect(() => {
    const elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, {});
  });

  const renderNews = article => {
    return (
      <Card
        cardImagePlaceholder={
          <img
            src={
              article.image ? article.image : '/images/image-placeholder.png'
            }
          />
        }
        col="m4 s12"
        key={article._id}
        href={article.link}
        hoverable={true}
        classNames="article">
        <img src={article.newspaperLogo} className="newspaper-logo" />
        <h1 className="article-title">{article.title}</h1>
        <span className="article-section">{article.section}</span>
      </Card>
    );
  };

  const news = props.news.map(article => renderNews(article));

  return (
    <Container>
      {news.length === 0 && (
        <MessageBox message="There aren't news." icon="info" />
      )}

      <div className="row">{news}</div>
    </Container>
  );
};

export default HomeContainer = withTracker(() => {
  return {
    news: News.find({ date: getDateNow() }, { sort: { position: 1 } }).fetch()
  };
})(Home);
