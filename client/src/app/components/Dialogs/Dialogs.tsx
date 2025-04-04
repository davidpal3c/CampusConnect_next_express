import React, {useState} from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, InputLabel, MenuItem } from '@mui/material';

export function DeleteDialog({
  open,
  handleClose,
  handleConfirm,
  message,
  title = 'Delete Confirmation',
  confirmButtonText = 'Delete',
  cancelButtonText = 'Cancel',
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-confirmation-dialog-title"
      aria-describedby="delete-confirmation-dialog-description"
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust opacity here
        },
      }}
    >
      <DialogTitle id="delete-confirmation-dialog-title" className="font-semibold">{title}</DialogTitle>
      <DialogContent>
        <p id="delete-confirmation-dialog-description">{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {cancelButtonText}
        </Button>
        <Button onClick={handleConfirm} color="error" >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}