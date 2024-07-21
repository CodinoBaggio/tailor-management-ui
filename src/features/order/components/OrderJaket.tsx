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
  const [buttonProductNos, setButtonProductNos] = useState([{ value: 'empty', label: '' }]);
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

    // ボタン品番を取得
    const getButtons = async () => {
      try {
        const res: any = await orderApi.getButtons({
          searchPattern: '',
        });
        if (res.status === 'success') {
          const arr: { value: string; label: string }[] = res.payload.buttonProductNos.map((buttonProductNo: any) => {
            return { value: buttonProductNo, label: buttonProductNo };
          });
          arr.unshift({ value: 'empty', label: '' });
          setButtonProductNos(arr);
        } else {
          showMessage('エラー', 'error', res.message);
        }
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      }
    };
    getButtons();

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
        setLinings(res.payload.liningProductNos);
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
            menuItems={buttonProductNos}
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
