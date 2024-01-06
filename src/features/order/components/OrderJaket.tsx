import React from 'react';
import { useFormContext } from 'react-hook-form';
import { RhfSelect } from '../../../components/ui/RhfSelect';

export const OrderJaket = () => {
  const { getValues } = useFormContext();

  return (
    <>
      <div className="font-bold text-blue-600">OrderJaket</div>
      <div>発注_上着_ID：{getValues('jaketOrderId')}</div>
      <RhfSelect
        label="品名"
        name="jaket-selectPattern1"
        menuItems={[
          { value: 'empty', label: '' },
          { value: 'S', label: 'S：？？' },
          { value: '2P', label: '2P：ジャケット＋パンツ' },
          { value: 'JK', label: 'JK：ジャケット' },
          { value: 'PT', label: 'PT：パンツ' },
          { value: 'VT', label: 'VT：ベスト' },
          { value: '3P', label: '3P：ジャケット＋パンツ＋ベスト' },
          { value: '2PP', label: '2PP：ジャケット＋パンツ＋パンツ' },
          { value: '3PP', label: '3PP：ジャケット＋パンツ＋パンツ＋ベスト' },
        ]}
      />
</>
  );
};
