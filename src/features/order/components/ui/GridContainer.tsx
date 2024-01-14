import React from 'react';
import { Grid } from '@mui/material';

export const GridContainer = (props: any) => {
  const { children } = props;

  return (
    <Grid container spacing={2}>
      {children.map((child: React.ReactNode, index: number) => {
        return (
          <Grid item key={index} className="m-auto">
            {child}
          </Grid>
        );
      })}
    </Grid>
  );
};
