import { Options } from '.';

if (Meteor.isServer) {
  Meteor.publish('options.app', () => Options.find({ key: 'appSettings ' }));
}
