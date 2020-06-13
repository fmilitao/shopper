import React from 'react';
import ListDialog from './GenericDialog';

interface Props {
  isOpen: boolean;
  onClose: (value?: string) => void;
}

const initialValue = '';

export default function (props: Props) {
  return (
    <ListDialog
      value={initialValue}
      title="Create List"
      okText="Create"
      descriptionText="Pick the name for your new list."
      {...props}
    />
  );
}
