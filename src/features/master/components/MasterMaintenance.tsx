import { Box } from '@mui/material';
import { SimpleTreeView, TreeItem, useTreeViewApiRef } from '@mui/x-tree-view';
import React, { useEffect, useState } from 'react';
import { FabricStock } from './stock/FabricStock';
import { LiningStock } from './stock/LiningStock';

export const MasterMaintenance = () => {
  const apiRef = useTreeViewApiRef();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    'fabric'
  );

  useEffect(() => {
    apiRef.current?.selectItem({
      event: {} as React.SyntheticEvent,
      itemId: 'fabric',
    });
  }, [apiRef]);

  const handleSelect = (
    _event: React.SyntheticEvent<Element, Event>,
    nodeId: string | null
  ) => {
    setSelectedComponent(nodeId);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'fabric':
        return <FabricStock />;
      case 'lining':
        return <LiningStock />;
      default:
        return <FabricStock />;
    }
  };

  return (
    <Box className="flex">
      <Box className="min-w-64 border-r">
        <SimpleTreeView
          onSelectedItemsChange={handleSelect}
          apiRef={apiRef}
          expandedItems={['stock', 'fabric', 'lining']}
        >
          <TreeItem itemId="stock" label="在庫確認">
            <TreeItem itemId="fabric" label="生地" />
            <TreeItem itemId="lining" label="裏地" />
          </TreeItem>
        </SimpleTreeView>
      </Box>
      <Box className="m-3">{renderComponent()}</Box>
    </Box>
  );
};
