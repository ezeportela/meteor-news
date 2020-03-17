import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import Container from '../components/Container';
import Card from '../components/Card';
import MessageBox from '../components/MessageBox';
import { Newspapers } from '../../api/newspapers';

const NewspaperList = props => {
  useEffect(() => {
    const elems = document.querySelectorAll('.fixed-action-btn');
    const instances = M.FloatingActionButton.init(elems, {});
  });

  const renderItem = newspaper => {
    const to = `/newspaper/${newspaper._id}/edit`;
    return (
      <Card
        key={newspaper._id}
        title={newspaper.title}
        to={to}
        hoverable={true}></Card>
    );
  };

  const newspapers = props.newspapers.map(newspaper => renderItem(newspaper));

  return (
    <Container>
      {newspapers.length === 0 && (
        <MessageBox message="There aren't newspapers." icon="info" />
      )}

      <div className="row">{newspapers}</div>

      <div className="fixed-action-btn">
        <Link to="/newspaper/new" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </Container>
  );
};

export default NewspaperListContainer = withTracker(() => {
  return {
    newspapers: Newspapers.find({}, { sort: { title: 1 } }).fetch()
  };
})(NewspaperList);
