import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

export const useSelectPattern = (parts: 'jaket' | 'pants' | 'vest') => {
  const { getValues, setValue } = useFormContext();
  const [selectPattern1Items, setSelectPattern1Items] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectPattern2Items, setSelectPattern2Items] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectPattern3Items, setSelectPattern3Items] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectPattern1Value, setSelectPattern1Value] = useState('');
  const [selectPattern2Value, setSelectPattern2Value] = useState('');
  const resources = useSelector((state: any) => state.orderResources.value);

  useEffect(() => {
    const setSelectPatternValues = () => {
      const s1 = getValues(`${parts}-selectPattern1`);
      const s2 = getValues(`${parts}-selectPattern2`);
      if (!s1 || !s2) return;
      // console.log('s1', s1);
      // console.log('s2', s2);
      setSelectPattern1Value(s1);
      setSelectPattern2Value(s2);
    };
    setSelectPatternValues();
  });

  useEffect(() => {
    const getSelectPattern1Items = () => {
      const items = resources.selectPattern.selectPattern1
        .filter(
          (ptn: { selectPattern1: string; parts: string }) =>
            ptn.parts === parts
        )
        .map((ptn: { selectPattern1: string; parts: string }) => ({
          value: ptn.selectPattern1,
          label: ptn.selectPattern1,
        }));
      setSelectPattern1Items(items);
    };
    getSelectPattern1Items();
  }, []);

  useEffect(() => {
    const getSelectPattern2Items = () => {
      // セレクトパターン2の初期値を設定する
      const items = resources.selectPattern.selectPattern2
        .filter(
          (ptn: { selectPattern2: string; selectPattern1: string }) =>
            ptn.selectPattern1 === selectPattern1Value
        )
        .map((ptn: { selectPattern2: string; selectPattern1: string }) => ({
          value: ptn.selectPattern2,
          label: ptn.selectPattern2,
        }));
      setSelectPattern2Items(items);
    };
    getSelectPattern2Items();
  }, [selectPattern1Value]);

  useEffect(() => {
    const getSelectPattern3Items = () => {
      // セレクトパターン3の初期値を設定する
      const items = resources.selectPattern.selectPattern3
        .filter(
          (ptn: { selectPattern3: string; selectPattern2: string }) =>
            ptn.selectPattern2 === selectPattern2Value
        )
        .map((ptn: { selectPattern3: string; selectPattern2: string }) => ({
          value: ptn.selectPattern3,
          label: ptn.selectPattern3,
        }));
      setSelectPattern3Items(items);
    };
    getSelectPattern3Items();
  }, [selectPattern2Value]);

  const handleSelectPattern1Change = (e: any) => {
    setValue(`${parts}-selectPattern2`, 'empty');
    setValue(`${parts}-selectPattern3`, 'empty');
    setSelectPattern2Items([]);
    setSelectPattern3Items([]);
    setSelectPattern1Value(e.target.value);
  };

  const handleSelectPattern2Change = (e: any) => {
    setValue(`${parts}-selectPattern3`, 'empty');
    setSelectPattern3Items([]);
    setSelectPattern2Value(e.target.value);
  };

  return {
    selectPattern1Items,
    selectPattern2Items,
    selectPattern3Items,
    handleSelectPattern1Change,
    handleSelectPattern2Change,
  };
};
