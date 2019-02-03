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

type Props = {
  // type of `fab` not really important, just to please typescript
  classes: { fab: any },
  onCreate: (name: string) => void,
};

type State = {
  open: boolean,
  value: string
};

/**
 * Add List Fab button and Dialog
 */
class AddList extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      open: false,
      value: '',
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (event.target.value === null || event.target.value === undefined) {
      return;
    }
    this.setState({ value: event.target.value });
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleCreate() {
    const listName = this.state.value;
    this.props.onCreate(listName);
    this.setState({ open: false });
  };

  handleCancel() {
    this.setState({
      open: false,
      value: '',
    });
  };

  render() {
    const { classes } = this.props;
    const cannotCreate = this.state.value.length <= 0;

    return (
      <div>
        <Tooltip title='Add List'>
          <Fab
            color='secondary'
            className={classes.fab}
            onClick={this.handleOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleCancel}
        >
          <DialogTitle>New List</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new shopping list.
            </DialogContentText>
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin='dense'
              label='List Name'
              type='text'
              placeholder='e.g. LIDL tuesday'
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleCancel} color='primary'>Cancel</Button>
            <Button onClick={this.handleCreate} disabled={cannotCreate} color='primary'>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

const AddListWithStyle = withStyles(styles)(AddList);

export default AddListWithStyle;
