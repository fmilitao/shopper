import React from 'react';
import ItemDialog from './GenericDialog';
import { SimpleItem as Item } from '../../redux/state';

interface Props {
  isOpen: boolean;
  categories: string[];
  onCommit: (value: Item) => void;
}

const initialValue: Item = { name: '', comment: '', category: undefined };

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
