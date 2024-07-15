import React, { FC, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import FactCheckIcon from '@mui/icons-material/FactCheck';

import { RhfSelect } from '../../../components/ui/RhfSelect';
import { RhfTextField } from '../../../components/ui/RhfTextField';
import { useSelectPattern } from '../hooks/useSelectPattern';
import { GridContainer } from '../../../components/containers/GridContainer';
import orderApi from '../api/orderApi';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { LiningSearchDialog } from './ui/LiningSearchDialog';
import { Toast } from 'primereact/toast';
import { useToast } from '../../../hooks/useToast';

const style = {
  boxMargin: 'mb-5',
  blockColor1: 'bg-green-100',
  blockColor2: 'bg-red-100',
  blockColor3: 'bg-blue-100',
  blockColor4: 'bg-pink-100',
};

type Props = {
  methods: UseFormReturn<FieldValues, any, undefined>;
  readOnly: boolean;
};

export const OrderJaket: FC<Props> = (props) => {
  const { methods, readOnly } = props;
  const [liningSearchDialogOpen, setLiningSearchDialogOpen] = useState(false);
  const [linings, setLinings] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    selectPattern1Items,
    selectPattern2Items,
    selectPattern3Items,
    handleSelectPattern1Change,
    handleSelectPattern2Change,
  } = useSelectPattern('jaket', 'TR1');
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

  const handleLiningSearchDialogOpen = () => {
    // 配列クリア
    setLinings([]);

    const productName = methods.getValues('basis-productName');
    const fabricProductNo = methods.getValues('basis-fabricProductNo');
    if (productName === 'empty' || productName === '') {
      showMessage('エラー', 'warn', '品名を選択してください。');
      return;
    }
    if (fabricProductNo === 'empty' || fabricProductNo === '') {
      showMessage('エラー', 'warn', '生地品番を選択してください。');
      return;
    }
    
    setLiningSearchDialogOpen(true);
  };

  const handleListItemClick = (_: any, index: number) => {
    methods.setValue('jaket-lining', linings[index]);
    setLiningSearchDialogOpen(false);
  };

  const handleLiningSearchSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const searchPattern = formJson.searchPattern;

    try {
      setLoading(true);

      const res: any = await orderApi.getLinings({
        fabricProductNo: methods.getValues('basis-fabricProductNo'),
        searchPattern: searchPattern,
      });
      if (res.status === 'success') {
        setLinings(res.payload.liningProductNo);
      } else {
        showMessage('エラー', 'error', res.message);
      }
    } catch (error: any) {
      showMessage('エラー', 'error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor1}>
          <RhfSelect
            label="セレクトパターン1 *"
            name="jaket-selectPattern1"
            menuItems={[
              // { value: 'empty', label: '' },
              ...selectPattern1Items,
            ]}
            onChange={handleSelectPattern1Change}
            disabled={true}
          />
          <RhfSelect
            label="セレクトパターン2 *"
            name="jaket-selectPattern2"
            menuItems={[{ value: 'empty', label: '' }, ...selectPattern2Items]}
            onChange={handleSelectPattern2Change}
            readOnly={readOnly}
          />
          <RhfSelect
            label="セレクトパターン3 *"
            name="jaket-selectPattern3"
            menuItems={[{ value: 'empty', label: '' }, ...selectPattern3Items]}
            readOnly={readOnly}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor2}>
          <RhfTextField label="総丈" name="jaket-totalLength" type="number" defaultValue={0} readOnly={readOnly} />
          <RhfTextField label="上着丈 *" name="jaket-jaketLength" type="number" defaultValue={0} readOnly={readOnly} />
          <RhfTextField label="肩幅 *" name="jaket-shoulderWidth" type="number" defaultValue={0} readOnly={readOnly} />
          <RhfTextField
            label="袖丈左 *"
            name="jaket-sleeveLengthLeft"
            type="number"
            defaultValue={0}
            readOnly={readOnly}
          />
          <RhfTextField
            label="袖丈右 *"
            name="jaket-sleeveLengthRight"
            type="number"
            defaultValue={0}
            readOnly={readOnly}
          />
          <RhfTextField label="バスト実寸" name="jaket-bust" type="number" defaultValue={0} readOnly={readOnly} />
          <RhfTextField label="中胴実寸" name="jaket-waist" type="number" defaultValue={0} readOnly={readOnly} />
          <RhfTextField label="バスト上り *" name="jaket-bustTop" type="number" defaultValue={0} readOnly={readOnly} />
          <RhfTextField label="中胴上り *" name="jaket-waistTop" type="number" defaultValue={0} readOnly={readOnly} />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor3}>
          <RhfSelect
            label="毛芯 *"
            name="jaket-canvas"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '薄毛芯', label: '薄毛芯' },
              { value: '毛芯無し', label: '毛芯無し' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="肩型 *"
            name="jaket-shoulderType"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '正常肩', label: '正常肩' },
              { value: '袖高', label: '袖高' },
              { value: 'マニカカミーチャ', label: 'マニカカミーチャ' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="襟型 *"
            name="jaket-collarType"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'ノッチ', label: 'ノッチ' },
              { value: 'ピーク', label: 'ピーク' },
              { value: 'セミノッチ', label: 'セミノッチ' },
              { value: 'セミピーク', label: 'セミピーク' },
              { value: 'ショ-ル--1', label: 'ショ-ル--1' },
              { value: 'ショ-ル--2', label: 'ショ-ル--2' },
              { value: 'ショ-ル--3', label: 'ショ-ル--3' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="前ボタン *"
            name="jaket-frontButton"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '1×1', label: '1×1' },
              { value: '2×1', label: '2×1' },
              { value: '3×1（段返り）', label: '3×1（段返り）' },
              { value: '3×2', label: '3×2' },
              { value: '1×1（拝み釦）', label: '1×1（拝み釦）' },
              { value: 'W2×1', label: 'W2×1' },
              { value: 'W4×1', label: 'W4×1' },
              { value: 'W4×2', label: 'W4×2' },
              { value: 'W6×1', label: 'W6×1' },
              { value: 'W6×2', label: 'W6×2' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="襟幅 *"
            name="jaket-collarWidth"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '6', label: '6' },
              { value: '7', label: '7' },
              { value: '8', label: '8' },
              { value: '9', label: '9' },
              { value: '10', label: '10' },
              { value: '11', label: '11' },
              { value: '12', label: '12' },
              { value: 'D6', label: 'D6' },
              { value: 'D7', label: 'D7' },
              { value: 'D8', label: 'D8' },
              { value: 'D9', label: 'D9' },
              { value: 'D10', label: 'D10' },
              { value: 'D11', label: 'D11' },
              { value: 'D12', label: 'D12' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="袖ボタン *"
            name="jaket-sleeveButton"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '袖1釦', label: '袖1釦' },
              { value: '袖2釦キッシング', label: '袖2釦キッシング' },
              { value: '袖3釦キッシング', label: '袖3釦キッシング' },
              { value: '袖4釦キッシング', label: '袖4釦キッシング' },
              { value: '袖5釦キッシング', label: '袖5釦キッシング' },
              { value: '袖2釦重ね', label: '袖2釦重ね' },
              { value: '袖3釦重ね', label: '袖3釦重ね' },
              { value: '袖4釦重ね', label: '袖4釦重ね' },
              { value: '袖5釦重ね', label: '袖5釦重ね' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="袖口 *"
            name="jaket-sleeveOpening"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '開き見せ', label: '開き見せ' },
              { value: '本開き', label: '本開き' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="胸P *"
            name="jaket-chestPocket"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'フネ', label: 'フネ' },
              { value: 'ハコポケット', label: 'ハコポケット' },
              { value: 'バルカ', label: 'バルカ' },
              { value: 'アゥト', label: 'アゥト' },
              { value: 'ハコPK（サテン地）', label: 'ハコPK（サテン地）' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="縫製方式 *"
            name="jaket-sewingMethod"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'ラベル毛芯', label: 'ラベル毛芯' },
              { value: 'フル毛芯', label: 'フル毛芯' },
              // { value: '接着', label: '接着' },
              { value: '清涼毛芯無し', label: '清涼毛芯無し' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="フロントカット *"
            name="jaket-frontCut"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'スクエア', label: 'スクエア' },
              { value: 'ユニバーサル', label: 'ユニバーサル' },
              // { value: 'トラディショナル', label: 'トラディショナル' },
              { value: 'カッタウェイ', label: 'カッタウェイ' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="ラベルサテン地 *"
            name="jaket-labelSatinFabric"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '生地', label: '生地' },
              // { value: 'TX01', label: 'TX01' },
              // { value: 'TX02', label: 'TX01' },
              // { value: 'TX03', label: 'TX01' },
              // { value: 'TX04', label: 'TX04' },
              // { value: 'TX05', label: 'TX05' },
              // { value: 'TX06', label: 'TX06' },
              // { value: 'TX07', label: 'TX07' },
              // { value: 'TX08', label: 'TX08' },
              // { value: 'TX09', label: 'TX09' },
              // { value: 'TX10', label: 'TX10' },
              // { value: 'TX11', label: 'TX11' },
              // { value: 'TX12', label: 'TX12' },
              // { value: 'TX13', label: 'TX13' },
              // { value: 'TX14', label: 'TX14' },
              // { value: 'TX15', label: 'TX15' },
              // { value: 'TX16', label: 'TX16' },
              // { value: 'TX17', label: 'TX17' },
              { value: 'TX18', label: 'TX18' },
              // { value: 'TX19', label: 'TX19' },
              // { value: 'TX20', label: 'TX20' },
              // { value: 'TX21', label: 'TX21' },
              // { value: 'TX22', label: 'TX22' },
              // { value: 'TX23', label: 'TX23' },
              // { value: 'TX24', label: 'TX24' },
              // { value: 'TX25', label: 'TX25' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="ステッチ *"
            name="jaket-stitch"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'ＡＭＦ0.2', label: 'ＡＭＦ0.2' },
              { value: 'ＡＭＦ0.6', label: 'ＡＭＦ0.6' },
              { value: 'ミシン0.2', label: 'ミシン0.2' },
              { value: 'ミシン0.6', label: 'ミシン0.6' },
              { value: '無', label: '無' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="ステッチ箇所 *"
            name="jaket-stitchLocation"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'フロント', label: 'フロント' },
              { value: 'フルステッチ', label: 'フルステッチ' },
            ]}
            readOnly={readOnly}
          />
          {/* <RhfSelect
            label="ピンポイントステッチ"
            name="jaket-pinpointStitch"
            disabled={true}
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
          />
          <RhfSelect
            label="ピンポイントST糸色"
            name="jaket-pinpointStitchThreadColor"
            disabled={true}
            menuItems={[
              { value: 'empty', label: '' },
              { value: '無', label: '無' },
              { value: '生地色', label: '生地色' },
              { value: 'C1', label: 'C1' },
              { value: 'C2', label: 'C2' },
              { value: 'C3', label: 'C3' },
              { value: 'C4', label: 'C4' },
              { value: 'C5', label: 'C5' },
              { value: 'C6', label: 'C6' },
              { value: 'C7', label: 'C7' },
              { value: 'C8', label: 'C8' },
              { value: 'C9', label: 'C9' },
              { value: 'C10', label: 'C10' },
              { value: 'C11', label: 'C11' },
              { value: 'C12', label: 'C12' },
              { value: 'C13', label: 'C13' },
              { value: 'C14', label: 'C14' },
              { value: 'C15', label: 'C15' },
              { value: 'C16', label: 'C16' },
              { value: 'C17', label: 'C17' },
              { value: 'C18', label: 'C18' },
              { value: 'C19', label: 'C19' },
              { value: 'C20', label: 'C20' },
              { value: 'C21', label: 'C21' },
              { value: 'C22', label: 'C22' },
              { value: 'C23', label: 'C23' },
              { value: 'C24', label: 'C24' },
              { value: 'C25', label: 'C25' },
              { value: 'C26', label: 'C26' },
              { value: 'C27', label: 'C27' },
              { value: 'C28', label: 'C28' },
              { value: 'C29', label: 'C29' },
              { value: 'C30', label: 'C30' },
              { value: 'C31', label: 'C31' },
              { value: 'C32', label: 'C32' },
            ]}
          /> */}
          <RhfSelect
            label="胸箱サテン地 *"
            name="jaket-chestBoxSatinFabric"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '生地', label: '生地' },
              { value: 'TX01', label: 'TX01' },
              { value: 'TX02', label: 'TX02' },
              { value: 'TX03', label: 'TX03' },
              { value: 'TX04', label: 'TX04' },
              { value: 'TX05', label: 'TX05' },
              { value: 'TX06', label: 'TX06' },
              { value: 'TX07', label: 'TX07' },
              { value: 'TX08', label: 'TX08' },
              { value: 'TX09', label: 'TX09' },
              { value: 'TX10', label: 'TX10' },
              { value: 'TX11', label: 'TX11' },
              { value: 'TX12', label: 'TX12' },
              { value: 'TX13', label: 'TX13' },
              { value: 'TX14', label: 'TX14' },
              { value: 'TX15', label: 'TX15' },
              { value: 'TX16', label: 'TX16' },
              { value: 'TX17', label: 'TX17' },
              { value: 'TX18', label: 'TX18' },
              { value: 'TX19', label: 'TX19' },
              { value: 'TX20', label: 'TX20' },
              { value: 'TX21', label: 'TX21' },
              { value: 'TX22', label: 'TX22' },
              { value: 'TX23', label: 'TX23' },
            ]}
            readOnly={readOnly}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor4}>
          <RhfSelect
            label="打ち合い"
            name="jaket-uchiai"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '4', label: '4' },
              { value: '3', label: '3' },
              { value: '2', label: '2' },
              { value: '1', label: '1' },
              { value: '-1', label: '-1' },
              { value: '-2', label: '-2' },
              { value: '-3', label: '-3' },
              { value: '-4', label: '-4' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="反身"
            name="jaket-hanmi"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '-0.5', label: '-0.5' },
              { value: '-1', label: '-1' },
              { value: '-1.5', label: '-1.5' },
              { value: '-2', label: '-2' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="屈身"
            name="jaket-kutsumi"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '0.5', label: '0.5' },
              { value: '1', label: '1' },
              { value: '1.5', label: '1.5' },
              { value: '2', label: '2' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="怒肩左"
            name="jaket-squareShoulderLeft"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '0.5', label: '0.5' },
              { value: '1', label: '1' },
              { value: '1.5', label: '1.5' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="怒肩右"
            name="jaket-squareShoulderRight"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '0.5', label: '0.5' },
              { value: '1', label: '1' },
              { value: '1.5', label: '1.5' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="撫肩左"
            name="jaket-slopingShoulderLeft"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '-0.5', label: '-0.5' },
              { value: '-1', label: '-1' },
              { value: '-1.5', label: '-1.5' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="撫肩右"
            name="jaket-slopingShoulderRight"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '-0.5', label: '-0.5' },
              { value: '-1', label: '-1' },
              { value: '-1.5', label: '-1.5' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="突量"
            name="jaket-totsuRyo"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '0.8', label: '0.8' },
              { value: '0.4', label: '0.4' },
              { value: '-0.4', label: '-0.4' },
              { value: '-0.8', label: '-0.8' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="尻廻"
            name="jaket-hip"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '4', label: '4' },
              { value: '3', label: '3' },
              { value: '2', label: '2' },
              { value: '1', label: '1' },
              { value: '-1', label: '-1' },
              { value: '-2', label: '-2' },
              { value: '-3', label: '-3' },
              { value: '-4', label: '-4' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="前丈"
            name="jaket-frontLength"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '2', label: '2' },
              { value: '1.5', label: '1.5' },
              { value: '1.5', label: '1.5' },
              { value: '1', label: '1' },
              { value: '0.5', label: '0.5' },
              { value: '-0.5', label: '-0.5' },
              { value: '-1', label: '-1' },
              { value: '-1.5', label: '-1.5' },
              { value: '-2', label: '-2' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="前裾ヘム"
            name="jaket-frontSleeveHem"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '-1', label: '-1' },
              { value: '-2', label: '-2' },
              { value: '-3', label: '-3' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="AH前ぐり"
            name="jaket-ahFrontOpening"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '2', label: '2' },
              { value: '1', label: '1' },
              { value: '-1', label: '-1' },
              { value: '-2', label: '-2' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="袖口幅"
            name="jaket-sleeveOpeningWidth"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '2.1', label: '2.1' },
              { value: '1.8', label: '1.8' },
              { value: '1.5', label: '1.5' },
              { value: '1.2', label: '1.2' },
              { value: '0.9', label: '0.9' },
              { value: '0.6', label: '0.6' },
              { value: '0.3', label: '0.3' },
              { value: '-0.3', label: '-0.3' },
              { value: '-0.6', label: '-0.6' },
              { value: '-0.9', label: '-0.9' },
              { value: '-1.2', label: '-1.2' },
              { value: '-1.5', label: '-1.5' },
              { value: '-1.8', label: '-1.8' },
              { value: '-2.1', label: '-2.1' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="襟みつ"
            name="jaket-collarMitsu"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '1', label: '1' },
              { value: '0.7', label: '0.7' },
              { value: '-0.7', label: '-0.7' },
              { value: '-1', label: '-1' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="袖後にずらす"
            name="jaket-collarShift"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '-1', label: '-1' },
              { value: '-2', label: '-2' },
              { value: '-3', label: '-3' },
              { value: '-4', label: '-4' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="ボタン位置"
            name="jaket-buttonPosition"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '2', label: '2' },
              { value: '1.5', label: '1.5' },
              { value: '1', label: '1' },
              { value: '0.5', label: '0.5' },
              { value: '-0.5', label: '-0.5' },
              { value: '-1', label: '-1' },
              { value: '-1.5', label: '-1.5' },
              { value: '-2', label: '-2' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="背中カーブ"
            name="jaket-backCurve"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '-0.6', label: '-0.6' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="鎌上げ"
            name="jaket-sickleRaising"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '1', label: '1' },
              { value: '0.5', label: '0.5' },
              { value: '-0.5', label: '-0.5' },
              { value: '-1', label: '-1' },
              { value: '-1.5', label: '-1.5' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="袖幅"
            name="jaket-sleeveWidth"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '2', label: '2' },
              { value: '1.5', label: '1.5' },
              { value: '1', label: '1' },
              { value: '0.5', label: '0.5' },
              { value: '-0.5', label: '-0.5' },
              { value: '-1', label: '-1' },
              { value: '-1.5', label: '-1.5' },
              { value: '-2', label: '-2' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="背幅"
            name="jaket-backWidth"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '2', label: '2' },
              { value: '1', label: '1' },
              { value: '-1', label: '-1' },
              { value: '-2', label: '-2' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="袖裏"
            name="jaket-sleeveBack"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '胴裏共地', label: '胴裏共地' },
              { value: 'ENKCLL0027', label: 'ENKCLL0027' },
              { value: 'ENKCLL0023', label: 'ENKCLL0023' },
              { value: 'ATF8400-1#', label: 'ATF8400-1#' },
              { value: '901001', label: '901001' },
              { value: '901002', label: '901002' },
              { value: '901003', label: '901003' },
              { value: 'SD1000', label: 'SD1000' },
              { value: 'SD3000', label: 'SD3000' },
              { value: 'SD3001', label: 'SD3001' },
              { value: 'SD3002', label: 'SD3002' },
              { value: 'SD3003', label: 'SD3003' },
              { value: 'SD3004', label: 'SD3004' },
              { value: 'SD3005', label: 'SD3005' },
              { value: 'SD3006', label: 'SD3006' },
              { value: 'SD3007', label: 'SD3007' },
              { value: 'SD3008', label: 'SD3008' },
              { value: 'SD4000', label: 'SD4000' },
              { value: 'SD4001', label: 'SD4001' },
              { value: 'SD4002', label: 'SD4002' },
              { value: 'SD4003', label: 'SD4003' },
              { value: 'SD4004', label: 'SD4004' },
              { value: 'SD4005', label: 'SD4005' },
              { value: 'AK8800-306', label: 'AK8800-306' },
              { value: 'AK893-20', label: 'AK893-20' },
              { value: 'AK893-121', label: 'AK893-121' },
              { value: 'AK893-131', label: 'AK893-131' },
              { value: 'AK893-231', label: 'AK893-231' },
              { value: 'AK893-251', label: 'AK893-251' },
              { value: 'AK893-BKS', label: 'AK893-BKS' },
              { value: 'SD4006', label: 'SD4006' },
              { value: 'SD4007', label: 'SD4007' },
              { value: 'SD4008', label: 'SD4008' },
              { value: 'ST1203-8F', label: 'ST1203-8F' },
              { value: 'ST1203-9F', label: 'ST1203-9F' },
              { value: 'ST1203-10F', label: 'ST1203-10F' },
              { value: 'ST1203-13F', label: 'ST1203-13F' },
            ]}
            readOnly={readOnly}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
          <RhfSelect
            label="腰P *"
            name="jaket-waistPocket"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'アゥト', label: 'アゥト' },
              { value: '箱ポケット', label: '箱ポケット' },
              { value: 'フラップ付き両玉', label: 'フラップ付き両玉' },
              { value: '斜フラップ付き両玉', label: '斜フラップ付き両玉' },
              { value: 'フラップ無両玉', label: 'フラップ無両玉' },
              { value: '斜フラップ無両玉', label: '斜フラップ無両玉' },
              { value: 'フラップ付き片玉', label: 'フラップ付き片玉' },
              { value: '斜フラップ付き片玉', label: '斜フラップ付き片玉' },
              { value: 'フラップ無片玉', label: 'フラップ無片玉' },
              { value: '斜フラップ無片玉', label: '斜フラップ無片玉' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="フラップ幅"
            name="jaket-flapWidth"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '3.5', label: '3.5' },
              { value: '4', label: '4.0' },
              { value: '4.5', label: '4.5' },
              { value: '5', label: '5.0' },
              { value: '5.5', label: '5.5' },
              { value: '6', label: '6.0' },
              { value: '6.5', label: '6.5' },
              { value: '7', label: '7.0' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="チェンジP *"
            name="jaket-changePocket"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
            readOnly={readOnly}
          />
          {/* <RhfSelect
            label="忍びP"
            name="jaket-secretPocket"
            disabled={true}
            menuItems={[
              { value: 'empty', label: '' },
              { value: '右のみ', label: '右のみ' },
            ]}
          /> */}
          <RhfSelect
            label="裏仕様 *"
            name="jaket-backSpec"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '総裏', label: '総裏' },
              { value: '観音', label: '観音' },
              {
                value: '観音(台場:半裏・大見返し）',
                label: '観音(台場:半裏・大見返し）',
              },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="台場 *"
            name="jaket-daiba"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '台場無し', label: '台場無し' },
              { value: '本台場', label: '本台場' },
              { value: '角台場', label: '角台場' },
              { value: '半裏', label: '半裏' },
              { value: '大見返し', label: '大見返し' },
              { value: '切り台場', label: '切り台場' },
            ]}
            readOnly={readOnly}
          />
          {/* <RhfSelect
            label="内P"
            name="jaket-insidePocket"
            disabled={true}
            menuItems={[
              { value: 'empty', label: '' },
              { value: '右三角フタ', label: '右三角フタ' },
            ]}
          /> */}
          <RhfSelect
            label="ペンPK *"
            name="jaket-penPocket"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '特殊ペンPK', label: '特殊ペンPK' },
            ]}
            readOnly={readOnly}
          />
          {/* <RhfSelect
            label="チケットPK"
            name="jaket-ticketPocket"
            disabled={true}
            menuItems={[
              { value: 'empty', label: '' },
              { value: '無', label: '無' },
            ]}
          /> */}
          <RhfSelect
            label="パット *"
            name="jaket-pat"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '無', label: '無' },
              { value: '0.5', label: '0.5' },
              { value: '1', label: '1.0' },
            ]}
            readOnly={readOnly}
          />
          <RhfTextField label="裏地 *" name="jaket-lining" disabled={true} />
          <Button startIcon={<FactCheckIcon />} onClick={handleLiningSearchDialogOpen} disabled={readOnly}>
            裏地選択
          </Button>
          {/* <RhfSelect
            label="襟裏"
            name="jaket-collarBack"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '生地色', label: '生地色' },
              { value: '生地', label: '生地' },
              { value: 'T01', label: 'T01' },
              { value: 'T02', label: 'T02' },
              { value: 'T03', label: 'T03' },
              { value: 'T04', label: 'T04' },
              { value: 'T05', label: 'T05' },
              { value: 'T06', label: 'T06' },
              { value: 'T07', label: 'T07' },
              { value: 'T08', label: 'T08' },
              { value: 'T09', label: 'T09' },
              { value: 'T10', label: 'T10' },
              { value: 'T11', label: 'T11' },
              { value: 'T12', label: 'T12' },
              { value: 'T13', label: 'T13' },
              { value: 'T14', label: 'T14' },
              { value: 'T15', label: 'T15' },
              { value: 'T16', label: 'T16' },
              { value: 'T17', label: 'T17' },
              { value: 'T18', label: 'T18' },
              { value: 'T19', label: 'T19' },
              { value: 'T20', label: 'T20' },
              { value: 'T21', label: 'T21' },
              { value: 'T22', label: 'T22' },
              { value: 'T23', label: 'T23' },
            ]}
          /> */}
          <RhfSelect
            label="ベンツ *"
            name="jaket-vents"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'ノーベント', label: 'ノーベント' },
              { value: 'センターベンツ', label: 'センターベンツ' },
              { value: 'サイドベンツ', label: 'サイドベンツ' },
              { value: 'フックベント', label: 'フックベント' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="ネーム入れ *"
            name="jaket-inName"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="ネーム字体"
            name="jaket-nameFont"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '漢字', label: '漢字' },
              { value: 'ローマ字（筆）', label: 'ローマ字（筆）' },
              { value: 'ローマ字（活字）', label: 'ローマ字（活字）' },
              { value: '花文字', label: '花文字' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="ネーム位置"
            name="jaket-namePosition"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '見返し', label: '見返し' },
              { value: 'カラークロス', label: 'カラークロス' },
              { value: 'タバコポケット上', label: 'タバコポケット上' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="ネーム系色"
            name="jaket-nameColor"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'M1', label: 'M1' },
              { value: 'M2', label: 'M2' },
              { value: 'M3', label: 'M3' },
              { value: 'M4', label: 'M4' },
              { value: 'M5', label: 'M5' },
              { value: 'M6', label: 'M6' },
              { value: 'M7', label: 'M7' },
              { value: 'M8', label: 'M8' },
              { value: 'M9', label: 'M9' },
              { value: 'M10', label: 'M10' },
              { value: 'M11', label: 'M11' },
              { value: 'M12', label: 'M12' },
              { value: 'M13', label: 'M13' },
              { value: 'M14', label: 'M14' },
              { value: 'M15', label: 'M15' },
              { value: 'M16', label: 'M16' },
              { value: 'M17', label: 'M17' },
              { value: 'M18', label: 'M18' },
              { value: 'M19', label: 'M19' },
              { value: 'M20', label: 'M20' },
            ]}
            readOnly={readOnly}
          />
          <RhfTextField label="ネーム内容" name="jaket-name" readOnly={readOnly} />
          <RhfSelect
            label="ラベル穴 *"
            name="jaket-labelHole"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '無', label: '無' },
              { value: '左側', label: '左側' },
              { value: '左右', label: '左右' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="ステッチ糸色"
            name="jaket-stitchThreadColor"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '無', label: '無' },
              { value: '生地色', label: '生地色' },
              { value: 'C1', label: 'C1' },
              { value: 'C2', label: 'C2' },
              { value: 'C3', label: 'C3' },
              { value: 'C4', label: 'C4' },
              { value: 'C5', label: 'C5' },
              { value: 'C6', label: 'C6' },
              { value: 'C7', label: 'C7' },
              { value: 'C8', label: 'C8' },
              { value: 'C9', label: 'C9' },
              { value: 'C10', label: 'C10' },
              { value: 'C11', label: 'C11' },
              { value: 'C12', label: 'C12' },
              { value: 'C13', label: 'C13' },
              { value: 'C14', label: 'C14' },
              { value: 'C15', label: 'C15' },
              { value: 'C16', label: 'C16' },
              { value: 'C17', label: 'C17' },
              { value: 'C18', label: 'C18' },
              { value: 'C19', label: 'C19' },
              { value: 'C20', label: 'C20' },
              { value: 'C21', label: 'C21' },
              { value: 'C22', label: 'C22' },
              { value: 'C23', label: 'C23' },
              { value: 'C24', label: 'C24' },
              { value: 'C25', label: 'C25' },
              { value: 'C26', label: 'C26' },
              { value: 'C27', label: 'C27' },
              { value: 'C28', label: 'C28' },
              { value: 'C29', label: 'C29' },
              { value: 'C30', label: 'C30' },
              { value: 'C31', label: 'C31' },
              { value: 'C32', label: 'C32' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="ラベル穴糸色"
            name="jaket-labelThreadColor"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '無', label: '無' },
              { value: '生地色', label: '生地色' },
              { value: 'C1', label: 'C1' },
              { value: 'C2', label: 'C2' },
              { value: 'C3', label: 'C3' },
              { value: 'C4', label: 'C4' },
              { value: 'C5', label: 'C5' },
              { value: 'C6', label: 'C6' },
              { value: 'C7', label: 'C7' },
              { value: 'C8', label: 'C8' },
              { value: 'C9', label: 'C9' },
              { value: 'C10', label: 'C10' },
              { value: 'C11', label: 'C11' },
              { value: 'C12', label: 'C12' },
              { value: 'C13', label: 'C13' },
              { value: 'C14', label: 'C14' },
              { value: 'C15', label: 'C15' },
              { value: 'C16', label: 'C16' },
              { value: 'C17', label: 'C17' },
              { value: 'C18', label: 'C18' },
              { value: 'C19', label: 'C19' },
              { value: 'C20', label: 'C20' },
              { value: 'C21', label: 'C21' },
              { value: 'C22', label: 'C22' },
              { value: 'C23', label: 'C23' },
              { value: 'C24', label: 'C24' },
              { value: 'C25', label: 'C25' },
              { value: 'C26', label: 'C26' },
              { value: 'C27', label: 'C27' },
              { value: 'C28', label: 'C28' },
              { value: 'C29', label: 'C29' },
              { value: 'C30', label: 'C30' },
              { value: 'C31', label: 'C31' },
              { value: 'C32', label: 'C32' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="前ボタン穴糸色"
            name="jaket-frontButtonThreadColor"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '無', label: '無' },
              { value: '生地色', label: '生地色' },
              { value: 'C1', label: 'C1' },
              { value: 'C2', label: 'C2' },
              { value: 'C3', label: 'C3' },
              { value: 'C4', label: 'C4' },
              { value: 'C5', label: 'C5' },
              { value: 'C6', label: 'C6' },
              { value: 'C7', label: 'C7' },
              { value: 'C8', label: 'C8' },
              { value: 'C9', label: 'C9' },
              { value: 'C10', label: 'C10' },
              { value: 'C11', label: 'C11' },
              { value: 'C12', label: 'C12' },
              { value: 'C13', label: 'C13' },
              { value: 'C14', label: 'C14' },
              { value: 'C15', label: 'C15' },
              { value: 'C16', label: 'C16' },
              { value: 'C17', label: 'C17' },
              { value: 'C18', label: 'C18' },
              { value: 'C19', label: 'C19' },
              { value: 'C20', label: 'C20' },
              { value: 'C21', label: 'C21' },
              { value: 'C22', label: 'C22' },
              { value: 'C23', label: 'C23' },
              { value: 'C24', label: 'C24' },
              { value: 'C25', label: 'C25' },
              { value: 'C26', label: 'C26' },
              { value: 'C27', label: 'C27' },
              { value: 'C28', label: 'C28' },
              { value: 'C29', label: 'C29' },
              { value: 'C30', label: 'C30' },
              { value: 'C31', label: 'C31' },
              { value: 'C32', label: 'C32' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="袖ボタン穴糸色"
            name="jaket-sleeveButtonThreadColor"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '無', label: '無' },
              { value: '生地色', label: '生地色' },
              { value: 'C1', label: 'C1' },
              { value: 'C2', label: 'C2' },
              { value: 'C3', label: 'C3' },
              { value: 'C4', label: 'C4' },
              { value: 'C5', label: 'C5' },
              { value: 'C6', label: 'C6' },
              { value: 'C7', label: 'C7' },
              { value: 'C8', label: 'C8' },
              { value: 'C9', label: 'C9' },
              { value: 'C10', label: 'C10' },
              { value: 'C11', label: 'C11' },
              { value: 'C12', label: 'C12' },
              { value: 'C13', label: 'C13' },
              { value: 'C14', label: 'C14' },
              { value: 'C15', label: 'C15' },
              { value: 'C16', label: 'C16' },
              { value: 'C17', label: 'C17' },
              { value: 'C18', label: 'C18' },
              { value: 'C19', label: 'C19' },
              { value: 'C20', label: 'C20' },
              { value: 'C21', label: 'C21' },
              { value: 'C22', label: 'C22' },
              { value: 'C23', label: 'C23' },
              { value: 'C24', label: 'C24' },
              { value: 'C25', label: 'C25' },
              { value: 'C26', label: 'C26' },
              { value: 'C27', label: 'C27' },
              { value: 'C28', label: 'C28' },
              { value: 'C29', label: 'C29' },
              { value: 'C30', label: 'C30' },
              { value: 'C31', label: 'C31' },
              { value: 'C32', label: 'C32' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="ブランドネーム *"
            name="jaket-brandName"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="生地マーク *"
            name="jaket-fabricMark"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="ボタン品番 *"
            name="jaket-buttonProductNo"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'EZ10-B', label: 'EZ10-B' },
              { value: 'EZ10-Y83', label: 'EZ10-Y83' },
              { value: 'EZ10-Y89', label: 'EZ10-Y89' },
              { value: 'EZ10-Y2', label: 'EZ10-Y2' },
              { value: 'EZ10-Y1', label: 'EZ10-Y1' },
              { value: 'EZ20-1', label: 'EZ20-1' },
              { value: 'EZ20-3', label: 'EZ20-3' },
              { value: 'EZ20-4', label: 'EZ20-4' },
              { value: 'EZ20-5', label: 'EZ20-5' },
              { value: 'EZ30', label: 'EZ30' },
              { value: 'EZ60-C', label: 'EZ60-C' },
              { value: 'EZ60-B', label: 'EZ60-B' },
              { value: 'EZ60-T', label: 'EZ60-T' },
              { value: 'EZ150-6B', label: 'EZ150-6B' },
              { value: 'EZ150-8', label: 'EZ150-8' },
              { value: 'X-05', label: 'X-05' },
              { value: 'X-08', label: 'X-08' },
              { value: 'X-09', label: 'X-09' },
              { value: 'X-41', label: 'X-41' },
              { value: 'X-42', label: 'X-42' },
              { value: 'X-47', label: 'X-47' },
              { value: 'X-49', label: 'X-49' },
              { value: 'X-59', label: 'X-59' },
              { value: 'TXB01', label: 'TXB01' },
              { value: 'TXB02', label: 'TXB02' },
              { value: 'TXB03', label: 'TXB03' },
              { value: 'TXB04', label: 'TXB04' },
              { value: 'TXB05', label: 'TXB05' },
              { value: 'TXB06', label: 'TXB06' },
              { value: 'TXB07', label: 'TXB07' },
              { value: 'TXB08', label: 'TXB08' },
              { value: 'TXB09', label: 'TXB09' },
              { value: 'TXB10', label: 'TXB10' },
              { value: 'TXB11', label: 'TXB11' },
              { value: 'TXB12', label: 'TXB12' },
              { value: 'TXB13', label: 'TXB13' },
              { value: 'TXB14', label: 'TXB14' },
              { value: 'TXB15', label: 'TXB15' },
              { value: 'TXB16', label: 'TXB16' },
              { value: 'TXB17', label: 'TXB17' },
              { value: 'TXB18', label: 'TXB18' },
              { value: 'TXB19', label: 'TXB19' },
              { value: 'TXB20', label: 'TXB20' },
              { value: 'TXB21', label: 'TXB21' },
              { value: 'TXB23', label: 'TXB23' },
              { value: 'T3', label: 'T3' },
              { value: 'T4', label: 'T4' },
              { value: 'T6', label: 'T6' },
              { value: 'T7', label: 'T7' },
              { value: 'T9', label: 'T9' },
              { value: 'T10', label: 'T10' },
              { value: 'T11', label: 'T11' },
              { value: 'T14', label: 'T14' },
              { value: 'T20', label: 'T20' },
              { value: 'T21', label: 'T21' },
              { value: 'T23', label: 'T23' },
              { value: 'T26', label: 'T26' },
              { value: 'T27', label: 'T27' },
              { value: 'T28', label: 'T28' },
              { value: 'T29', label: 'T29' },
              { value: 'T30', label: 'T30' },
              { value: 'T31', label: 'T31' },
              { value: 'T33', label: 'T33' },
              { value: 'T40', label: 'T40' },
              { value: 'T41', label: 'T41' },
              { value: 'T42', label: 'T42' },
              { value: 'T52', label: 'T52' },
              { value: 'T53', label: 'T53' },
              { value: 'T54', label: 'T54' },
              { value: 'T55', label: 'T55' },
              { value: 'T56', label: 'T56' },
              { value: 'T58', label: 'T58' },
              { value: 'T59', label: 'T59' },
              { value: 'T60', label: 'T60' },
              { value: 'T61', label: 'T61' },
              { value: 'T62', label: 'T62' },
              { value: 'T63', label: 'T63' },
              { value: 'T64', label: 'T64' },
              { value: 'A-1', label: 'A-1' },
              { value: 'A-BK', label: 'A-BK' },
              { value: 'A-4', label: 'A-4' },
              { value: 'A-6', label: 'A-6' },
              { value: 'A-8', label: 'A-8' },
              { value: 'A-9', label: 'A-9' },
              { value: 'A-43', label: 'A-43' },
              { value: 'A-46', label: 'A-46' },
              { value: 'A-49', label: 'A-49' },
              { value: 'A-56', label: 'A-56' },
              { value: 'A-58', label: 'A-58' },
              { value: 'A-28', label: 'A-28' },
              { value: 'A-67', label: 'A-67' },
              { value: 'A-86', label: 'A-86' },
              { value: 'B-141', label: 'B-141' },
              { value: 'B-146', label: 'B-146' },
              { value: 'B-149', label: 'B-149' },
              { value: 'B-106', label: 'B-106' },
              { value: 'B-159', label: 'B-159' },
              { value: 'B-009', label: 'B-009' },
              { value: 'B-346', label: 'B-346' },
              { value: 'SR09-01', label: 'SR09-01' },
              { value: 'SR09-44', label: 'SR09-44' },
              { value: 'SR09-04', label: 'SR09-04' },
              { value: 'SR09-06', label: 'SR09-06' },
              { value: 'SR09-08', label: 'SR09-08' },
              { value: 'SR09-48', label: 'SR09-48' },
              { value: 'SR09-58', label: 'SR09-58' },
              { value: 'SR09-09', label: 'SR09-09' },
              { value: 'COR28-06', label: 'COR28-06' },
              { value: 'COR28-08', label: 'COR28-08' },
              { value: 'COR28-48', label: 'COR28-48' },
              { value: 'COR28-58', label: 'COR28-58' },
              { value: 'COR28-09', label: 'COR28-09' },
              { value: 'SANDA-04', label: 'SANDA-04' },
              { value: 'SANDA-42', label: 'SANDA-42' },
              { value: 'SANDA-43', label: 'SANDA-43' },
              { value: 'SANDA-48', label: 'SANDA-48' },
              { value: 'SANDA-55', label: 'SANDA-55' },
              { value: 'SANDA-09', label: 'SANDA-09' },
              { value: 'OVAL-06', label: 'OVAL-06' },
              { value: 'OVAL-09', label: 'OVAL-09' },
              { value: 'OVAL-48', label: 'OVAL-48' },
              { value: 'OVAL-58', label: 'OVAL-58' },
              { value: 'STAR LIGHT-4', label: 'STAR LIGHT-4' },
              { value: 'STAR LIGHT-47', label: 'STAR LIGHT-47' },
              { value: 'STAR LIGHT-59', label: 'STAR LIGHT-59' },
              { value: 'STAR LIGHT-9', label: 'STAR LIGHT-9' },
              { value: 'DANDY-41', label: 'DANDY-41' },
              { value: 'DANDY-48', label: 'DANDY-48' },
              { value: 'DANDY-59', label: 'DANDY-59' },
              { value: 'DANDY-95', label: 'DANDY-95' },
              { value: 'U-34-01', label: 'U-34-01' },
              { value: 'U-34-09', label: 'U-34-09' },
              { value: 'U-34-49', label: 'U-34-49' },
              { value: 'U-34-99', label: 'U-34-99' },
              { value: 'PVS1006-N01', label: 'PVS1006-N01' },
              { value: 'PVS1006-B09', label: 'PVS1006-B09' },
              { value: 'PVS1006-N48', label: 'PVS1006-N48' },
              { value: 'PVS1006-G48', label: 'PVS1006-G48' },
              { value: 'VEGA-2', label: 'VEGA-2' },
              { value: 'VEGA-3', label: 'VEGA-3' },
              { value: 'VEGA-5', label: 'VEGA-5' },
              { value: 'VEGA-6', label: 'VEGA-6' },
              { value: 'VEGA-8', label: 'VEGA-8' },
              { value: 'VEGA-9', label: 'VEGA-9' },
              { value: 'VEGA-11', label: 'VEGA-11' },
              { value: 'VEGA-12', label: 'VEGA-12' },
              { value: 'M17-0', label: 'M17-0' },
              { value: 'M17-BK', label: 'M17-BK' },
              { value: 'M17-BR', label: 'M17-BR' },
              { value: 'MP2-09', label: 'MP2-09' },
              { value: 'MP2-43', label: 'MP2-43' },
              { value: 'MP2-45', label: 'MP2-45' },
              { value: 'MP2-47', label: 'MP2-47' },
              { value: 'MP2-48', label: 'MP2-48' },
              { value: 'MP2-49', label: 'MP2-49' },
              { value: 'MP2-95', label: 'MP2-95' },
              { value: 'MP2-708', label: 'MP2-708' },
              { value: 'MP2-716', label: 'MP2-716' },
              { value: 'ORB-06', label: 'ORB-06' },
              { value: 'ORB-09', label: 'ORB-09' },
              { value: 'ORB-43', label: 'ORB-43' },
              { value: 'ORB-46', label: 'ORB-46' },
              { value: 'BYKARA-BG', label: 'BYKARA-BG' },
              { value: 'BYKARA-BB', label: 'BYKARA-BB' },
              { value: 'BYKARA-BE', label: 'BYKARA-BE' },
              { value: 'BYKARA-BR', label: 'BYKARA-BR' },
              { value: 'BYKARA-BY', label: 'BYKARA-BY' },
              { value: '710-BDB', label: '710-BDB' },
              { value: '710-MB', label: '710-MB' },
              { value: '710-LB', label: '710-LB' },
              { value: '902-4', label: '902-4' },
              { value: '902-5', label: '902-5' },
              { value: '902-6', label: '902-6' },
              { value: '902-7', label: '902-7' },
              { value: 'NUT75-44', label: 'NUT75-44' },
              { value: 'NUT75-47', label: 'NUT75-47' },
              { value: 'NUT75-59', label: 'NUT75-59' },
              { value: 'NUT75-09', label: 'NUT75-09' },
              { value: 'VT108-07', label: 'VT108-07' },
              { value: 'VT108-09', label: 'VT108-09' },
              { value: 'VT108-43', label: 'VT108-43' },
              { value: 'VT108-48', label: 'VT108-48' },
              { value: 'NUT970-9', label: 'NUT970-9' },
              { value: 'NUT970-403', label: 'NUT970-403' },
              { value: 'NUT970-404', label: 'NUT970-404' },
              { value: 'NUT970-408', label: 'NUT970-408' },
              { value: 'F-1114-黑金', label: 'F-1114-黑金' },
              { value: 'F-1114-硫化', label: 'F-1114-硫化' },
              { value: 'TC-1', label: 'TC-1' },
              { value: 'TC-40', label: 'TC-40' },
              { value: 'TC-45', label: 'TC-45' },
              { value: 'TC-49', label: 'TC-49' },
              { value: 'TC-31', label: 'TC-31' },
              { value: 'TC-33', label: 'TC-33' },
              { value: 'TC-9', label: 'TC-9' },
              { value: 'TD-42', label: 'TD-42' },
              { value: 'TD-44', label: 'TD-44' },
              { value: 'TD-46', label: 'TD-46' },
              { value: 'TD-48', label: 'TD-48' },
              { value: 'TD-49', label: 'TD-49' },
              { value: 'TD-6', label: 'TD-6' },
              { value: 'TD-59', label: 'TD-59' },
              { value: 'TE-1', label: 'TE-1' },
              { value: 'TE-40', label: 'TE-40' },
              { value: 'TE-43', label: 'TE-43' },
              { value: 'TE-45', label: 'TE-45' },
              { value: 'TE-49', label: 'TE-49' },
              { value: 'TE-9', label: 'TE-9' },
              { value: 'TE-59', label: 'TE-59' },
              { value: 'TE-5', label: 'TE-5' },
              { value: 'TF-41', label: 'TF-41' },
              { value: 'TF-44', label: 'TF-44' },
              { value: 'TF-46', label: 'TF-46' },
              { value: 'TF-49', label: 'TF-49' },
              { value: 'TF-7', label: 'TF-7' },
              { value: 'TF-9', label: 'TF-9' },
              { value: 'TF-59', label: 'TF-59' },
              { value: 'KM030', label: 'KM030' },
              { value: 'KM031', label: 'KM031' },
              { value: 'KM032', label: 'KM032' },
              { value: 'KM033', label: 'KM033' },
              { value: 'KM034', label: 'KM034' },
              { value: 'KM035', label: 'KM035' },
              { value: 'KM036', label: 'KM036' },
              { value: 'KM037', label: 'KM037' },
              { value: 'T3-LB', label: 'T3-LB' },
              { value: 'T3-RB', label: 'T3-RB' },
              { value: 'T3-MB', label: 'T3-MB' },
              { value: 'T3-B', label: 'T3-B' },
              { value: 'R31-41', label: 'R31-41' },
              { value: 'R31-RB', label: 'R31-RB' },
              { value: 'R31-B', label: 'R31-B' },
              { value: '420-43', label: '420-43' },
              { value: '420-48', label: '420-48' },
              { value: '420-09', label: '420-09' },
              { value: '350-41', label: '350-41' },
              { value: '350-42', label: '350-42' },
              { value: '350-47', label: '350-47' },
              { value: '350-49', label: '350-49' },
              { value: '350-05', label: '350-05' },
              { value: '350-08', label: '350-08' },
              { value: '350-09', label: '350-09' },
              { value: '350-59', label: '350-59' },
              { value: '360-03', label: '360-03' },
              { value: '360-07', label: '360-07' },
              { value: '360-40', label: '360-40' },
              { value: '360-50', label: '360-50' },
              { value: '360-56', label: '360-56' },
              { value: '360-59', label: '360-59' },
              { value: '370-020', label: '370-020' },
              { value: '370-47', label: '370-47' },
              { value: '370-48', label: '370-48' },
              { value: '370-09', label: '370-09' },
              { value: '400-TC', label: '400-TC' },
              { value: '400-BR', label: '400-BR' },
              { value: '400-BL', label: '400-BL' },
              { value: '440-46', label: '440-46' },
              { value: '440-48', label: '440-48' },
              { value: '440-09', label: '440-09' },
              { value: '460-LHG', label: '460-LHG' },
              { value: '460-HN', label: '460-HN' },
              { value: '460-HBN', label: '460-HBN' },
              { value: '300-LB', label: '300-LB' },
              { value: '300-RB', label: '300-RB' },
              { value: '300-MB', label: '300-MB' },
              { value: '300-B', label: '300-B' },
              { value: '320-CRB', label: '320-CRB' },
              { value: '320-CB', label: '320-CB' },
              { value: '330-CB', label: '330-CB' },
              { value: '330-CRB', label: '330-CRB' },
              { value: 'M-40', label: 'M-40' },
              { value: 'M-43', label: 'M-43' },
              { value: 'M-45', label: 'M-45' },
              { value: 'M-444', label: 'M-444' },
              { value: 'M-46', label: 'M-46' },
              { value: 'M-445', label: 'M-445' },
              { value: 'M-53', label: 'M-53' },
              { value: 'M-65', label: 'M-65' },
              { value: 'M-906', label: 'M-906' },
              { value: 'M-350', label: 'M-350' },
              { value: 'M-05', label: 'M-05' },
              { value: 'M-07', label: 'M-07' },
              { value: 'M-06', label: 'M-06' },
              { value: 'M-09', label: 'M-09' },
              { value: 'M-10', label: 'M-10' },
              { value: 'G-41', label: 'G-41' },
              { value: 'G-45', label: 'G-45' },
              { value: 'G-48', label: 'G-48' },
              { value: 'G-55', label: 'G-55' },
              { value: 'G-58', label: 'G-58' },
              { value: 'G-64', label: 'G-64' },
              { value: 'G-92', label: 'G-92' },
              { value: 'G-95', label: 'G-95' },
              { value: 'G-98', label: 'G-98' },
              { value: 'C-06', label: 'C-06' },
              { value: 'C-09', label: 'C-09' },
              { value: 'C-32', label: 'C-32' },
              { value: 'C-36', label: 'C-36' },
              { value: 'C-48', label: 'C-48' },
              { value: 'C-58', label: 'C-58' },
              { value: 'F-1', label: 'F-1' },
              { value: 'F-2', label: 'F-2' },
              { value: 'F-3', label: 'F-3' },
              { value: 'F-4', label: 'F-4' },
              { value: 'F-5', label: 'F-5' },
              { value: 'F-6', label: 'F-6' },
              { value: 'K-04', label: 'K-04' },
              { value: 'K-06', label: 'K-06' },
              { value: 'K-09', label: 'K-09' },
              { value: 'メタル-柄　金', label: 'メタル-柄　金' },
              { value: 'メタル-柄　銀', label: 'メタル-柄　銀' },
              { value: 'メタル-柄　金イ??シ', label: 'メタル-柄　金イ??シ' },
              { value: 'メタル-柄　銀イ??シ', label: 'メタル-柄　銀イ??シ' },
              { value: 'メタル-無地　金', label: 'メタル-無地　金' },
              { value: 'メタル-無地　銀', label: 'メタル-無地　銀' },
              { value: 'カワ－クロ', label: 'カワ－クロ' },
              { value: 'カワ－チャ', label: 'カワ－チャ' },
              { value: 'SB-101', label: 'SB-101' },
              { value: 'SB-102', label: 'SB-102' },
              { value: 'SB-103', label: 'SB-103' },
              { value: 'SB-104', label: 'SB-104' },
              { value: 'SB-105', label: 'SB-105' },
              { value: 'SB-106', label: 'SB-106' },
              { value: 'SB-107', label: 'SB-107' },
              { value: 'SB-108', label: 'SB-108' },
              { value: 'SB-109', label: 'SB-109' },
              { value: 'SB-110', label: 'SB-110' },
              { value: 'SB-111', label: 'SB-111' },
              { value: 'SB-112', label: 'SB-112' },
              { value: 'SB-113', label: 'SB-113' },
              { value: 'SB-114', label: 'SB-114' },
              { value: 'SB-115', label: 'SB-115' },
              { value: 'SB-116', label: 'SB-116' },
              { value: 'SB-117', label: 'SB-117' },
              { value: 'SB-118', label: 'SB-118' },
              { value: 'SB-119', label: 'SB-119' },
              { value: 'SB-120', label: 'SB-120' },
              { value: 'SB-121', label: 'SB-121' },
              { value: 'SB-122', label: 'SB-122' },
              { value: 'SB-123', label: 'SB-123' },
              { value: 'SB-124', label: 'SB-124' },
              { value: 'SB-125', label: 'SB-125' },
              { value: 'SB-126', label: 'SB-126' },
              { value: 'SB-127', label: 'SB-127' },
              { value: 'SB-128', label: 'SB-128' },
              { value: 'SB-129', label: 'SB-129' },
              { value: 'SB-130', label: 'SB-130' },
              { value: 'K-48', label: 'K-48' },
              { value: 'K-55', label: 'K-55' },
              { value: 'K-58', label: 'K-58' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="袖口テープ"
            name="jaket-sleeveOpeningTape"
            disabled={true}
            menuItems={[
              { value: 'empty', label: '' },
              { value: '無', label: '無' },
            ]}
          />
          <RhfSelect
            label="袖肘パッチ"
            name="jaket-sleeveElbowPatch"
            disabled={true}
            menuItems={[
              { value: 'empty', label: '' },
              { value: '無', label: '無' },
            ]}
          />
          <RhfSelect
            label="穴かがり *"
            name="jaket-hole"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'ミシン', label: 'ミシン' },
              { value: 'ハンド', label: 'ハンド' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="袖ボタン穴配色"
            name="jaket-sleeveButtonHoleColor"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '5個目', label: '5個目' },
              { value: '4個目', label: '4個目' },
              { value: '3個目', label: '3個目' },
              { value: '2個目', label: '2個目' },
              { value: '1個目', label: '1個目' },
              { value: '無', label: '無' },
            ]}
            readOnly={readOnly}
          />
        </GridContainer>
      </Box>
      <Box>
        <RhfTextField label="備考" name="jaket-remark" width="100%" multiline variant="outlined" readOnly={readOnly} />
      </Box>
      <LiningSearchDialog
        open={liningSearchDialogOpen}
        setOpen={setLiningSearchDialogOpen}
        loading={loading}
        linings={linings}
        handleListItemClick={handleListItemClick}
        handleSubmit={handleLiningSearchSubmit}
      />
      <Toast ref={toast} position="center" />
    </>
  );
};
