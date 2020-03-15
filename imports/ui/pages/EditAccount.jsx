import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from '../../api/accounts';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import M from 'materialize-css';
import Card from '../components/Card';
import _ from 'lodash';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';
import { getPeriod, formatPeriod } from '../../api/common';
import Checkbox from '../components/Checkbox';

const EditAccount = props => {
  const { id } = props;
  const [account, setAccount] = useState({
    name: '',
    periodicity: 1,
    lastPrice: 0,
    lastPeriod: getPeriod(),
    expireDay: 10,
    active: true
  });
  const prevFetch = null;

  useEffect(() => {
    if (
      prevFetch !== props.account &&
      !_.isEmpty(props.account) &&
      (_.isEmpty(prevFetch) ||
        confirm('The record has been updated. Would you like to reload it?'))
    ) {
      setAccount(props.account);
    }
    M.updateTextFields();
  });

  const handleChange = e =>
    setAccount({
      ...account,
      [e.target.name]: e.target.value
    });

  const handleCheckboxChange = e =>
    setAccount({
      ...account,
      [e.target.name]: e.target.checked
    });

  const handleClickDelete = () => {
    if (confirm('Are you sure do you want to delete the account?')) {
      Meteor.call('accounts.delete', account._id);
      props.history.push('/accounts');
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { periodicity, lastPrice, expireDay } = account;
    Object.assign(account, {
      periodicity: parseInt(periodicity),
      lastPrice: parseInt(lastPrice),
      expireDay: parseInt(expireDay)
    });
    Meteor.call('accounts.save', id, account);
    props.history.push('/accounts');
  };

  return (
    <Container>
      <Card hoverable={false} title={props.title}>
        <form onSubmit={handleSubmit} className="row">
          <TextInput
            col="s12 m6"
            id="name"
            name="name"
            onChange={handleChange}
            label="Account Name"
            icon="label"
            value={account.name}
            validate={true}
          />

          <TextInput
            col="s12 m6"
            id="price"
            name="lastPrice"
            label="Price"
            type="number"
            onChange={handleChange}
            value={account.lastPrice}
            icon="attach_money"
            validate={true}
          />

          <TextInput
            col="s12 m6"
            id="periodicity"
            name="periodicity"
            label="Periodicity"
            type="number"
            onChange={handleChange}
            value={account.periodicity}
            icon="calendar_view_day"
            validate={true}
          />

          <TextInput
            col="s12 m6"
            id="lastPeriod"
            name="lastPeriod"
            label="Last Period"
            type="text"
            value={formatPeriod(account.lastPeriod)}
            readOnly={true}
            icon="calendar_today"
            required={false}
          />

          <TextInput
            col="s12 m6"
            id="expireDay"
            name="expireDay"
            label="Expire Day"
            type="number"
            value={account.expireDay}
            onChange={handleChange}
            icon="history"
            validate={true}
          />

          <Checkbox
            name="active"
            col="input-field s12 m6"
            label="Active"
            checked={account.active}
            onChange={handleCheckboxChange}
          />

          <div className="card-actions col s12">
            <LinkButton
              to="/accounts"
              classNames="grey lighten-3 black-text"
              icon="clear"
              label="Cancel"
            />

            {account._id && (
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

export default EditAccountContainer = withTracker(props => {
  const { accountId: id } = props.match.params;

  return {
    id,
    account: Accounts.findOne({ _id: id }) || {},
    title: id ? 'Edit Account' : 'New Account'
  };
})(EditAccount);
