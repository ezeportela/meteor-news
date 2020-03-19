import { Meteor } from 'meteor/meteor';

import '/imports/api/news/methods';
import '../imports/api/newspapers/methods';
import '../imports/api/sections/methods';

import '../imports/api/options/publish';

Meteor.startup(() => Meteor.call('news.importNews'));
