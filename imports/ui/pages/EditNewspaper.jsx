import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import M from 'materialize-css';
import Card from '../components/Card';
import _ from 'lodash';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';
import { getPeriod, formatPeriod } from '../../api/common';
import Checkbox from '../components/Checkbox';
import { Newspapers } from '../../api/newspapers';

import './styles/EditNewspaper.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';

const EditNewspaper = props => {
  const { id } = props;
  const defaultEditorValue = `($) => $('selector');`;
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
  const prevFetch = null;

  const editorOptions = {
    mode: 'javascript',
    theme: 'material',
    lineNumbers: true
  };

  useEffect(() => {
    if (
      prevFetch !== props.newspaper &&
      !_.isEmpty(props.newspaper) &&
      (_.isEmpty(prevFetch) ||
        confirm('The record has been updated. Would you like to reload it?'))
    ) {
      setNewspaper(props.newspaper);
    }
    M.updateTextFields();
  });

  const handleChange = e =>
    setNewspaper({
      ...newspaper,
      [e.target.name]: e.target.value
    });

  const handleEditorChange = (editor, data, value) => {
    console.log(editor, data, value);
  };

  const handleCheckboxChange = e =>
    setNewspaper({
      ...newspaper,
      [e.target.name]: e.target.checked
    });

  const handleClickDelete = () => {
    if (confirm('Are you sure do you want to delete the newspaper?')) {
      Meteor.call('newspapers.delete', newspaper._id);
      props.history.push('/newspapers');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { periodicity, lastPrice, expireDay } = newspaper;
    Object.assign(newspaper, {
      periodicity: parseInt(periodicity),
      lastPrice: parseInt(lastPrice),
      expireDay: parseInt(expireDay)
    });
    Meteor.call('newspapers.save', id, newspaper);
    props.history.push('/newspapers');
  };

  return (
    <Container>
      <Card hoverable={false} title={props.title}>
        <form onSubmit={handleSubmit} className="row">
          <TextInput
            col="s12 m6"
            id="title"
            name="title"
            onChange={handleChange}
            label="Title"
            icon="label"
            value={newspaper.title}
            validate={true}
          />

          <TextInput
            col="s12 m6"
            id="url"
            name="url"
            onChange={handleChange}
            label="URL"
            icon="vpn_lock"
            value={newspaper.url}
            validate={true}
          />

          <TextInput
            col="s12 m6"
            id="logoURL"
            name="logoURL"
            onChange={handleChange}
            label="Logo URL"
            icon="image"
            value={newspaper.logoURL}
            validate={true}
          />

          <Checkbox
            name="active"
            col="input-field s12 m6"
            label="Active"
            checked={newspaper.active}
            onChange={handleCheckboxChange}
          />

          <span class="col s12">Article Selector</span>
          <CodeMirror
            className="col s12"
            value={newspaper.articleSelector}
            name="articleSelector"
            options={editorOptions}
            onChange={handleEditorChange}
          />

          <span class="col s12">Link Selector</span>
          <CodeMirror
            className="col s12"
            value={newspaper.linkSelector}
            name="articleSelector"
            options={editorOptions}
            onChange={handleEditorChange}
          />

          <span class="col s12">Section Selector</span>
          <CodeMirror
            className="col s12"
            value={newspaper.sectionSelector}
            name="articleSelector"
            options={editorOptions}
            onChange={handleEditorChange}
          />

          <span class="col s12">Image Selector</span>
          <CodeMirror
            className="col s12"
            value={newspaper.imageSelector}
            name="articleSelector"
            options={editorOptions}
            onChange={handleEditorChange}
          />

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
