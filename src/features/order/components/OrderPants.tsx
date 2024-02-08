// import React from 'react';

import { RhfSelect } from '../../../components/ui/RhfSelect';
import { RhfTextField } from '../../../components/ui/RhfTextField';
import { useSelectPattern } from '../hooks/useSelectPattern';
import { GridContainer } from '../../../components/containers/GridContainer';
import { Box } from '@mui/material';

const style = {
  boxMargin: 'mb-5',
  blockColor1: 'bg-green-100',
  blockColor2: 'bg-red-100',
  blockColor3: 'bg-blue-100',
  blockColor4: 'bg-pink-100',
};

export const OrderPants = () => {
  const {
    selectPattern1Items,
    selectPattern2Items,
    selectPattern3Items,
    handleSelectPattern1Change,
    handleSelectPattern2Change,
  } = useSelectPattern('pants');

  return (
    <>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor1}>
          <RhfSelect
            label="セレクトパターン1"
            name="pants-selectPattern1"
            menuItems={[{ value: 'empty', label: '' }, ...selectPattern1Items]}
            onChange={handleSelectPattern1Change}
          />
          <RhfSelect
            label="セレクトパターン2"
            name="pants-selectPattern2"
            menuItems={[{ value: 'empty', label: '' }, ...selectPattern2Items]}
            onChange={handleSelectPattern2Change}
          />
          <RhfSelect
            label="セレクトパターン3"
            name="pants-selectPattern3"
            menuItems={[{ value: 'empty', label: '' }, ...selectPattern3Items]}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor2}>
          <RhfTextField
            label="ウエスト"
            name="pants-waist"
            required
            message="ウエストを入力してください"
            type="number"
            defaultValue={0}
          />
          <RhfTextField
            label="ヒップ実寸"
            name="pants-hip"
            required
            message="ヒップ実寸を入力してください"
            type="number"
            defaultValue={0}
          />
          <RhfTextField
            label="ヒップ上り"
            name="pants-hipTop"
            required
            message="ヒップ上りを入力してください"
            type="number"
            defaultValue={0}
          />
          <RhfTextField
            label="股上"
            name="pants-rise"
            required
            message="股上を入力してください"
            type="number"
            defaultValue={0}
          />
          <RhfTextField
            label="股下左"
            name="pants-inseamLeft"
            required
            message="股下左を入力してください"
            type="number"
            defaultValue={0}
          />
          <RhfTextField
            label="股下右"
            name="pants-inseamRight"
            required
            message="股下右を入力してください"
            type="number"
            defaultValue={0}
          />
          <RhfTextField
            label="渡り幅"
            name="pants-crossingWidth"
            required
            message="渡り幅を入力してください"
            type="number"
            defaultValue={0}
          />
          <RhfTextField
            label="膝幅"
            name="pants-kneeWidth"
            required
            message="膝幅を入力してください"
            type="number"
            defaultValue={0}
          />
          <RhfTextField
            label="裾口幅"
            name="pants-hemOpening"
            required
            message="裾口幅を入力してください"
            type="number"
            defaultValue={0}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor3}>
          <RhfSelect
            label="タック"
            name="pants-tack"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '0本', label: '0本' },
              { value: '1本', label: '1本' },
              { value: '2本', label: '2本' },
            ]}
          />
          <RhfSelect
            label="脇P"
            name="pants-sidePocket"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'ナナメ', label: 'ナナメ' },
              { value: 'たて', label: 'たて' },
              {
                value: '横Ｌポケット（タック無し）',
                label: '横Ｌポケット（タック無し）',
              },
            ]}
          />
          <RhfSelect
            label="裾折返し"
            name="pants-foldedHem"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '無', label: '無' },
              { value: '有2.5cm', label: '有2.5cm' },
              { value: '有3cm', label: '有3cm' },
              { value: '有3.5cm', label: '有3.5cm' },
              { value: '有4cm', label: '有4cm' },
              { value: '有4.5cm', label: '有4.5cm' },
              { value: '有5cm', label: '有5cm' },
              { value: '有5.5cm', label: '有5.5cm' },
              { value: 'モーニング', label: 'モーニング' },
            ]}
          />
          <RhfSelect
            label="忍びP"
            name="pants-secretPocket"
            disabled
            menuItems={[
              { value: 'empty', label: '' },
              { value: '右のみ', label: '右のみ' },
            ]}
          />
          <RhfSelect
            label="膝裏"
            name="pants-kneeBack"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '前膝裏', label: '前膝裏' },
              { value: '前後膝裏', label: '前後膝裏' },
              { value: '無', label: '無' },
            ]}
          />
          <RhfSelect
            label="穴糸色"
            name="pants-holeThreadColor"
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
          />
          <RhfSelect
            label="AMFステッチ"
            name="pants-amfStitch"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
          />
          <RhfSelect
            label="脇AMF"
            name="pants-sideAmf"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
          />
          <RhfSelect
            label="ステッチ糸色"
            name="pants-stitchThreadColor"
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
          />
          <RhfSelect
            label="膝当て色"
            name="pants-kneepadColor"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '生地色', label: '生地色' },
              { value: 'KX-B001', label: 'KX-B001' },
              { value: 'KX-G001', label: 'KX-G001' },
            ]}
          />
          <RhfSelect
            label="タック仕様"
            name="pants-tackSpec"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'イン', label: 'イン' },
              { value: 'アゥト', label: 'アゥト' },
            ]}
          />
          <RhfSelect
            label="脇サテン地"
            name="pants-sideSatinFabric"
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
          />
          <RhfSelect
            label="ピスポケット玉緑"
            name="pants-pisPocketJadeGreen"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '片玉', label: '片玉' },
              { value: '両玉', label: '両玉' },
            ]}
          />
          <RhfSelect
            label="ピスポケット"
            name="pants-pisPocket"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '左ボタン止め', label: '左ボタン止め' },
              { value: '右ボタン止め', label: '右ボタン止め' },
              { value: '左右ボタン止め', label: '左右ボタン止め' },
              { value: '左右ボタン無', label: '左右ボタン無' },
              { value: '左曇型フラップ', label: '左曇型フラップ' },
              { value: '右雲型フラップ', label: '右雲型フラップ' },
              { value: '左右雲型フラップ', label: '左右雲型フラップ' },
              { value: '左ループ', label: '左ループ' },
              { value: '右ループ', label: '右ループ' },
              { value: '左右ループ', label: '左右ループ' },
              { value: '左三角', label: '左三角' },
              { value: '右三角', label: '右三角' },
              { value: '左右三角', label: '左右三角' },
            ]}
          />
          <RhfSelect
            label="持出し"
            name="pants-plaket"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '三角', label: '三角' },
            ]}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor4}>
          <RhfSelect
            label="出尻"
            name="pants-buttocks"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '0.5', label: '0.5' },
              { value: '1', label: '1' },
            ]}
          />
          <RhfSelect
            label="平尻"
            name="pants-flatButt"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '-0.5', label: '-0.5' },
              { value: '-1', label: '-1' },
            ]}
          />
          <RhfSelect
            label="前股上"
            name="pants-frontRise"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '2.5', label: '2.5' },
              { value: '2', label: '2' },
              { value: '1.5', label: '1.5' },
              { value: '1', label: '1' },
              { value: '-1', label: '-1' },
              { value: '-1.5', label: '-1.5' },
              { value: '-2', label: '-2' },
              { value: '-2.5', label: '-2.5' },
              { value: '-3', label: '-3' },
              { value: '-3.5', label: '-3.5' },
              { value: '-4', label: '-4' },
            ]}
          />
          <RhfSelect
            label="後股上"
            name="pants-backRise"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '3.5', label: '3.5' },
              { value: '3', label: '3' },
              { value: '2.5', label: '2.5' },
              { value: '2', label: '2' },
              { value: '1.5', label: '1.5' },
              { value: '1', label: '1' },
              { value: '0.5', label: '0.5' },
              { value: '-0.5', label: '-0.5' },
              { value: '-1', label: '-1' },
              { value: '-1.5', label: '-1.5' },
              { value: '-2', label: '-2' },
            ]}
          />
          <RhfSelect
            label="食い込み"
            name="pants-wedgie"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '-1', label: '-1' },
            ]}
          />
        </GridContainer>
      </Box>
      <Box>
        <GridContainer>
          <RhfSelect
            label="パンチェリーナ"
            name="pants-pancherina"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
          />
          <RhfSelect
            label="ループ数"
            name="pants-loopCount"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '0本サスペンダー釦有', label: '0本サスペンダー釦有' },
              { value: '0本サスペンダー釦無', label: '0本サスペンダー釦無' },
              { value: '6本', label: '6本' },
              { value: '8本', label: '8本' },
              { value: '6本アジャスター', label: '6本アジャスター' },
              { value: '8本アジャスター', label: '8本アジャスター' },
              {
                value: 'ループ０本アジャスタ有',
                label: 'ループ０本アジャスタ有',
              },
              { value: '脇尾錠(ループ無）', label: '脇尾錠(ループ無）' },
            ]}
          />
          <RhfSelect
            label="チーループ付"
            name="pants-qiLoop"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
          />
          <RhfSelect
            label="穴かがり"
            name="pants-hole"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'ミシン', label: 'ミシン' },
              { value: 'ハンド', label: 'ハンド' },
            ]}
          />
          <RhfSelect
            label="シック"
            name="pants-chic"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有り', label: '有り' },
              { value: '有り(大)', label: '有り(大)' },
            ]}
          />
          <RhfSelect
            label="ループ付け方"
            name="pants-loopAdd"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'TOP', label: 'TOP' },
              { value: '0.5下がり', label: '0.5下がり' },
            ]}
          />
          <RhfSelect
            label="フラシループ付"
            name="pants-plushLoop"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
          />
          <RhfSelect
            label="セット加工"
            name="pants-setFinishing"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
          />
          <RhfSelect
            label="クリース線"
            name="pants-creaseWire"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
          />
          <RhfSelect
            label="尻ぐりテープ"
            name="pants-buttholeTape"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
          />
        </GridContainer>
      </Box>
    </>
  );
};
