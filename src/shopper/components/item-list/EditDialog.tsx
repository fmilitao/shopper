import React from 'react';
import ListDialog from './GenericDialog';

interface Props {
  isOpen: boolean;
  initialValue: { name: string; comment: string };
  onClose: (value?: { name: string; comment: string }) => void;
}

export default function (props: Props) {
  return (
    <ListDialog
      value={props.initialValue}
      title="Edit List"
      okText="Update"
      descriptionText="Pick the name for your list."
      {...props}
    />
  );
}
