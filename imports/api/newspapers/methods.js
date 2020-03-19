import { Meteor } from 'meteor/meteor';
import { Newspapers } from './index';

Meteor.methods({
  'newspapers.save'(
    id,
    {
      title,
      url,
      logoURL,
      articleSelector,
      titleSelector,
      linkSelector,
      sectionSelector,
      imageSelector
    }
  ) {
    const user = Meteor.users.findOne(this.userId);

    if (!id) {
      return Newspapers.insert({
        title,
        url,
        logoURL,
        articleSelector,
        titleSelector,
        linkSelector,
        sectionSelector,
        imageSelector,
        createdAt: new Date(),
        owner: this.userId,
        displayName: user.profile.displayName,
        email: user.emails[0].address,
        active: true
      });
    }

    return Newspapers.update(id, {
      $set: {
        title,
        url,
        logoURL,
        articleSelector,
        titleSelector,
        linkSelector,
        sectionSelector,
        imageSelector
      }
    });
  }
});
