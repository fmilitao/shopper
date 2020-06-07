import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { actions, mapState } from '../redux/store';
import Component from './AddItemButton';

const connector = connect(mapState, {
  onValue: (value: { name: string; quantity: number }) =>
    actions.addItem(value),
});

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromArgs = {};

export type Props = PropsFromRedux & PropsFromArgs;

const ConnectedComponent = connector(Component);

export default function () {
  return (
    <ConnectedComponent
      isValid={(newValue: { name: string; quantity: number }) =>
        newValue.name.trim().length > 0 && newValue.quantity > 0
      }
    />
  );
}
