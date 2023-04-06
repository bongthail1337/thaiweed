import SC from '@emotion/styled';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MSelect from '@mui/material/Select';
import React from 'react';

const HelperText = SC(FormHelperText)``;

const Label = SC(InputLabel)``;

const Container = SC(FormControl)`
  margin: 10px 0px;
`;

export const Select = ({
  label,
  helperText,
  focused,
  disabled,
  error,
  required,
  variant = 'standard',
  items = [],
  ...other
}) => {
  const formProps = {
    disabled,
    error,
    required,
    variant,
  };
  return (
    <>
      {/*// @ts-ignore*/}
      <Container focused={focused} {...formProps}>
        {label && <Label shrink>{label}</Label>}
        <MSelect {...other}>
          {items.map((o, i) => (
            <MenuItem key={i} value={o.value}>
              {o.label || o.value}
            </MenuItem>
          ))}
        </MSelect>
        {helperText && (
          <HelperText id="helper-text" focused={focused}>
            {helperText}
          </HelperText>
        )}
      </Container>
    </>
  );
};
