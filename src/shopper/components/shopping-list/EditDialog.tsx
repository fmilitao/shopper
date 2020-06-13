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
      descriptionText="Pick the name for your list."
      {...props}
    />
  );
}
