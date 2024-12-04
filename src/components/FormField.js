import React from 'react';
import { TextField } from '@mui/material';

const FormField = ({ label, name, value, onChange, error, ...props }) => {
    const commonTextFieldStyles = {
          fontSize: "0.875rem",
          borderRadius: "0px",
          padding: "8px",
          "& .MuiOutlinedInput-root": {
            borderColor: "rgba(0, 0, 0, 0.12)",
            borderRadius: "0px",
          },
        };
  return (
    <TextField
   
    fullWidth
    placeholder={label}
    name={name}
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={error}
    sx={commonTextFieldStyles}
    size="small"
    autoComplete="off"
    />
  );
};

export default FormField;
