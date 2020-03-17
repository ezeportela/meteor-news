import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { Routes, hasAccesss } from './Routes';

export default Router = props => (
  <BrowserRouter>
    <Layout currentUser={props.currentUser}>
      <Switch>
        {Routes.filter(route => hasAccesss(route, props.currentUser)).map(
          route => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          )
        )}
      </Switch>
    </Layout>
  </BrowserRouter>
);
