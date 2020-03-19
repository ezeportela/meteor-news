import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Container from '../components/Container';
import M from 'materialize-css';
import Card from '../components/Card';
import _ from 'lodash';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';
import { Newspapers } from '../../api/newspapers';
import { renderItems } from '../utils/renderItems';
import './styles/EditNewspaper.css';

const EditNewspaper = props => {
  const { id } = props;
  const defaultEditorValue = `($) => $('selector');`;
  const [fetched, setFetched] = useState(false);
  const [newspaper, setNewspaper] = useState({
    title: '',
    url: '',
    logoURL: '',
    active: true,
    articleSelector: defaultEditorValue,
    titleSelector: defaultEditorValue,
    linkSelector: defaultEditorValue,
    sectionSelector: defaultEditorValue,
    imageSelector: defaultEditorValue
  });

  useEffect(() => {
    if (!_.isEmpty(props.newspaper) && !fetched) {
      setNewspaper(props.newspaper);
      setFetched(true);
    }
    M.updateTextFields();
  });

  const handleChange = (prop = 'value') => e =>
    setNewspaper({
      ...newspaper,
      [e.target.name]: e.target[prop]
    });

  const handleEditorChange = name => (editor, data, value) =>
    setNewspaper({
      ...newspaper,
      [name]: value
    });

  const handleClickDelete = () => {
    if (confirm('Are you sure do you want to delete the newspaper?')) {
      Meteor.call('newspapers.delete', newspaper._id);
      props.history.push('/newspapers');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    Meteor.call('newspapers.save', id, newspaper);
    props.history.push('/newspapers');
  };

  const items = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      icon: 'label',
      col: 's12 m6',
      onChange: handleChange()
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      icon: 'vpn_lock',
      col: 's12 m6',
      onChange: handleChange()
    },
    {
      name: 'logoURL',
      label: 'Logo URL',
      type: 'text',
      icon: 'image',
      col: 's12 m6',
      onChange: handleChange()
    },
    {
      name: 'active',
      label: 'Active',
      type: 'checked',
      icon: 'active',
      col: 's12 m6',
      onChange: handleChange('checked')
    },
    {
      name: 'articleSelector',
      label: 'Article Selector',
      type: 'editor',
      col: 's12 m6',
      onChange: handleEditorChange
    },
    {
      name: 'titleSelector',
      label: 'Title Selector',
      type: 'editor',
      col: 's12 m6',
      onChange: handleEditorChange
    },
    {
      name: 'linkSelector',
      label: 'Link Selector',
      type: 'editor',
      col: 's12 m6',
      onChange: handleEditorChange
    },
    {
      name: 'sectionSelector',
      label: 'Section Selector',
      type: 'editor',
      col: 's12 m6',
      onChange: handleEditorChange
    },
    {
      name: 'imageSelector',
      label: 'Image Selector',
      type: 'editor',
      col: 's12 m6',
      onChange: handleEditorChange
    }
  ];

  return (
    <Container>
      <Card hoverable={false} title={props.title}>
        <form onSubmit={handleSubmit} className="row">
          {renderItems(items, newspaper)}

          <div className="card-actions col s12">
            <LinkButton
              to="/newspapers"
              classNames="grey lighten-3 black-text"
              icon="clear"
              label="Cancel"
            />

            {newspaper._id && (
              <Button
                type="button"
                icon="delete"
                label="Delete"
                classNames="grey lighten-3 black-text"
                onClick={handleClickDelete}
              />
            )}

            <Button type="submit" icon="save" label="Save" />
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default EditNewspaperContainer = withTracker(props => {
  const { id } = props.match.params;

  return {
    id,
    newspaper: Newspapers.findOne(id) || {},
    title: id ? 'Edit Newspaper' : 'New Newspaper'
  };
})(EditNewspaper);
