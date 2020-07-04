import React from 'react';
import ListDialog from './GenericDialog';
import { SimpleItem as Item } from '../../redux/state';

interface Props {
  categories: string[];
  isOpen: boolean;
  initialValue: Item;
  onCommit: (value: Item) => void;
}

export default function (props: Props) {
  return (
    <ListDialog
      value={props.initialValue}
      title="Edit List"
      okText="Update"
      cancelText="Cancel"
      descriptionText="Pick the name for your list."
      {...props}
    />
  );
}
