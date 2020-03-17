import React from 'react';
import Container from '../components/Container';
import MessageBox from '../components/MessageBox';

export default NotFound = () => (
  <Container>
    <MessageBox
      message="The requested page has not been found."
      icon="warning"
    />
  </Container>
);
