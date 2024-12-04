import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

const FormSelect = ({ label, name, value, onChange, options, error }) => {
    const selectS={
        fontSize: '0.875rem',
        borderRadius: '0px', // Sharp corners
        marginTop: '10px',
        width: '100%',
       
        border: "1px solid white"
    }
  return (
    <FormControl fullWidth error={Boolean(error)}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        // label={label}
        size='small'
        sx={selectS}
        
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default FormSelect;
