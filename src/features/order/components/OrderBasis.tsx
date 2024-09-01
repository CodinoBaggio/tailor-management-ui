import React, { FC, useEffect, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import 'dayjs/locale/ja';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Toast } from 'primereact/toast';

import { RhfSelect } from '../../../components/ui/RhfSelect';
import { RhfTextField } from '../../../components/ui/RhfTextField';
import { GridContainer } from '../../../components/containers/GridContainer';
import orderApi from '../api/orderApi';
import { FabricProductNoSearchDialog } from './ui/FabricProductNoSearchDialog';
import { useToast } from '../../../hooks/useToast';

type Props = {
  methods: UseFormReturn<FieldValues, any, undefined>;
  readOnly: boolean;
};

const style = {
  boxMargin: 'mb-5',
  blockColor1: 'bg-green-100',
};

export const OrderBasis: FC<Props> = (props) => {
  const { methods, readOnly } = props;
  const [fabricProductNoSearchDialogOpen, setFabricProductNoSearchDialogOpen] = useState(false);
  const [productNos, setProductNos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast, showMessage } = useToast();

  useEffect(() => {
    const numberInputs = document.querySelectorAll('input[type=number]');
    numberInputs.forEach((input) => {
      input.addEventListener('wheel', (event) => event.preventDefault());
    });

    // コンポーネントのアンマウント時にイベントリスナーをクリーンアップ
    return () => {
      numberInputs.forEach((input) => {
        input.removeEventListener('wheel', (event) => event.preventDefault());
      });
    };
  }, []);

  const handleFabricProductNoSearchDialogOpen = () => {
    // 配列クリア
    setProductNos([]);

    const productName = methods.getValues('basis-productName');
    if (productName !== 'empty' && productName !== '') {
      setFabricProductNoSearchDialogOpen(true);
    } else {
      showMessage('品名を選択してください。', 'error');
    }
  };

  const handleFabricProductNoSearchSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const searchPattern = formJson.searchPattern;

    try {
      setLoading(true);

      const res: any = await orderApi.getFabricProductNos({
        productName: methods.getValues('basis-productName'),
        searchPattern: searchPattern,
      });
      if (res.status === 'success') {
        setProductNos(res.payload.items);
      } else {
        showMessage('エラー', 'error', res.message);
      }
    } catch (error: any) {
      showMessage('エラー', 'error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleListItemClick = (_: any, index: number) => {
    methods.setValue('basis-fabricProductNo', productNos[index]);
    setFabricProductNoSearchDialogOpen(false);
  };

  return (
    <>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor1}>
          <RhfSelect
            label="品名 *"
            name="basis-productName"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '2P', label: '2P：ジャケット+パンツ' },
              { value: 'JK', label: 'JK：ジャケット' },
              { value: 'PT', label: 'PT：パンツ' },
              { value: 'VT', label: 'VT：ベスト' },
              { value: 'SK', label: 'SK：スカート' },
              { value: '3P', label: '3P：ジャケット+パンツ+ベスト' },
              { value: '2PP', label: '2PP：ジャケット+パンツ+パンツ' },
              { value: '3PP', label: '3PP：ジャケット+パンツ+パンツ+ベスト' },
              { value: '2P(SK)', label: '2P(SK)：ジャケット+スカート' },
              {
                value: '2P(SK)＋SK',
                label: '2P(SK)＋SK：ジャケット+スカート+スカート',
              },
              { value: '3P(SK)', label: '3P(SK)：ジャケット+スカート+ベスト' },
              {
                value: '3P(SK)＋SK',
                label: '3P(SK)＋SK：ジャケット+スカート+スカート+ベスト',
              },
            ]}
            width={300}
            readOnly={readOnly}
          />
          {/* <RhfTextField
            label="生地メーカー"
            name="basis-fabricMaker"
            required
            message="生地メーカーを入力してください"
          /> */}
          <Box>
            <RhfTextField label="生地品番 *" name="basis-fabricProductNo" readOnly={readOnly} />
            <Button startIcon={<FactCheckIcon />} onClick={handleFabricProductNoSearchDialogOpen} disabled={readOnly}>
              生地品番選択
            </Button>
          </Box>
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
          {[
            <RhfTextField
              label="お客様名 *"
              name="basis-customerName"
              width={300}
              adornment="様"
              readOnly={readOnly}
            />,
            // <RhfTextField
            //   label="要尺"
            //   name="basis-yield"
            //   required
            //   validationMessage="要尺を入力してください"
            //   type="number"
            //   defaultValue={0}
            //   width={70}
            // />,
          ]}
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
            readOnly={readOnly}
          />
          <RhfTextField
            label="混率①"
            name="basis-blendRate1"
            type="number"
            defaultValue={0}
            width={70}
            readOnly={readOnly}
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
            readOnly={readOnly}
          />
          <RhfTextField
            label="混率②"
            name="basis-blendRate2"
            type="number"
            defaultValue={0}
            width={70}
            readOnly={readOnly}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
          <RhfTextField label="混率生地③" name="basis-blendRateFabric3" width={200} readOnly={readOnly} />
          <RhfTextField
            label="混率③"
            name="basis-blendRate3"
            type="number"
            defaultValue={0}
            width={70}
            readOnly={readOnly}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
          <RhfTextField label="混率生地④" name="basis-blendRateFabric4" width={200} readOnly={readOnly} />
          <RhfTextField
            label="混率④"
            name="basis-blendRate4"
            type="number"
            defaultValue={0}
            width={70}
            readOnly={readOnly}
          />
        </GridContainer>
      </Box>
      <Box>
        <RhfTextField label="備考" name="basis-remark" width="100%" multiline variant="outlined" readOnly={readOnly} />
      </Box>
      <FabricProductNoSearchDialog
        open={fabricProductNoSearchDialogOpen}
        setOpen={setFabricProductNoSearchDialogOpen}
        loading={loading}
        productNos={productNos}
        handleListItemClick={handleListItemClick}
        handleSubmit={handleFabricProductNoSearchSubmit}
      />
      <Toast ref={toast} position="center" />
    </>
  );
};
