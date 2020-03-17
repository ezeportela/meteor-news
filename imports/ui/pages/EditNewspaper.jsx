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
  const defaultEditorValue = `($) => {
  return $('selector');
}`;
  const [newspaper, setnewspaper] = useState({
    title: '',
    articleSelector: defaultEditorValue,
    periodicity: 1,
    lastPrice: 0,
    lastPeriod: getPeriod(),
    expireDay: 10,
    active: true
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
      setnewspaper(props.newspaper);
    }
    M.updateTextFields();
  });

  const handleChange = e =>
    setnewspaper({
      ...newspaper,
      [e.target.name]: e.target.value
    });

  const handleEditorChange = (editor, data, value) => {
    console.log(editor, data, value);
  };

  const handleCheckboxChange = e =>
    setnewspaper({
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

          <CodeMirror
            className="col s12"
            value={newspaper.articleSelector}
            name="articleSelector"
            options={editorOptions}
            onChange={handleEditorChange}
          />

          <TextInput
            col="s12 m6"
            id="price"
            name="lastPrice"
            label="Price"
            type="number"
            onChange={handleChange}
            value={newspaper.lastPrice}
            icon="attach_money"
            validate={true}
          />

          <Checkbox
            name="active"
            col="input-field s12 m6"
            label="Active"
            checked={newspaper.active}
            onChange={handleCheckboxChange}
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
