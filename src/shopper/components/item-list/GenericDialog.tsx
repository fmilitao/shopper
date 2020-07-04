import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '../common/Dialog';
import Select from '../common/Select';
import { SimpleItem as Item } from '../../redux/state';

interface Props {
  title: string;
  okText: string;
  cancelText: string;
  anotherText?: string;
  descriptionText: string;
  listOptions?: string[];
  categories: string[];
  selectedList?: number;
  // ...
  isOpen: boolean;
  value: { name: string; comment: string; category?: string };
  onCommit: (value: {
    name: string;
    comment: string;
    listIndex?: number;
    category?: string;
  }) => void;
}

const isValid = ({ name, category }: Item) => ({
  name: name.trim().length > 0,
  // these are always valid
  comment: true,
  category: true,
});

export default function (props: Props) {
  const initialCheck = isValid(props.value);
  const [isValidCheck, setValidCheck] = React.useState(initialCheck);
  const [tmpValue, setTmpValue] = React.useState({
    ...props.value,
    category: props.value.category || '',
  });
  const [tmpList, setTmpList] = React.useState(props.selectedList);
  const [showText, setShowText] = React.useState(false);

  function handleClose(commit: boolean) {
    if (commit) {
      const { category } = tmpValue;
      props.onCommit({
        ...tmpValue,
        category: category.trim().length <= 0 ? undefined : category,
        listIndex: tmpList,
      });
    }
  }

  function handleOpen() {
    setTmpValue({ ...props.value, category: props.value.category || '' });
    setValidCheck(isValid(props.value));
    setTmpList(props.selectedList);
    setShowText(false);
    if (defaultFocus.current) {
      defaultFocus.current.focus();
    }
  }

  function handleNameChange(event: any) {
    const newValue = {
      ...tmpValue,
      name: event.target.value,
    };
    setTmpValue(newValue);
    setValidCheck(isValid(newValue));
  }

  function handleCommentChange(event: any) {
    const newValue = {
      ...tmpValue,
      comment: event.target.value,
    };
    setTmpValue(newValue);
    setValidCheck(isValid(newValue));
  }

  function handleListChange(index: number) {
    setTmpList(index);
  }

  function handleCategoryIndexChange(index: number) {
    if (index === 0) {
      const newValue = {
        ...tmpValue,
        category: '',
      };
      setTmpValue(newValue);
      setValidCheck(isValid(newValue));
      return;
    }
    if (index - 1 < props.categories.length) {
      const newValue = {
        ...tmpValue,
        category: props.categories[index - 1],
      };
      setTmpValue(newValue);
      setValidCheck(isValid(newValue));
      return;
    }

    // set text to empty
    const newValue = { ...tmpValue, category: '' };
    setTmpValue(newValue);
    setValidCheck(isValid(newValue));
    setShowText(true);
  }

  function handleCategoryNameChange(event: any) {
    const newValue = {
      ...tmpValue,
      category: event.target.value,
    };
    setTmpValue(newValue);
    setValidCheck(isValid(newValue));
  }

  const defaultFocus = React.useRef<any>(null);

  const { category } = props.value;
  const noCategories = props.categories.length <= 0;
  const notInCategoryList =
    category !== undefined && props.categories.indexOf(category) < 0;
  const showDialogText = showText || noCategories || notInCategoryList;

  return (
    <div>
      <Dialog
        isOpen={props.isOpen}
        description={props.descriptionText}
        isValid={
          isValidCheck.name && isValidCheck.comment && isValidCheck.category
        }
        onOpen={handleOpen}
        onClose={handleClose}
        title={props.title}
        ok={props.okText}
        another={props.anotherText}
        cancel={props.cancelText}
      >
        <TextField
          error={!isValidCheck.name}
          inputRef={input => {
            defaultFocus.current = input;
          }}
          margin="dense"
          label="Item name"
          placeholder="What's the name of the item?"
          type="text"
          onChange={handleNameChange}
          fullWidth
          value={tmpValue.name}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          error={!isValidCheck.comment}
          margin="dense"
          label="Comment (optional)"
          placeholder="How many of this item?"
          value={tmpValue.comment}
          onChange={handleCommentChange}
          type="text"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        {!showDialogText && (
          <Select
            title="Category"
            value={tmpValue.category}
            onChange={index => handleCategoryIndexChange(index)}
            choices={['[None]', ...props.categories, '[Add Category]']}
          />
        )}
        {showDialogText && (
          <TextField
            autoFocus={true}
            error={!isValidCheck.category}
            margin="dense"
            label="Category (optional)"
            placeholder="Which category?"
            value={tmpValue.category}
            onChange={handleCategoryNameChange}
            type="text"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        {props.listOptions && tmpList !== undefined && (
          <Select
            title="List (optional, moves item to another list)"
            value={props.listOptions[tmpList]}
            onChange={handleListChange}
            choices={props.listOptions}
          />
        )}
      </Dialog>
    </div>
  );
}
