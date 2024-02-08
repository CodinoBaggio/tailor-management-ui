import React, { FC } from 'react';
import { Grid } from '@mui/material';

interface Props {
  children: React.ReactNode[];
  bgColor?: string;
}

export const GridContainer: FC<Props> = (props: any) => {
  const { children, bgColor = '' } = props;

  return (
    <Grid container spacing={2}>
      {children.map((child: React.ReactNode, index: number) => {
        return (
          <Grid item key={index} className={`${bgColor} m-auto pr-3 pb-2`}>
            {child}
          </Grid>
        );
      })}
    </Grid>
  );
};
