import SC from '@emotion/styled';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import {IMaskInput} from 'react-imask';

type TextMaskCustomProps = {
  name: any;
  onChange: any;
};

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props: TextMaskCustomProps, ref: any) {
  const {onChange, ...other} = props;
  const handleAccept = v => {
    const value = (v || '').replace(/ /g, '').replace(/-/g, '');
    onChange({target: {name: props.name, value}});
  };

  return (
    <IMaskInput
      {...other}
      // mask="+{7} 000 000-00-00"
      mask="+00000000000[0]"
      definitions={{
        /*// @ts-ignore*/
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={handleAccept}
      overwrite
    />
  );
});

const HelperText = SC(FormHelperText)``;

const Label = SC(InputLabel)``;

type ContainerProps = {
  focused?: boolean;
};

const Container = SC(FormControl)<ContainerProps>``;

export const InputPhone = ({label, helperText, focused, disabled, error, required, variant = 'standard', ...other}) => {
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
        {/*<Input type="tel" placeholder="+7 ___ ___-__-__" inputComponent={TextMaskCustom} {...other} />*/}
        <Input type="tel" inputComponent={TextMaskCustom} {...other} />
        {helperText && (
          <HelperText id="helper-text" focused={focused}>
            {helperText}
          </HelperText>
        )}
      </Container>
    </>
  );
};
