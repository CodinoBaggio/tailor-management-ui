import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import ReplyIcon from '@mui/icons-material/Reply';

import { ProductMaintenance } from '../features/admin/components/ProductMaintenance';
import { CustomerMaintenace } from '../features/admin/components/CustomerMaintenace';
import { PriceMaintenance } from '../features/admin/components/PriceMaintenance';
import { useNavigate } from 'react-router-dom';
import { HorizontalTabs } from '../components/ui/HorizontalTabs';
import { UserMaintenance } from '../features/admin/components/UserMaintenance';

export const AdminPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Box className=" flex my-5 text-gray-500" alignItems='center'>
      <Box className="flex mr-5" alignItems='center'>
          <SecurityIcon className="mr-3" />
          <Typography variant='h6'>管理者メニュー</Typography>
        </Box>
        <Button
          onClick={handleBack}
          startIcon={<ReplyIcon />}
          color="info"
          size="small"
        >
          戻る
        </Button>
      </Box>
      <Box>
        <HorizontalTabs
          tabItems={[
            {
              label: '卸先',
              component: <CustomerMaintenace />,
            },
            {
              label: 'ユーザー',
              component: <UserMaintenance />,
            },
            {
              label: '商品',
              component: <ProductMaintenance />,
            },
            {
              label: '価格',
              component: <PriceMaintenance />,
            },
          ]}
        />
      </Box>
    </>
  );
};
