import React, { FC } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

type Props = {
  open?: boolean;
  zOrderDrawerIncrement?: number;
};

const Loading: FC<Props> = (props) => {
  const { open = true, zOrderDrawerIncrement = 1 } = props;
  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: '100%',
    //     height: props.fullHeight ? '100vh' : '100%',
    //   }}
    // >
    //   <CircularProgress />
    // </Box>
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + zOrderDrawerIncrement,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
