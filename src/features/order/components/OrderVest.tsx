import React from 'react';
import { useFormContext } from 'react-hook-form';

import { RhfSelect } from '../../../components/ui/RhfSelect';
import { RhfTextField } from '../../../components/ui/RhfTextField';
import { useSelectPattern } from '../hooks/useSelectPattern';

export const OrderVest = () => {
  const { getValues } = useFormContext();
  // const { getValues, setValue } = useFormContext();
  // const [selectPattern1Items, setSelectPattern1Items] = useState<
  //   { value: string; label: string }[]
  // >([]);
  // const [selectPattern2Items, setSelectPattern2Items] = useState<
  //   { value: string; label: string }[]
  // >([]);
  // const [selectPattern3Items, setSelectPattern3Items] = useState<
  //   { value: string; label: string }[]
  // >([]);
  // const [selectPattern1Value, setSelectPattern1Value] = useState('');
  // const [selectPattern2Value, setSelectPattern2Value] = useState('');
  // const resources = useSelector((state: any) => state.orderResources.value);

  // useEffect(() => {
  //   const setSelectPatternValues = () => {
  //     const s1 = getValues('vest-selectPattern1');
  //     const s2 = getValues('vest-selectPattern2');
  //     if (!s1 || !s2) return;
  //     // console.log('s1', s1);
  //     // console.log('s2', s2);
  //     setSelectPattern1Value(s1);
  //     setSelectPattern2Value(s2);
  //   };
  //   setSelectPatternValues();
  // });

  // useEffect(() => {
  //   const getSelectPattern1Items = () => {
  //     const items = resources.selectPattern.selectPattern1
  //       .filter(
  //         (ptn: { selectPattern1: string; parts: string }) =>
  //           ptn.parts === 'vest'
  //       )
  //       .map((ptn: { selectPattern1: string; parts: string }) => ({
  //         value: ptn.selectPattern1,
  //         label: ptn.selectPattern1,
  //       }));
  //     setSelectPattern1Items(items);
  //   };
  //   getSelectPattern1Items();
  // }, []);

  // useEffect(() => {
  //   const getSelectPattern2Items = () => {
  //     // セレクトパターン2の初期値を設定する
  //     const items = resources.selectPattern.selectPattern2
  //       .filter(
  //         (ptn: { selectPattern2: string; selectPattern1: string }) =>
  //           ptn.selectPattern1 === selectPattern1Value
  //       )
  //       .map((ptn: { selectPattern2: string; selectPattern1: string }) => ({
  //         value: ptn.selectPattern2,
  //         label: ptn.selectPattern2,
  //       }));
  //     setSelectPattern2Items(items);
  //   };
  //   getSelectPattern2Items();
  // }, [selectPattern1Value]);

  // useEffect(() => {
  //   const getSelectPattern3Items = () => {
  //     // セレクトパターン3の初期値を設定する
  //     const items = resources.selectPattern.selectPattern3
  //       .filter(
  //         (ptn: { selectPattern3: string; selectPattern2: string }) =>
  //           ptn.selectPattern2 === selectPattern2Value
  //       )
  //       .map((ptn: { selectPattern3: string; selectPattern2: string }) => ({
  //         value: ptn.selectPattern3,
  //         label: ptn.selectPattern3,
  //       }));
  //     setSelectPattern3Items(items);
  //   };
  //   getSelectPattern3Items();
  // }, [selectPattern2Value]);

  // const handleSelectPattern1Change = (e: any) => {
  //   setValue('vest-selectPattern2', 'empty');
  //   setValue('vest-selectPattern3', 'empty');
  //   setSelectPattern2Items([]);
  //   setSelectPattern3Items([]);
  //   setSelectPattern1Value(e.target.value);
  // };

  // const handleSelectPattern2Change = (e: any) => {
  //   setValue('vest-selectPattern3', 'empty');
  //   setSelectPattern3Items([]);
  //   setSelectPattern2Value(e.target.value);
  // };
  const {
    selectPattern1Items,
    selectPattern2Items,
    selectPattern3Items,
    handleSelectPattern1Change,
    handleSelectPattern2Change,
  } = useSelectPattern('vest');

  return (
    <>
      <div className="font-bold text-blue-600">OrderVest</div>
      <div>発注_ベスト _ID：{getValues('vest-vestOrderId')}</div>
      <RhfSelect
        label="セレクトパターン1"
        name="vest-selectPattern1"
        menuItems={[
          { value: 'empty', label: '' },
          ...selectPattern1Items,
        ]}
        onChange={handleSelectPattern1Change}
      />
      <RhfSelect
        label="セレクトパターン2"
        name="vest-selectPattern2"
        menuItems={[
          { value: 'empty', label: '' },
          ...selectPattern2Items,
        ]}
        onChange={handleSelectPattern2Change}
      />
      <RhfSelect
        label="セレクトパターン3"
        name="vest-selectPattern3"
        menuItems={[
          { value: 'empty', label: '' },
          ...selectPattern3Items,
        ]}
      />
      <RhfTextField
        label="後丈"
        name="vest-backLength"
        required
        message="後丈を入力してください"
        type="number"
        defaultValue={0}
      />
      <RhfTextField
        label="バスト上り"
        name="vest-bustTop"
        required
        message="バスト上りを入力してください"
        type="number"
        defaultValue={0}
      />
      <RhfTextField
        label="中胴上り"
        name="vest-waistTop"
        required
        message="中胴上りを入力してください"
        type="number"
        defaultValue={0}
      />
      <RhfSelect
        label="襟"
        name="vest-collar"
        menuItems={[
          { value: 'empty', label: '' },
          { value: 'Ｖカット', label: 'Ｖカット' },
          { value: '衿付き', label: '衿付き' },
          { value: 'ピーク', label: 'ピーク' },
          { value: 'ショールカラー', label: 'ショールカラー' },
        ]}
      />
      <RhfSelect
        label="胸P"
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
      />
      <RhfSelect
        label="前ボタン"
        name="vest-frontButton"
        menuItems={[
          { value: 'empty', label: '' },
          { value: 'Ｓ5×5', label: 'Ｓ5×5' },
          { value: 'Ｓ6×5', label: 'Ｓ6×5' },
          { value: 'Ｓ6×6', label: 'Ｓ6×6' },
          { value: 'Ｗ4×2', label: 'Ｗ4×2' },
          { value: 'Ｗ6×3', label: 'Ｗ6×3' },
        ]}
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
      />
      <RhfSelect
        label="腰P"
        name="vest-waistPocket"
        menuItems={[
          { value: 'empty', label: '' },
          { value: '腰Ｐ箱', label: '腰Ｐ箱' },
          { value: '腰Ｐフラップ両玉', label: '腰Ｐフラップ両玉' },
          { value: '腰Ｐフラップ無し両玉', label: '腰Ｐフラップ無し両玉' },
        ]}
      />
      <RhfSelect
        label="背裏"
        name="vest-backSide"
        menuItems={[
          { value: 'empty', label: '' },
          { value: '表地', label: '表地' },
          { value: '裏地', label: '裏地' },
        ]}
      />
      <RhfSelect
        label="尾錠"
        name="vest-buckle"
        menuItems={[
          { value: 'empty', label: '' },
          { value: '有', label: '有' },
          { value: '無', label: '無' },
        ]}
      />
      <RhfSelect
        label="穴糸色"
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
      />
      <RhfSelect
        label="ステッチ"
        name="vest-stitch"
        menuItems={[
          { value: 'empty', label: '' },
          { value: 'ＡＭＦ0.2', label: 'ＡＭＦ0.2' },
          { value: 'ＡＭＦ0.6', label: 'ＡＭＦ0.6' },
          { value: '無', label: '無' },
        ]}
      />
      <RhfSelect
        label="穴かがり"
        name="vest-hole"
        menuItems={[
          { value: 'empty', label: '' },
          { value: 'ミシン', label: 'ミシン' },
          { value: 'ハンド', label: 'ハンド' },
        ]}
      />
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
      />
    </>
  );
};
