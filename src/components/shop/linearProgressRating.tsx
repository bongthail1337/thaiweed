import SC from '@emotion/styled';
import Box from '@mui/material/Box';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import * as React from 'react';

const Root = SC.div`
  display: flex;
  align-items: center;
  height: 18px;
  font-size: 12px;
  line-height: 12px;
  margin-bottom: 5px;
`;

const Container = SC.div`
  width: 100%;
  align-items: center;
  margin: 0px;
`;

const Label = SC.div`
  color: rgb(37, 41, 53);
  width: 120px;
  padding-right: 15px;
  padding-left: 20px;
  text-align: left;
`;

const Value = SC.div`
  color: rgb(37, 41, 53);
  width: 120px;
  padding-right: 15px;
  padding-left: 30px;
  text-align: left;
`;

export const LinearProgressRating = ({label, total, value, ...props}: LinearProgressProps & { value: number, total: number; label: string },) => {
  return (
    <Root>
      <Label>{label}</Label> 
      <Container>
        <LinearProgress variant="determinate" value={(value / total)* 100} {...props} />
      </Container>
      <Value>{value}</Value>
    </Root>
  );
}
