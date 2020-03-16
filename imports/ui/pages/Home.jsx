import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { News } from '../../api/news';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import Container from '../components/Container';
import Card from '../components/Card';
import MessageBox from '../components/MessageBox';
import Button from '../components/Button';
import './styles/Home.css';

const Home = props => {
  useEffect(() => {
    const elems = document.querySelectorAll('.fixed-action-btn');
    const instances = M.FloatingActionButton.init(elems, {});
  });

  const makeListItem = article => {
    return (
      <Card
        cardImagePlaceholder={
          article.image ? <img src={article.image} /> : null
        }
        col="m3 s12"
        key={article._id}
        title={article.title}
        href={article.link}
        hoverable={true}
        classNames="article"></Card>
    );
  };

  const news = props.news.map(article => makeListItem(article));

  const handleClickDelete = e => {
    Meteor.call('news.removeAll');
  };

  const handleClickImport = e => {
    Meteor.call('news.importFromSources');
  };

  return (
    <Container>
      <div className="row">
        <Button
          type="button"
          icon="delete"
          label="Delete"
          classNames="grey lighten-3 black-text"
          onClick={handleClickDelete}
        />

        <Button
          type="button"
          icon="cloud_download"
          label="Import"
          classNames="grey lighten-3 black-text"
          onClick={handleClickImport}
        />
      </div>

      {news.length === 0 && (
        <MessageBox message="There aren't news." icon="info" />
      )}

      <div className="row">{news}</div>

      <div className="fixed-action-btn">
        <Link to="/news/create" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </Container>
  );
};

export default HomeContainer = withTracker(() => {
  return {
    news: News.find().fetch()
  };
})(Home);
