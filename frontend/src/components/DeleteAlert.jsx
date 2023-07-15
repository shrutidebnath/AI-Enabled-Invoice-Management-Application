import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { memo } from "react";

function DeleteAlert({ open, handleDeleteConfirm, handleDeleteClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleDeleteClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete Records?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete these record[s]?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(DeleteAlert);
