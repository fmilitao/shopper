import React from 'react';
import ListDialog from './GenericDialog';

interface Props {
  isOpen: boolean;
  initialValue: string;
  onClose: (value?: string) => void;
}

export default function (props: Props) {
  return (
    <ListDialog
      value={props.initialValue}
      title="Edit List"
      okText="Update"
      isEdit={true}
      descriptionText="Pick the name for your list."
      {...props}
      onClose={value => (value ? props.onClose(value.name) : props.onClose())}
    />
  );
}
