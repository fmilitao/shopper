import React from 'react';
import ItemDialog from './GenericDialog';

interface Props {
  isOpen: boolean;
  onClose: (value?: { name: string; quantity: number }) => void;
}

const initialValue = { name: '', quantity: 1 };

export default function (props: Props) {
  return (
    <ItemDialog
      value={initialValue}
      title="Create Item"
      okText="Create"
      descriptionText="Pick the name for your new item."
      {...props}
    />
  );
}
