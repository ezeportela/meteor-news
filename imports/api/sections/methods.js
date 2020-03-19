import { Meteor } from 'meteor/meteor';
import { Sections } from './index';

Meteor.methods({
  'sections.insert'(title, newspaperId, newspaperTitle) {
    if (title) {
      const count = Sections.find({
        title,
        newspaperId,
        newspaperTitle
      }).count();

      if (count === 0) {
        Sections.insert({
          title,
          newspaperId,
          newspaperTitle
        });
      }
    }
  }
});
