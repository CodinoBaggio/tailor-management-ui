import React from 'react';
import { useFormContext } from 'react-hook-form';
import 'dayjs/locale/ja';
import { RhfSelect } from '../../../components/ui/RhfSelect';
import { RhfTextField } from '../../../components/ui/RhfTextField';
import { RhfDatePicker } from '../../../components/ui/RhfDatePicker';
import { RhfDateTimePicker } from '../../../components/ui/RhfDateTimePicker';

export const OrderBasis = () => {
  const { getValues } = useFormContext();

  return (
    <>
      <div className="font-bold text-blue-600">OrderBasis</div>
      <div>発注ステータス：{getValues('basis-orderStatus')}</div>
      <RhfSelect
        label="品名"
        name="basis-productName"
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
      <RhfTextField
        label="生地メーカー"
        name="basis-fabricMaker"
        required
        message="生地メーカーを入力してください"
      />
      <RhfSelect
        label="生地品番"
        name="basis-fabricProductNo"
        menuItems={[
          { value: 'empty', label: '' },
          { value: 'AAAAA', label: 'AAAAA' },
          { value: 'BBBBB', label: 'BBBBB' },
          { value: 'CCCCC', label: 'CCCCC' },
          { value: 'DDDDD', label: 'DDDDD' },
          { value: 'EEEEE', label: 'EEEEE' },
          { value: 'FFFFF', label: 'FFFFF' },
          { value: 'GGGGG', label: 'GGGGG' },
        ]}
      />
      <RhfDatePicker label="入力日" name="basis-inputDate" required />
      <RhfDateTimePicker label="発注日時" name="basis-orderDateTime" required />
      <RhfDatePicker label="工場出荷日" name="basis-shipDate" required />
      <RhfTextField
        label="お客様名"
        name="basis-customerName"
        required
        message="お客様名を入力してください"
      />
      <RhfTextField
        label="要尺"
        name="basis-yield"
        required
        message="要尺を入力してください"
        type="number"
        defaultValue={0}
      />
      <RhfSelect
        label="混率生地①"
        name="basis-blendRateFabric1"
        menuItems={[
          { value: 'empty', label: '' },
          { value: 'W', label: 'W' },
          { value: 'ポリエステル', label: 'ポリエステル' },
          { value: 'コットン', label: 'コットン' },
          { value: 'シルク', label: 'シルク' },
          { value: 'リネン', label: 'リネン' },
          { value: 'ナイロン', label: 'ナイロン' },
          { value: 'ポリウレタン', label: 'ポリウレタン' },
          { value: 'レーヨン', label: 'レーヨン' },
          { value: 'モヘア', label: 'モヘア' },
          { value: 'ビスコース', label: 'ビスコース' },
        ]}
      />
      <RhfTextField
        label="混率①"
        name="basis-blendRate1"
        required
        message="混率①を入力してください"
        type="number"
        defaultValue={0}
      />
      <RhfSelect
        label="混率生地②"
        name="basis-blendRateFabric2"
        menuItems={[
          { value: 'empty', label: '' },
          { value: 'W', label: 'W' },
          { value: 'ポリエステル', label: 'ポリエステル' },
          { value: 'コットン', label: 'コットン' },
          { value: 'シルク', label: 'シルク' },
          { value: 'リネン', label: 'リネン' },
          { value: 'ナイロン', label: 'ナイロン' },
          { value: 'ポリウレタン', label: 'ポリウレタン' },
          { value: 'レーヨン', label: 'レーヨン' },
          { value: 'モヘア', label: 'モヘア' },
          { value: 'ビスコース', label: 'ビスコース' },
        ]}
      />
      <RhfTextField
        label="混率②"
        name="basis-blendRate2"
        required
        message="混率②を入力してください"
        type="number"
        defaultValue={0}
      />
    </>
  );
};
