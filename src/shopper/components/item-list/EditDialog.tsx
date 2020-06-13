import React from 'react';
import ListDialog from './GenericDialog';

interface Props {
  isOpen: boolean;
  initialValue: { name: string; quantity: number };
  onClose: (value?: { name: string; quantity: number }) => void;
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
