import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Signin from './pages/Signin';
import EditAccount from './pages/EditAccount';
import AccountsList from './pages/AccountsList';

export default Router = props => (
  <BrowserRouter>
    <Layout currentUser={props.currentUser}>
      <Switch>
        <Route exact path="/" component={Home} />

        {props.currentUser ? (
          <React.Fragment>
            <Route exact path="/accounts" component={AccountsList} />
            <Route exact path="/accounts/create" component={EditAccount} />
            <Route
              exact
              path="/accounts/:accountId/edit"
              component={EditAccount}
            />
          </React.Fragment>
        ) : (
          <Route exact path="/signin" component={Signin} />
        )}
      </Switch>
    </Layout>
  </BrowserRouter>
);
