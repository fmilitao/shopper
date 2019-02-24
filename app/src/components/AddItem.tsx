import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Tooltip from '@material-ui/core/Tooltip';

import { Theme, withStyles, createStyles } from '@material-ui/core';
import { model } from 'shopper-lib';

type Props = {
  // type of `fab` not really important, just to please typescript
  classes: { fab: any };
  onCreate: (name: model.Item) => void;
};

type State = {
  open: boolean;
  name: string;
  quantity: string;
  unit: string;
  comments: string;
};

const EmptyState = {
  name: '',
  quantity: '',
  unit: '',
  comments: '',
};

/**
 * Add Item Fab button and Dialog
 */
class AddItem extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      open: false,
      ...EmptyState,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (event.target.value === null || event.target.value === undefined) {
      return;
    }
    const key = event.target.name as keyof State;
    // @ts-ignore Not TS clever enough to tell that the next line is safe
    this.setState({ [key]: event.target.value });
  }

  handleOpen() {
    this.setState({
      open: true,
      ...EmptyState,
    });
  }

  handleCreate() {
    const { name, quantity, unit, comments } = this.state;

    const item = new model.Item(
      name,
      new model.Quantity(parseFloat(quantity) || 1, unit),
      comments
    );
    this.props.onCreate(item);

    this.setState({
      open: false,
      ...EmptyState,
    });
  }

  handleCancel() {
    this.setState({
      open: false,
      ...EmptyState,
    });
  }

  render() {
    const { classes } = this.props;
    const cannotCreate = this.state.name.length <= 0;

    return (
      <div>
        <Tooltip title='Add Item'>
          <Fab
            color='secondary'
            className={classes.fab}
            onClick={this.handleOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>

        <Dialog open={this.state.open} onClose={this.handleCancel}>
          <DialogTitle>New Item</DialogTitle>
          <DialogContent>
            <DialogContentText>Create a new list item.</DialogContentText>
            <TextField
              error={cannotCreate}
              name='name'
              onChange={this.handleChange}
              autoFocus
              margin='dense'
              label='Item Name'
              type='text'
              placeholder='e.g. LIDL tuesday'
              fullWidth
            />
            <TextField
              name='quantity'
              onChange={this.handleChange}
              margin='dense'
              label='Quantity'
              type='number'
              placeholder='e.g. 1, 500, 1.5'
              fullWidth
            />
            <TextField
              name='unit'
              onChange={this.handleChange}
              margin='dense'
              label='Unit'
              type='text'
              placeholder='e.g. package, kgs, box'
              fullWidth
            />
            <TextField
              name='comments'
              onChange={this.handleChange}
              margin='dense'
              label='Comments'
              type='text'
              placeholder='any comment you would like'
              fullWidth
              multiline
              rows='3'
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleCancel} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={this.handleCreate}
              disabled={cannotCreate}
              color='primary'
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
  });

const AddItemWithStyle = withStyles(styles)(AddItem);

export default AddItemWithStyle;
