import { Meteor } from 'meteor/meteor';
import { Newspapers } from './index';

Meteor.methods({
  'newspapers.insert'({
    title,
    articleSelector,
    titleSelector,
    linkSelector,
    sectionSelector,
    imageSelector,
    url,
    logoURL
  }) {
    const user = Meteor.users.findOne(this.userId);

    Newspapers.insert({
      title,
      articleSelector,
      titleSelector,
      linkSelector,
      sectionSelector,
      imageSelector,
      url,
      logoURL,
      createdAt: new Date(),
      owner: this.userId,
      displayName: user.profile.displayName,
      email: user.emails[0].address,
      active: true
    });
  }
});
