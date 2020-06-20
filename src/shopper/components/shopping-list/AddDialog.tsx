import React from 'react';
import ListDialog from './GenericDialog';

interface Props {
  isOpen: boolean;
  onClose: (value?: {
    name: string;
    items: { name: string; comment: string }[];
  }) => void;
}

const initialValue = '';

export default function (props: Props) {
  return (
    <ListDialog
      value={initialValue}
      title="Create List"
      okText="Create"
      isEdit={false}
      descriptionText="Pick the name for your new list."
      {...props}
    />
  );
}
