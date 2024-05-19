import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import DownloadIcon from '@mui/icons-material/Download';

import { InvoiceData } from '../features/invoice/components/InvoiceData';

export const InvoicePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <Box className=" flex my-5 text-gray-500" alignItems="center">
        <Box className="flex mr-5" alignItems="center">
          <DownloadIcon className="mr-3" />
          <Typography variant="h6">請求書データダウンロード</Typography>
        </Box>
        <Button
          onClick={handleBack}
          startIcon={<ReplyIcon />}
          color="info"
          size="small"
        >
          ホーム
        </Button>
      </Box>
      <Divider />
      <Box className="mt-5">
        <InvoiceData />
      </Box>
    </>
  );
};
