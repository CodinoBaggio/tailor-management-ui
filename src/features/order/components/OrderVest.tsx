// import React from 'react';

import { RhfSelect } from '../../../components/ui/RhfSelect';
import { RhfTextField } from '../../../components/ui/RhfTextField';
import { useSelectPattern } from '../hooks/useSelectPattern';
import { GridContainer } from '../../../components/containers/GridContainer';
import { Box } from '@mui/material';
import { FC } from 'react';

const style = {
  boxMargin: 'mb-5',
  blockColor1: 'bg-green-100',
  blockColor2: 'bg-red-100',
  blockColor3: 'bg-blue-100',
  blockColor4: 'bg-pink-100',
};

type Props = {
  readOnly: boolean;
};

export const OrderVest: FC<Props> = (props) => {
  const { readOnly } = props;
  const {
    selectPattern1Items,
    selectPattern2Items,
    selectPattern3Items,
    handleSelectPattern1Change,
    handleSelectPattern2Change,
  } = useSelectPattern('vest', 'TR1V');

  return (
    <>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor1}>
          <RhfSelect
            label="セレクトパターン1 *"
            name="vest-selectPattern1"
            menuItems={[{ value: 'empty', label: '' }, ...selectPattern1Items]}
            onChange={handleSelectPattern1Change}
            disabled={true}
          />
          <RhfSelect
            label="セレクトパターン2 *"
            name="vest-selectPattern2"
            menuItems={[{ value: 'empty', label: '' }, ...selectPattern2Items]}
            onChange={handleSelectPattern2Change}
            readOnly={readOnly}
          />
          <RhfSelect
            label="セレクトパターン3 *"
            name="vest-selectPattern3"
            menuItems={[{ value: 'empty', label: '' }, ...selectPattern3Items]}
            readOnly={readOnly}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor2}>
          <RhfTextField
            label="後丈 *"
            name="vest-backLength"
            validationMessage="後丈を入力してください"
            type="number"
            defaultValue={0}
            readOnly={readOnly}
          />
          <RhfTextField
            label="バスト上り *"
            name="vest-bustTop"
            validationMessage="バスト上りを入力してください"
            type="number"
            defaultValue={0}
            readOnly={readOnly}
          />
          <RhfTextField
            label="中胴上り *"
            name="vest-waistTop"
            validationMessage="中胴上りを入力してください"
            type="number"
            defaultValue={0}
            readOnly={readOnly}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor3}>
          <RhfSelect
            label="襟 *"
            name="vest-collar"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'Ｖカット', label: 'Ｖカット' },
              { value: '衿付き', label: '衿付き' },
              { value: 'ピーク', label: 'ピーク' },
              { value: 'ショールカラー', label: 'ショールカラー' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="胸P *"
            name="vest-chestPocket"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '無', label: '無' },
              { value: '胸Ｐ左右箱', label: '胸Ｐ左右箱' },
              { value: '胸Ｐ左箱', label: '胸Ｐ左箱' },
              { value: '胸Ｐ右箱', label: '胸Ｐ右箱' },
              { value: '胸Ｐ左右両玉', label: '胸Ｐ左右両玉' },
              { value: '胸Ｐ左両玉', label: '胸Ｐ左両玉' },
              { value: '胸Ｐ右両玉', label: '胸Ｐ右両玉' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="前ボタン *"
            name="vest-frontButton"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'Ｓ5×5', label: 'Ｓ5×5' },
              { value: 'Ｓ6×5', label: 'Ｓ6×5' },
              { value: 'Ｓ6×6', label: 'Ｓ6×6' },
              { value: 'Ｗ4×2', label: 'Ｗ4×2' },
              { value: 'Ｗ6×3', label: 'Ｗ6×3' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="前ボタン穴配色位置"
            name="vest-frontButtonHolePosition"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '6個目', label: '6個目' },
              { value: '5個目', label: '5個目' },
              { value: '4個目', label: '4個目' },
              { value: '3個目', label: '3個目' },
              { value: '2個目', label: '2個目' },
              { value: '無', label: '無' },
            ]}
            readOnly={readOnly}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor4}>
          <RhfSelect
            label="打ち合い"
            name="vest-uchiai"
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
            label="反身"
            name="vest-hanmi"
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
            name="vest-kutsumi"
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
            name="vest-squareShoulderLeft"
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
            name="vest-squareShoulderRight"
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
            name="vest-slopingShoulderLeft"
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
            name="vest-slopingShoulderRight"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '-0.5', label: '-0.5' },
              { value: '-1', label: '-1' },
              { value: '-1.5', label: '-1.5' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="鎌上げ"
            name="vest-sickleRaising"
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
            label="肩幅"
            name="vest-shoulderWidth"
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
            label="ボタン位置"
            name="vest-buttonPosition"
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
            label="前丈"
            name="vest-frontLength"
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
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
          <RhfSelect
            label="腰P *"
            name="vest-waistPocket"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '腰Ｐ箱', label: '腰Ｐ箱' },
              { value: '腰Ｐフラップ両玉', label: '腰Ｐフラップ両玉' },
              { value: '腰Ｐフラップ無し両玉', label: '腰Ｐフラップ無し両玉' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="背裏 *"
            name="vest-backSide"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '表地', label: '表地' },
              { value: '裏地', label: '裏地' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="尾錠 *"
            name="vest-buckle"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '有', label: '有' },
              { value: '無', label: '無' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="穴糸色 *"
            name="vest-holeThreadColor"
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
            label="ステッチ *"
            name="vest-stitch"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'ＡＭＦ0.2', label: 'ＡＭＦ0.2' },
              { value: 'ＡＭＦ0.6', label: 'ＡＭＦ0.6' },
              { value: '無', label: '無' },
            ]}
            readOnly={readOnly}
          />
          <RhfSelect
            label="穴かがり *"
            name="vest-hole"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'ミシン', label: 'ミシン' },
              { value: 'ハンド', label: 'ハンド' },
            ]}
            readOnly={readOnly}
          />
        </GridContainer>
      </Box>
      <Box>
        <RhfTextField
          label="備考"
          name="vest-remark"
          width="100%"
          multiline
          variant="outlined"
          readOnly={readOnly}
        />
      </Box>
    </>
  );
};
