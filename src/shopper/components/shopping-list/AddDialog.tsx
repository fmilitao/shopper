import React from 'react';
import ListDialog from './GenericDialog';

interface Props {
  isOpen: boolean;
  onCommit: (value: {
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
      okText="Add"
      cancelText="Cancel"
      anotherText="Add Another"
      isEdit={false}
      descriptionText="Pick the name for your new list."
      {...props}
    />
  );
}
