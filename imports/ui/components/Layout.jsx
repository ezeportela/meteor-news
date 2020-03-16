import React from 'react';
import Header from './Header';
export default Layout = props => (
  <React.Fragment>
    <Header title="meteor news" backgroundColor="blue darken-2" />
    {props.children}
  </React.Fragment>
);
