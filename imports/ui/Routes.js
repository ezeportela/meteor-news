import Signin from './pages/Signin';
import News from './pages/News';
import NewspaperList from './pages/NewspaperList';
import EditNewspaper from './pages/EditNewspaper';
import { Options } from '../api/options';
import _ from 'lodash';
import NotFound from './pages/NotFound';

const isSecure = user => {
  Meteor.subscribe('options.app');
  const options = Options.findOne({ key: 'appSettings' });
  if (_.isEmpty(options)) return false;
  return user.profile.adminKey === options.adminKey;
};

export const Routes = [
  {
    path: '/',
    component: News,
    protected: false,
    exact: true,
    showInNavbar: false
  },
  {
    path: '/signin',
    component: Signin,
    protected: false,
    exact: true,
    showInNavbar: false
  },
  {
    path: '/newspapers',
    component: NewspaperList,
    protected: true,
    exact: true,
    label: 'Newspapers',
    isValid: user => isSecure(user)
  },
  {
    path: '/newspaper/new',
    component: EditNewspaper,
    protected: true,
    exact: true,
    showInNavbar: false,
    isValid: user => isSecure(user)
  },
  {
    path: '/newspaper/:id/edit',
    component: EditNewspaper,
    protected: true,
    exact: true,
    showInNavbar: false,
    isValid: user => isSecure(user)
  },

  {
    path: '**',
    component: NotFound,
    protected: false,
    exact: false,
    showInNavbar: false
  }
];

export const hasAccesss = (route, user) =>
  !route.protected ||
  (user && route.protected && (!route.isValid || route.isValid(user)));
