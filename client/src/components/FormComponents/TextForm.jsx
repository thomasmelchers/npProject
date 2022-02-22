import { TextField } from '@mui/material';
import React from 'react';

const TextForm = ({label, id, type, name, shrink, value, min, max, onChange, select, required}) => {
  return (
        <TextField
      label={label}
      id={id}
      type={type}
      name={name}
      fullWidth
      variant="outlined"
      InputLabelProps={shrink}
      value={value}
      min={min}
      max={max}
      select={select}
      onChange={onChange}
      required={required}
     ></TextField>
  )
};

export default TextForm;
