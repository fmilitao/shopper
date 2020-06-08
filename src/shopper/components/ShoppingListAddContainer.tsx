import React from 'react';
import { connect } from 'react-redux';
import { actions, mapState } from '../redux/store';
import Component from './ShoppingListAdd';

const connector = connect(mapState, {
  onValue: (value: string) => actions.addList(value),
});

const ConnectedComponent = connector(Component);

export default function () {
  return (
    <ConnectedComponent
      isValid={(newValue: string) => newValue.trim().length > 0}
    />
  );
}
