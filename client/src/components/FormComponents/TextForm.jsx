import { TextField } from '@mui/material';
import React from 'react';

const TextForm = (props) => {
  return (
        <TextField
      label={props.label}
      id={props.id}
      type={props.type}
      name={props.name}
      fullWidth
      variant="outlined"
      InputLabelProps={props.shrink}
      value={props.value}
      onChange={props.onChange}
     ></TextField>
  )
};

export default TextForm;
