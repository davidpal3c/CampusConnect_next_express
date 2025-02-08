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

export function UpdateDialog ({
  open,
  handleClose,
  handleSubmit,
  initialData = {},
  title = "Update Form",
  confirmButtonText = "Save",
  cancelButtonText = "Cancel",
}) {
  
  const [user, setUser] = useState(initialData);
  const [role, setRole] = useState(initialData.role);
  const [permissions, setPermissions] = useState(
    initialData.role === "Admin" ? initialData.Admin.permissions : []
  );
  console.log(initialData);

  const rolesArray = ["Admin", "Alumni", "Student"];
  const permissionsArray = ["Full Access", "Read-Write", "Read-Only"];

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  }

  const handlePermissionsChange = (e) => {
    setPermissions(e.target.value);
  }

  const handleFormSubmit = () => {
    handleSubmit(user);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="font-semibold">{title}</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="first_name"
          value={user.first_name}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={user.last_name}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          select
          label="Role"
          name="role"
          value={role}
          onChange={handleRoleChange}
          fullWidth
          margin="dense"
        >
          {rolesArray.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>

        {/* Role Specific Fields */}

        {user.role == "Admin" && (
          <TextField
          select
          label="Permissions"
          name="permissions"
          value={permissions}
          onChange={handlePermissionsChange}
          fullWidth
          margin="dense"
        >
          {permissionsArray.map((permission) => (
            <MenuItem key={permission} value={permission}>
              {permission}
            </MenuItem>
          ))}
        </TextField>
        )}

        {user.role == "Alumni" && (
          <div>
            <TextField
              label="Graduation Year"
              name="graduation_year"
              value={user.Alumni.graduation_year}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />

            <TextField
              label="Credentials"
              name="credentials"
              value={user.Alumni.credentials}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            
            <TextField
              label="Current Position"
              name="current_position"
              value={user.Alumni.current_position}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />

            <TextField
              label="Company"
              name="company"
              value={user.Alumni.company}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />

          </div>          
        )}

        {user.role == "Student" && (
          <div>
            <TextField
              label="Program ID"
              name="program_id"
              value={user.Student.program_id}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />

            <TextField
              label="Department ID"
              name="department_id"
              value={user.Student.department_id}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />

            <TextField
              label="Intake Year"
              name="intake_year"
              value={user.Student.intake_year}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />

          </div>
          
          
        )}

        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {cancelButtonText}
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

