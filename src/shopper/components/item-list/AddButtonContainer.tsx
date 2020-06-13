import React from 'react';
import { connect } from 'react-redux';
import { actions, mapState } from '../../redux/store';
import Component from './AddButton';

const connector = connect(mapState, {
  onValue: (value: { name: string; quantity: number }) =>
    actions.addItem(value),
});

const ConnectedComponent = connector(Component);

export default function () {
  return (
    <ConnectedComponent
      // FIXME: generalize? or validate each separately
      // TODO: also make sure to use selectors on props!
      isValid={(newValue: { name: string; quantity: number }) =>
        newValue.name.trim().length > 0 && newValue.quantity > 0
      }
    />
  );
}
