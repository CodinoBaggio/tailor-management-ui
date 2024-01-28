import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';

import { ProductMaintenance } from '../features/admin/components/ProductMaintenance';
import { CustomerMaintenace } from '../features/admin/components/CustomerMaintenace';
import { VerticalTabs } from '../components/ui/VerticalTabs';
import { PriceMaintenance } from '../features/admin/components/PriceMaintenance';
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <Box className=" flex my-5 text-gray-500" justifyContent="space-between">
        <Box className='flex'>
          <SecurityIcon className="mr-3" />
          <Box>管理者メニュー</Box>
        </Box>
        <Button
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          color="info"
          size="small"
        >
          戻る
        </Button>
      </Box>
      <Box>
        <VerticalTabs
          tabItems={[
            {
              label: '商品',
              component: <ProductMaintenance />,
            },
            {
              label: '価格',
              component: <PriceMaintenance />,
            },
            {
              label: '顧客',
              component: <CustomerMaintenace />,
            },
          ]}
        />
      </Box>
    </>
  );
};
