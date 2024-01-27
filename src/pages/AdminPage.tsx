import React from 'react';

import { ProductMaintenance } from '../features/admin/components/ProductMaintenance';
import { CustomerMaintenace } from '../features/admin/components/CustomerMaintenace';
import { Box } from '@mui/material';
import { VerticalTabs } from '../components/ui/VerticalTabs';

export const AdminPage = () => {
  return (
    <>
      <Box className="flex">
        <VerticalTabs
          tabItems={[
            {
              label: '商品',
              component: <ProductMaintenance />,
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
