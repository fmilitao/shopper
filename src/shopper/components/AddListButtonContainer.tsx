import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { actions, mapState } from '../redux/store';
import Component from './AddListButton';

const connector = connect(mapState, {
  onValue: (value: string) => actions.addList(value),
});

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromArgs = {};

export type Props = PropsFromRedux & PropsFromArgs;

const ConnectedComponent = connector(Component);

export default function () {
  return (
    <ConnectedComponent
      isValid={(newValue: string) => newValue.trim().length > 0}
    />
  );
}
