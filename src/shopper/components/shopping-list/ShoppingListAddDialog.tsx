import React from 'react';
import ListDialog from './ShoppingListDialog';

interface Props {
  isOpen: boolean;
  isValid: (value: string) => boolean;
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
