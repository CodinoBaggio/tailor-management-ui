// import React from 'react';
import { Box } from '@mui/material';
import 'dayjs/locale/ja';

import { RhfSelect } from '../../../components/ui/RhfSelect';
import { RhfTextField } from '../../../components/ui/RhfTextField';
import { RhfDatePicker } from '../../../components/ui/RhfDatePicker';
import { RhfDateTimePicker } from '../../../components/ui/RhfDateTimePicker';
import { GridContainer } from './ui/GridContainer';

const style = {
  boxMargin: 'mb-5',
  blockColor1: 'bg-green-100',
};

export const OrderBasis = () => {
  return (
    <>
      <Box className={style.boxMargin}>
        <GridContainer>
          <RhfDatePicker label="入力日" name="basis-inputDate" required />
          <RhfDateTimePicker
            label="発注日時"
            name="basis-orderDateTime"
            required
          />
          <RhfDatePicker label="工場出荷日" name="basis-shipDate" required />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor1}>
          <RhfSelect
            label="品名"
            name="basis-productName"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'S', label: 'S：？？' },
              { value: '2P', label: '2P：ジャケット+パンツ' },
              { value: 'JK', label: 'JK：ジャケット' },
              { value: 'PT', label: 'PT：パンツ' },
              { value: 'VT', label: 'VT：ベスト' },
              { value: '3P', label: '3P：ジャケット+パンツ+ベスト' },
              { value: '2PP', label: '2PP：ジャケット+パンツ+パンツ' },
              { value: '3PP', label: '3PP：ジャケット+パンツ+パンツ+ベスト' },
            ]}
            width={300}
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
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
          <RhfTextField
            label="お客様名"
            name="basis-customerName"
            required
            message="お客様名を入力してください"
            width={300}
          />
          <RhfTextField
            label="要尺"
            name="basis-yield"
            required
            message="要尺を入力してください"
            type="number"
            defaultValue={0}
            width={70}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
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
            width={70}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
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
            width={70}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
          <RhfTextField
            label="混率生地③"
            name="basis-blendRateFabric3"
            required
            message="混率生地③を入力してください"
            width={200}
          />
          <RhfTextField
            label="混率③"
            name="basis-blendRate3"
            required
            message="混率③を入力してください"
            type="number"
            defaultValue={0}
            width={70}
          />
        </GridContainer>
      </Box>
      <Box>
        <GridContainer>
          <RhfTextField
            label="混率生地④"
            name="basis-blendRateFabric4"
            required
            message="混率生地④を入力してください"
            width={200}
          />
          <RhfTextField
            label="混率④"
            name="basis-blendRate4"
            required
            message="混率④を入力してください"
            type="number"
            defaultValue={0}
            width={70}
          />
        </GridContainer>
      </Box>
    </>
  );
};
