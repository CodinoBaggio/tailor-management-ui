import { Box } from '@mui/material';
import { SimpleTreeView, TreeItem, useTreeViewApiRef } from '@mui/x-tree-view';
import React, { useEffect, useState } from 'react';
import { FabricStock } from './stock/FabricStock';
import { LiningStock } from './stock/LiningStock';
import { FabricProduct } from './product/FabricProduct';
import { LiningProduct } from './product/LiningProduct';
import { ButtonProduct } from './product/ButtonProduct';
import { FabricPrice } from './price/FabricPrice';
import { LiningPrice } from './price/LiningPrice';
import { ButtonPrice } from './price/ButtonPrice';
import { CustomFeaturePrice } from './price/CustomFeaturePrice';
import { WagesPrice } from './price/WagesPrice';

export const MasterMaintenance = () => {
  const apiRef = useTreeViewApiRef();
  const [selectedComponent, setSelectedComponent] = useState<string | null>('fabric');

  useEffect(() => {
    apiRef.current?.selectItem({
      event: {} as React.SyntheticEvent,
      itemId: 'fabricProduct',
    });
  }, [apiRef]);

  const handleSelect = (_event: React.SyntheticEvent<Element, Event>, nodeId: string | null) => {
    setSelectedComponent(nodeId);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'fabricProduct':
        return <FabricProduct />;
      case 'liningProduct':
        return <LiningProduct />;
      case 'buttonProduct':
        return <ButtonProduct />;
      case 'fabricPrice':
        return <FabricPrice />;
      case 'liningPrice':
        return <LiningPrice />;
      case 'buttonPrice':
        return <ButtonPrice />;
      case 'wagesPrice':
        return <WagesPrice />;
      case 'customFeaturePrice':
        return <CustomFeaturePrice />;
      case 'fabricStock':
        return <FabricStock />;
      case 'liningStock':
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
          expandedItems={[
            'product',
            'fabricProduct',
            'liningProduct',
            'buttonProduct',
            'price',
            'fabricPrice',
            'liningPrice',
            'buttonPrice',
            'wagesPrice',
            'customFeaturePrice',
            'stock',
            'fabricStock',
            'liningStock',
          ]}
        >
          <TreeItem itemId="product" label="品番メンテナンス">
            <TreeItem itemId="fabricProduct" label="生地品番" />
            <TreeItem itemId="liningProduct" label="裏地品番" />
            <TreeItem itemId="buttonProduct" label="ボタン品番" />
          </TreeItem>
          <TreeItem itemId="price" label="価格メンテナンス">
            <TreeItem itemId="fabricPrice" label="生地価格" />
            <TreeItem itemId="liningPrice" label="裏地価格" />
            <TreeItem itemId="buttonPrice" label="ボタン価格" />
            <TreeItem itemId="wagesPrice" label="工賃価格" />
            <TreeItem itemId="customFeaturePrice" label="仕様変更価格" />
          </TreeItem>
          <TreeItem itemId="stock" label="在庫確認">
            <TreeItem itemId="fabricStock" label="生地在庫" />
            <TreeItem itemId="liningStock" label="裏地在庫" />
          </TreeItem>
        </SimpleTreeView>
      </Box>
      <Box className="m-3">{renderComponent()}</Box>
    </Box>
  );
};
