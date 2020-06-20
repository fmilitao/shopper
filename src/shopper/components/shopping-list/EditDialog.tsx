import React from 'react';
import ListDialog from './GenericDialog';

interface Props {
  isOpen: boolean;
  initialValue: string;
  onCommit: (value: string) => void;
}

export default function (props: Props) {
  return (
    <ListDialog
      value={props.initialValue}
      title="Edit List"
      okText="Update"
      cancelText="Cancel"
      isEdit={true}
      descriptionText="Pick the name for your list."
      {...props}
      onCommit={value => value && props.onCommit(value.name)}
    />
  );
}
