import React, { Fragment, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = (props) => {
  const { label, onValueChange, visibility, value } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Fragment>
      <InputLabel htmlFor={label} sx={{ display: 'block' }}>
        {label}
      </InputLabel>
      <TextField
        id={label}
        fullWidth
        type={label === 'Email' ? 'text' : showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        variant="outlined"
        InputProps={
          visibility
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Fragment>
  );
};

export default Input;
