import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { maxWidth } from "@material-ui/system";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import categories from "../data/Categories";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const useStyles = makeStyles(theme => ({
  rightIcon: {
    marginRight: theme.spacing(1)
  },
  leftIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  buttonHover: {
    backgroundColor: "transparent",
    color: "black",

    "&:hover": {
      backgroundColor: "#b2b2b2",
      color: "white",
      border: "#b2b2b2"
    }
  }
}));

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const CustomizedDialogs = ({ link, sendMeme, setShow, open, onChange }) => {
  const classes = useStyles();
  //const [open, setOpen] = useState(true);

  function handleClickOpen() {
    //setOpen(true);
  }

  function handleClose() {
    // setOpen(false);
    setShow(false);
  }

  return (
    <div>
      {/* <Button
          variant="outlined"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          Open dialog
        </Button>
          */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <div
          style={{
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "#222",
            color: "white"
          }}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Upload your beautiful meme
          </DialogTitle>
        </div>
        <DialogContent dividers>
          <img
            src={link}
            id="preview"
            alt="preview"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "560px",
              maxHeight: "320px"
            }}
          />
          <br />
          <TextField
            fullWidth
            id="outlined-dense"
            label="title"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            type="text"
            name="title"
            //value={form.title}
            onChange={onChange}
            autoFocus
            required
          />
          <TextField
            fullWidth
            id="outlined-dense"
            label="tags"
            placeholder="TAGS: amlo bliss firebase polloyon"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            type="text"
            name="tags"
            //value={form.title}
            onChange={onChange}
            autoFocus
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="default"
            className={clsx(classes.buttonHover)}
            style={{ marginLeft: "16px", float: "right" }}
          >
            Cancel
          </Button>

          <Button
            onClick={sendMeme}
            type="submit"
            variant="contained"
            color="primary"
            className={clsx(classes.button)}
            style={{ float: "right" }}
          >
            Save
            <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomizedDialogs;
