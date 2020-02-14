import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import M from 'materialize-css';
import Blaze from 'meteor/gadicc:blaze-react-component';
import LinkButton from './LinkButton';

const Header = props => {
  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  });

  const routes = [
    { label: 'Expenses', to: '/expenses', protected: true },
    { label: 'Accounts', to: '/accounts', protected: true }
  ];

  const makeLinks = routes =>
    routes.map(
      route =>
        (!route.protected || (route.protected && props.currentUser)) && (
          <li key={route.to}>
            <Link className="sidenav-close" to={route.to}>
              {route.label}
            </Link>
          </li>
        )
    );

  const signinButton = (
    <LinkButton to="/signin" classNames="sidenav-close" label="Sign in" />
  );

  return (
    <div className="navbar-fixed">
      <nav className={props.backgroundColor} role="navigation">
        <div className="nav-wrapper container">
          <Link id="logo-container" to="/" className="brand-logo fix-content">
            {props.title}
          </Link>

          <ul className="right hide-on-med-and-down">
            {props.currentUser ? (
              <React.Fragment>
                {makeLinks(routes)}
                <li>Hi, {props.currentUser.profile.displayName}!</li>
                <li>
                  <Blaze template="atNavButton" />
                </li>
              </React.Fragment>
            ) : (
              <li>{signinButton}</li>
            )}
          </ul>

          <ul id="nav-mobile" className="sidenav">
            {makeLinks(routes)}

            {props.currentUser ? (
              <li>
                <Blaze template="atNavButton" />
              </li>
            ) : (
              <li>{signinButton}</li>
            )}
          </ul>

          <a href="#" data-target="nav-mobile" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default HeaderContainer = withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(Header);
