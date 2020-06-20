import React from 'react';
import ItemDialog from './GenericDialog';

interface Props {
  isOpen: boolean;
  onCommit: (value: { name: string; comment: string }) => void;
}

const initialValue = { name: '', comment: '' };

export default function (props: Props) {
  return (
    <ItemDialog
      value={initialValue}
      title="Create Item"
      okText="Add"
      cancelText="Cancel"
      anotherText="Add Another"
      descriptionText="Pick the name for your new item."
      {...props}
    />
  );
}
