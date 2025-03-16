import { FieldValues, UseFormReturn } from 'react-hook-form';
import orderApi from '../api/orderApi';
import { ContainsJaket, ContainsPants, ContainsVest } from './orderUtil';

export const validateOrder = async (methods: UseFormReturn<FieldValues, any, undefined>) => {
  const { getValues } = methods;

  // 品名
  const productName = getValues('basis-productName');

  // 発注基本情報のチェック
  const basisError = validateOrderBasis(methods);

  // ジャケットのチェック
  let jaketError = {
    basisErrorCount: 0,
    jaketErrorCount: 0,
    pantsErrorCount: 0,
    vestErrorCount: 0,
  };
  if (ContainsJaket(productName)) {
    jaketError = await validateOrderJaket(methods);
  }

  // パンツのチェック
  let pantsError = {
    basisErrorCount: 0,
    jaketErrorCount: 0,
    pantsErrorCount: 0,
    vestErrorCount: 0,
  };
  if (ContainsPants(productName)) {
    pantsError = validateOrderPants(methods);
  }

  // ベストのチェック
  let vestError = {
    basisErrorCount: 0,
    jaketErrorCount: 0,
    pantsErrorCount: 0,
    vestErrorCount: 0,
  };
  if (ContainsVest(productName)) {
    vestError = validateOrderVest(methods);
  }
  // const jaketError = validateOrderJaket(methods, bodySize.jaket);
  // const pantsError = validateOrderPants(methods);
  // const vestError = validateOrderVest(methods);

  return {
    success:
      basisError.basisErrorCount +
        basisError.jaketErrorCount +
        basisError.pantsErrorCount +
        basisError.vestErrorCount ===
        0 &&
      jaketError.basisErrorCount +
        jaketError.jaketErrorCount +
        jaketError.pantsErrorCount +
        jaketError.vestErrorCount ===
        0 &&
      pantsError.basisErrorCount +
        pantsError.jaketErrorCount +
        pantsError.pantsErrorCount +
        pantsError.vestErrorCount ===
        0 &&
      vestError.basisErrorCount + vestError.jaketErrorCount + vestError.pantsErrorCount + vestError.vestErrorCount ===
        0,
    errorCounts: {
      basisErrorCount:
        basisError.basisErrorCount +
        jaketError.basisErrorCount +
        pantsError.basisErrorCount +
        vestError.basisErrorCount,
      jaketErrorCount:
        basisError.jaketErrorCount +
        jaketError.jaketErrorCount +
        pantsError.jaketErrorCount +
        vestError.jaketErrorCount,
      pantsErrorCount:
        basisError.pantsErrorCount +
        jaketError.pantsErrorCount +
        pantsError.pantsErrorCount +
        vestError.pantsErrorCount,
      vestErrorCount:
        basisError.vestErrorCount + jaketError.vestErrorCount + pantsError.vestErrorCount + vestError.vestErrorCount,
    },
  };
};

export const validateOrderBasis = (methods: UseFormReturn<FieldValues, any, undefined>) => {
  const errorCounts = {
    basisErrorCount: 0,
    jaketErrorCount: 0,
    pantsErrorCount: 0,
    vestErrorCount: 0,
  };
  const { getValues } = methods;

  //#region 必須入力チェック
  {
    const requiredFields = ['basis-customerName', 'basis-productName', 'basis-fabricProductNo'];
    requiredFields.forEach((field) => {
      if (!getValues(field) || getValues(field) === 'empty') {
        methods.setError(field, {
          type: 'custom',
          message: '必須入力です',
        });
        errorCounts.basisErrorCount++;
      }
    });
    if (0 < errorCounts.basisErrorCount) return errorCounts;
  }
  //#endregion

  //#region No.9
  {
    const productName = getValues('basis-productName');
    if (productName === 'PT') {
      const brandName = methods.getValues('jaket-brandName');
      if (brandName !== 'empty' && brandName !== '') {
        methods.setError('jaket-brandName', {
          type: 'custom',
          message: '品名にPTが選択されているため、空白を選択してください',
        });
        errorCounts.jaketErrorCount++;
      }
      const fabricMark = methods.getValues('jaket-fabricMark');
      if (fabricMark !== 'empty' && fabricMark !== '') {
        methods.setError('jaket-fabricMark', {
          type: 'custom',
          message: '品名にPTが選択されているため、空白を選択してください',
        });
        errorCounts.jaketErrorCount++;
      }
      const inName = methods.getValues('jaket-lining');
      if (inName !== '') {
        methods.setError('jaket-lining', {
          type: 'custom',
          message: '品名にPTが選択されているため、空白を選択してください',
        });
        errorCounts.jaketErrorCount++;
      }
    }
    if (productName === 'VT') {
      const brandName = methods.getValues('jaket-brandName');
      if (brandName !== 'empty' && brandName !== '') {
        methods.setError('jaket-brandName', {
          type: 'custom',
          message: '品名にVTが選択されているため、空白を選択してください',
        });
        errorCounts.jaketErrorCount++;
      }
      const fabricMark = methods.getValues('jaket-fabricMark');
      if (fabricMark !== 'empty' && fabricMark !== '') {
        methods.setError('jaket-fabricMark', {
          type: 'custom',
          message: '品名にVTが選択されているため、空白を選択してください',
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.13-20
  {
    const productName = getValues('basis-fabricProductNo');
    if (productName !== 'TRANDS') {
      // No.13
      {
        const value = methods.getValues('basis-blendRateFabric1');
        if (value !== 'empty' && value !== '') {
          methods.setError('basis-blendRateFabric1', {
            type: 'custom',
            message: '生地品番がTRANDS以外のため、空白を選択してください',
          });
          errorCounts.basisErrorCount++;
        }
      }
      // No.14
      {
        const value = methods.getValues('basis-blendRate1');
        if (value) {
          methods.setError('basis-blendRate1', {
            type: 'custom',
            message: '生地品番がTRANDS以外のため、空白にしてください',
          });
          errorCounts.basisErrorCount++;
        }
      }
      // No.15
      {
        const value = methods.getValues('basis-blendRateFabric2');
        if (value !== 'empty' && value !== '') {
          methods.setError('basis-blendRateFabric2', {
            type: 'custom',
            message: '生地品番がTRANDS以外のため、空白を選択してください',
          });
          errorCounts.basisErrorCount++;
        }
      }
      // No.16
      {
        const value = methods.getValues('basis-blendRate2');
        if (value) {
          methods.setError('basis-blendRate2', {
            type: 'custom',
            message: '生地品番がTRANDS以外のため、空白にしてください',
          });
          errorCounts.basisErrorCount++;
        }
      }
      // No.17
      {
        const value = methods.getValues('basis-blendRateFabric3');
        if (value) {
          methods.setError('basis-blendRateFabric3', {
            type: 'custom',
            message: '生地品番がTRANDS以外のため、空白にしてください',
          });
          errorCounts.basisErrorCount++;
        }
      }
      // No.18
      {
        const value = methods.getValues('basis-blendRate3');
        if (value) {
          methods.setError('basis-blendRate3', {
            type: 'custom',
            message: '生地品番がTRANDS以外のため、空白にしてください',
          });
          errorCounts.basisErrorCount++;
        }
      }
      // No.19
      {
        const value = methods.getValues('basis-blendRateFabric4');
        if (value) {
          methods.setError('basis-blendRateFabric4', {
            type: 'custom',
            message: '生地品番がTRANDS以外のため、空白にしてください',
          });
          errorCounts.basisErrorCount++;
        }
      }
      // No.20
      {
        const value = methods.getValues('basis-blendRate4');
        if (value) {
          methods.setError('basis-blendRate4', {
            type: 'custom',
            message: '生地品番がTRANDS以外のため、空白にしてください',
          });
          errorCounts.basisErrorCount++;
        }
      }
    }
  }
  //#endregion

  return errorCounts;
};

export const validateOrderJaket = async (methods: UseFormReturn<FieldValues, any, undefined>) => {
  const errorCounts = {
    basisErrorCount: 0,
    jaketErrorCount: 0,
    pantsErrorCount: 0,
    vestErrorCount: 0,
  };
  const { getValues } = methods;

  //#region 必須入力チェック
  {
    const requiredFields = [
      'jaket-selectPattern1',
      'jaket-selectPattern2',
      'jaket-selectPattern3',
      'jaket-jaketLength',
      'jaket-shoulderWidth',
      'jaket-sleeveLengthLeft',
      'jaket-sleeveLengthRight',
      'jaket-bustTop',
      'jaket-waistTop',
      'jaket-canvas',
      'jaket-shoulderType',
      'jaket-collarType',
      'jaket-frontButton',
      'jaket-collarWidth',
      'jaket-sleeveButton',
      'jaket-sleeveOpening',
      'jaket-chestPocket',
      'jaket-sewingMethod',
      'jaket-frontCut',
      'jaket-labelSatinFabric',
      'jaket-stitch',
      'jaket-chestBoxSatinFabric',
      'jaket-waistPocket',
      'jaket-changePocket',
      'jaket-backSpec',
      'jaket-daiba',
      'jaket-penPocket',
      'jaket-pat',
      'jaket-lining',
      'jaket-vents',
      'jaket-inName',
      'jaket-labelHole',
      'jaket-brandName',
      'jaket-fabricMark',
      'jaket-buttonProductNo',
      'jaket-hole',
      'jaket-sleeveBack',
    ];
    requiredFields.forEach((field) => {
      if (!getValues(field) || getValues(field) === 'empty') {
        methods.setError(field, {
          type: 'custom',
          message: '必須入力です',
        });
        errorCounts.jaketErrorCount++;
      }
    });
    if (0 < errorCounts.jaketErrorCount) return errorCounts;
  }
  //#endregion

  //#region No.34
  {
    // 寸法表を取得する
    const res: any = await orderApi.getBodySize({
      jaket: {
        selectPattern2: getValues('jaket-selectPattern2'),
        selectPattern3: getValues('jaket-selectPattern3'),
      },
      pants: {
        selectPattern2: getValues('pants-selectPattern2'),
        selectPattern3: getValues('pants-selectPattern3'),
      },
      vest: {
        selectPattern2: getValues('vest-selectPattern2'),
        selectPattern3: getValues('vest-selectPattern3'),
      },
    });
    const value = methods.getValues('jaket-shoulderWidth');
    if (
      !(
        res.payload.jaket.shoulderWidth - 4 <= parseFloat(value) &&
        parseFloat(value) <= res.payload.jaket.shoulderWidth + 4
      )
    ) {
      methods.setError('jaket-shoulderWidth', {
        type: 'custom',
        message: `指定型紙(${res.payload.jaket.shoulderWidth}cm)の±4cm以内を入力してください`,
      });
      errorCounts.jaketErrorCount++;
    }
  }
  //#endregion

  //#region No.39
  {
    const value = methods.getValues('jaket-bustTop');
    if (parseFloat(value) < 86) {
      methods.setError('jaket-bustTop', {
        type: 'custom',
        message: '86cm以上を入力してください',
      });
      errorCounts.jaketErrorCount++;
    }
  }
  //#endregion

  //#region No.40
  {
    const value = methods.getValues('jaket-waistTop');
    if (parseFloat(value) < 71) {
      methods.setError('jaket-waistTop', {
        type: 'custom',
        message: '71cm以上を入力してください',
      });
      errorCounts.jaketErrorCount++;
    }
  }
  //#endregion

  //#region No.41
  {
    const value = methods.getValues('jaket-canvas');
    if (value === '毛芯無し') {
      const targetValue = methods.getValues('jaket-sewingMethod');
      if (targetValue !== '清涼毛芯無し') {
        methods.setError('jaket-sewingMethod', {
          type: 'custom',
          message: `${value}のため、清涼毛芯無しを選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
      const targetValue2 = methods.getValues('jaket-pat');
      if (targetValue2 !== '無') {
        methods.setError('jaket-pat', {
          type: 'custom',
          message: `${value}のため、無を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.42
  {
    const value = methods.getValues('jaket-shoulderType');
    if (value === '袖高') {
      const targetValue = methods.getValues('jaket-pat');
      if (parseFloat(targetValue) !== 1.0 && parseFloat(targetValue) !== 0.5) {
        methods.setError('jaket-pat', {
          type: 'custom',
          message: `${value}のため、0.5または1.0を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.43
  {
    const value = methods.getValues('jaket-collarType');
    if (value === 'ショ-ル--3') {
      const targetValue = methods.getValues('jaket-collarWidth');
      if (parseFloat(targetValue) !== 7) {
        methods.setError('jaket-collarWidth', {
          type: 'custom',
          message: `${value}のため、7cmを選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
    if (value === 'ショ-ル--1' || value === 'ショ-ル--2') {
      const targetValue = methods.getValues('jaket-collarWidth');
      if (parseFloat(targetValue) !== 8) {
        methods.setError('jaket-collarWidth', {
          type: 'custom',
          message: `${value}のため、8cmを選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.44
  {
    const value = methods.getValues('jaket-frontButton');
    if (value.charAt(0) === 'W') {
      const targetValue = methods.getValues('jaket-collarType');
      if (targetValue !== 'ピーク' && targetValue !== 'セミピーク') {
        methods.setError('jaket-collarType', {
          type: 'custom',
          message: `${value}のため、ピークまたはセミピークを選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
    if (value.charAt(0) === 'W') {
      const targetValue = methods.getValues('jaket-frontCut');
      if (targetValue !== 'スクエア') {
        methods.setError('jaket-frontCut', {
          type: 'custom',
          message: `${value}のため、スクエアを選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.48
  {
    const value = methods.getValues('jaket-frontButton');
    if (value === 'W6×1' || value === 'W6×2') {
      const targetValue = methods.getValues('jaket-chestPocket');
      if (targetValue === 'アゥト') {
        methods.setError('jaket-chestPocket', {
          type: 'custom',
          message: `${value}のため、アゥト以外を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.53
  {
    const value = methods.getValues('jaket-stitch');
    if (value.includes('0.2') || value.includes('0.6')) {
      const targetValue = methods.getValues('jaket-stitchLocation');
      if (targetValue === 'empty' || targetValue === '') {
        methods.setError('jaket-stitchLocation', {
          type: 'custom',
          message: `${value}のため、空白以外を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.58
  {
    const value = methods.getValues('jaket-waistPocket');
    if (value === 'アゥト' || value.includes('フラップ無')) {
      const targetValue = methods.getValues('jaket-flapWidth');
      if (targetValue !== 'empty' && !isNaN(targetValue)) {
        methods.setError('jaket-flapWidth', {
          type: 'custom',
          message: `${value}のため、空白を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.61
  {
    const value = methods.getValues('jaket-backSpec');
    if (value === '観音(台場:半裏・大見返し）') {
      const targetValue = methods.getValues('jaket-daiba');
      if (targetValue !== '半裏' && targetValue !== '大見返し') {
        methods.setError('jaket-daiba', {
          type: 'custom',
          message: `${value}のため、半裏または大見返しを選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.64
  {
    const daibaValue = methods.getValues('jaket-daiba');
    const penPocketValue = methods.getValues('jaket-penPocket');

    if (daibaValue === '切り台場' && penPocketValue !== '特殊ペンPK') {
      methods.setError('jaket-penPocket', {
        type: 'custom',
        message: `切り台場が選択されているため、特殊ペンPKを選択してください`,
      });
      errorCounts.jaketErrorCount++;
    }

    if (daibaValue !== '切り台場' && penPocketValue === '特殊ペンPK') {
      methods.setError('jaket-daiba', {
        type: 'custom',
        message: `特殊ペンPKが選択されているため、切り台場を選択してください`,
      });
      errorCounts.jaketErrorCount++;
    }
  }
  //#endregion

  //#region No.69
  {
    const value = methods.getValues('jaket-vents');
    if (value === 'フックベント') {
      const targetValue = methods.getValues('jaket-backSpec');
      if (targetValue !== '観音') {
        methods.setError('jaket-backSpec', {
          type: 'custom',
          message: `${value}のため、観音を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.71
  {
    const value = methods.getValues('jaket-inName');
    if (value === '有') {
      const targetValue = methods.getValues('jaket-nameFont');
      if (targetValue === 'empty' || targetValue === '') {
        methods.setError('jaket-nameFont', {
          type: 'custom',
          message: `ネ-ム入れが${value}のため、いずれかを選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    } else {
      const targetValue = methods.getValues('jaket-nameFont');
      if (targetValue !== 'empty' && targetValue !== '') {
        methods.setError('jaket-nameFont', {
          type: 'custom',
          message: `ネ-ム入れが${value}のため、空白を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.72
  {
    const value = methods.getValues('jaket-inName');
    if (value === '有') {
      const value2 = methods.getValues('jaket-nameFont');
      if (value2 === 'ローマ字（筆）') {
        const targetValue = methods.getValues('jaket-namePosition');
        if (targetValue !== 'タバコポケット上') {
          methods.setError('jaket-namePosition', {
            type: 'custom',
            message: `${value2}のため、タバコポケット上を選択してください`,
          });
          errorCounts.jaketErrorCount++;
        }
      }
      if (value2 === '漢字') {
        const targetValue = methods.getValues('jaket-namePosition');
        if (targetValue !== '見返し') {
          methods.setError('jaket-namePosition', {
            type: 'custom',
            message: `${value2}のため、見返しを選択してください`,
          });
          errorCounts.jaketErrorCount++;
        }
      }
    } else {
      const targetValue = methods.getValues('jaket-namePosition');
      if (targetValue !== 'empty' && targetValue !== '') {
        methods.setError('jaket-namePosition', {
          type: 'custom',
          message: `ネ-ム入れが${value}のため、空白を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.73
  {
    const value = methods.getValues('jaket-inName');
    if (value === '有') {
      const targetValue = methods.getValues('jaket-nameColor');
      if (targetValue === 'empty' || targetValue === '') {
        methods.setError('jaket-nameColor', {
          type: 'custom',
          message: `ネ-ム入れが${value}のため、いずれかを選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    } else {
      const targetValue = methods.getValues('jaket-nameColor');
      if (targetValue !== 'empty' && targetValue !== '') {
        methods.setError('jaket-nameColor', {
          type: 'custom',
          message: `ネ-ム入れが${value}のため、空白を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.74
  {
    const value = methods.getValues('jaket-inName');
    if (value === '有') {
      const targetValue = methods.getValues('jaket-name');
      if (targetValue === '') {
        methods.setError('jaket-name', {
          type: 'custom',
          message: `ネ-ム入れが${value}のため、いずれかを選択してください`,
        });
        errorCounts.jaketErrorCount++;
      } else {
        if (
          methods.getValues('jaket-nameFont') === '漢字' &&
          !/^[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF\u3000\u0020\s\d\uFF10-\uFF19]+$/.test(targetValue)
        ) {
          methods.setError('jaket-name', {
            type: 'custom',
            message: `ネーム字体が漢字のため、ネーム内容を漢字のみにしてください`,
          });
          errorCounts.jaketErrorCount++;
        }
        if (
          (methods.getValues('jaket-nameFont') === 'ローマ字（筆）' ||
            methods.getValues('jaket-nameFont') === 'ローマ字（活字）') &&
          !/^[A-Za-z0-9.\s\uFF10-\uFF19]+$/.test(targetValue)
        ) {
          methods.setError('jaket-name', {
            type: 'custom',
            message: `ネーム字体がローマ字のため、ネーム内容を英字かピリオドのみにしてください`,
          });
          errorCounts.jaketErrorCount++;
        }
      }
    } else {
      const targetValue = methods.getValues('jaket-name');
      if (targetValue !== '') {
        methods.setError('jaket-name', {
          type: 'custom',
          message: `ネ-ム入れが${value}のため、空白を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.76
  {
    const value = methods.getValues('jaket-stitch');
    if (value === 'empty' || value === '') {
      const targetValue = methods.getValues('jaket-stitchThreadColor');
      if (targetValue !== 'empty' && targetValue !== '') {
        methods.setError('jaket-stitchThreadColor', {
          type: 'custom',
          message: `ステッチが無のため、空白を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.81
  {
    const tests = ['ENKC', 'ATW', 'STW', 'BT', 'CT', 'TRD', 'PT', 'TBW', 'D', 'P', 'X'];

    const value = methods.getValues('basis-fabricProductNo');
    if (tests.some((s) => value.startsWith(s))) {
      const targetValue = methods.getValues('jaket-fabricMark');
      if (targetValue === '有') {
        methods.setError('jaket-fabricMark', {
          type: 'custom',
          message: `生地品番が${value}のため、無を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.67、82
  {
    // ゼニアの生地品番リスト
    const tests = [
      'ATJ1546',
      'ATJ1547',
      'ATJ1548',
      'ATJ1549',
      'ATJ1828',
      'ATJ1522',
      'ATJ1523',
      'ATJ1524',
      'ATJ1528',
      'ATJ1529',
      'ATJ1738',
      'ATJ1740',
      'ATJ1741',
      'ATJ1742',
      'ATJ1802',
      'ATJ1804',
      'ATJ1805',
      'ATJ1806',
      'ATJ1807',
      'ATJ1809',
      'ATJ1826',
      'ATJ1827',
      'ATJ1829',
      'ATJ1830',
      'ATJ1865',
      'ATJ1873',
      'ATJ1874',
      'ATJ1875',
      'ATJ2006',
      'ATJ2007',
      'ATJ2008',
      'ATJ2015',
      'ATJ2016',
      'ATJ2037',
      'ATJ2038',
      'ATJ2040',
      'ATJ2041',
      'ATJ2042',
      'ATJ2043',
      'ZE500',
      'ZE502',
      'ZE503',
      'ZE504',
      'ZE508',
      'ZE511',
      'ZE512',
      'ZE513',
      'ZE514',
      'ZE515',
      'ZE516',
      'ZE517',
      'ZK518',
      'ZK519',
      'ZK520',
      'ZK521',
      'ZK522',
      'ZK523',
      'ZK524',
      'ZK525',
      'ZK526',
      'ZK527',
      'ZE532',
      'ZE533',
      'ZE534',
      'ZE535',
      'ZE536',
      'ZE537',
      'ZE538',
      'ZE539',
      'ZE540',
      'ZE541',
      'ZE542',
      'ZE543',
      'ZE544',
      'ATJ1530',
      'ATJ1543',
      'ATJ1544',
    ];

    // ゼニアの裏地チェック
    const liningValue = methods.getValues('jaket-lining');
    const isZeniaLining = ['FF10', 'FF20', 'FF00'].some((s) => liningValue.startsWith(s));
    if (isZeniaLining) {
      const fabricValue = methods.getValues('basis-fabricProductNo');
      if (!tests.some((s) => s === fabricValue)) {
        methods.setError('jaket-lining', {
          type: 'custom',
          message: `ゼニアの裏地を選択しているため、ゼニアの生地品番を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }

    // ゼニアのボタンチェック
    const buttonValue = methods.getValues('jaket-buttonProductNo');
    const isZeniaButton = ['EZ10', 'EZ20', 'EZ30', 'EZ60', 'EZ150'].some((s) => buttonValue.startsWith(s));
    if (isZeniaButton) {
      const fabricValue = methods.getValues('basis-fabricProductNo');
      if (!tests.some((s) => s === fabricValue)) {
        methods.setError('jaket-buttonProductNo', {
          type: 'custom',
          message: `ゼニアのボタンを選択しているため、ゼニアの生地品番を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  //#region 上着にて、セレクトパターン2＝SYorJYの時、袖幅＝D～系のものを選べないようにしてほしい(6、7、8…などのみを選べるように)
  {
    const value = methods.getValues('jaket-selectPattern2');
    if (value === 'SY' || value === 'JY') {
      const targetValue = methods.getValues('jaket-collarWidth');
      if (targetValue.startsWith('D')) {
        methods.setError('jaket-collarWidth', {
          type: 'custom',
          message: `セレクトパターン2が${value}のため、D系以外を選択してください`,
        });
        errorCounts.jaketErrorCount++;
      }
    }
  }
  //#endregion

  return errorCounts;
};

export const validateOrderPants = (methods: UseFormReturn<FieldValues, any, undefined>) => {
  const errorCounts = {
    basisErrorCount: 0,
    jaketErrorCount: 0,
    pantsErrorCount: 0,
    vestErrorCount: 0,
  };
  const { getValues } = methods;

  //#region 必須入力チェック
  {
    const requiredFields = [
      'pants-selectPattern1',
      'pants-selectPattern2',
      'pants-selectPattern3',
      'pants-waist',
      'pants-hipTop',
      'pants-rise',
      'pants-inseamLeft',
      'pants-inseamRight',
      'pants-crossingWidth',
      'pants-kneeWidth',
      'pants-hemOpening',
      // 'pants-tack',
      'pants-sidePocket',
      'pants-foldedHem',
      'pants-kneeBack',
      'pants-holeThreadColor',
      'pants-amfStitch',
      'pants-sideAmf',
      'pants-kneepadColor',
      // 'pants-tackSpec',
      'pants-sideSatinFabric',
      'pants-pisPocketJadeGreen',
      'pants-pisPocket',
      // 'pants-buttocks',
      // 'pants-flatButt',
      // 'pants-frontRise',
      // 'pants-backRise',
      // 'pants-wedgie',
      'pants-loopCount',
      'pants-qiLoop',
      'pants-hole',
      'pants-chic',
      'pants-loopAdd',
      'pants-plushLoop',
      'pants-setFinishing',
      'pants-creaseWire',
      'pants-buttholeTape',
    ];
    requiredFields.forEach((field) => {
      if (!getValues(field) || getValues(field) === 'empty') {
        methods.setError(field, {
          type: 'custom',
          message: '必須入力です',
        });
        errorCounts.pantsErrorCount++;
      }
    });
    if (0 < errorCounts.pantsErrorCount) return errorCounts;
  }
  //#endregion

  //#region ボタン品番は必須とする
  {
    const value = methods.getValues('jaket-buttonProductNo');
    if (value === 'empty' || value === '') {
      methods.setError('jaket-buttonProductNo', {
        type: 'custom',
        message: `ボタン品番を選択してください`,
      });
      errorCounts.jaketErrorCount++;
    }
  }
  //#endregion

  //#region No.120
  {
    const value = methods.getValues('pants-hipTop');
    const targetValue = methods.getValues('pants-waist');
    if (parseFloat(value) < parseFloat(targetValue)) {
      methods.setError('pants-waist', {
        type: 'custom',
        message: `ヒップ上りより小さい値を入力してください`,
      });
      errorCounts.pantsErrorCount++;
      methods.setError('pants-hipTop', {
        type: 'custom',
        message: `ウエストより大きい値を入力してください`,
      });
      errorCounts.pantsErrorCount++;
    }
  }
  //#endregion

  //#region No.122
  {
    const value = methods.getValues('pants-inseamLeft');
    if (parseFloat(value) < 60) {
      methods.setError('pants-inseamLeft', {
        type: 'custom',
        message: `60cm以上を入力してください`,
      });
      errorCounts.pantsErrorCount++;
    }
  }
  //#endregion

  //#region No.123
  {
    const value = methods.getValues('pants-inseamRight');
    if (parseFloat(value) < 60) {
      methods.setError('pants-inseamRight', {
        type: 'custom',
        message: `60cm以上を入力してください`,
      });
      errorCounts.pantsErrorCount++;
    }
  }
  //#endregion

  //#region No.125
  {
    const value = methods.getValues('pants-kneeWidth');
    const targetValue = methods.getValues('pants-crossingWidth');
    if (parseFloat(targetValue) < parseFloat(value)) {
      methods.setError('pants-kneeWidth', {
        type: 'custom',
        message: `渡り幅より小さい値を入力してください`,
      });
      errorCounts.pantsErrorCount++;
    }
  }
  //#endregion

  //#region No.126
  {
    const value = methods.getValues('pants-hemOpening');
    const targetValue = methods.getValues('pants-kneeWidth');
    if (parseFloat(targetValue) < parseFloat(value)) {
      methods.setError('pants-hemOpening', {
        type: 'custom',
        message: `膝幅より小さい値を入力してください`,
      });
      errorCounts.pantsErrorCount++;
    }
  }
  //#endregion

  //#region No.133
  {
    const value = methods.getValues('pants-amfStitch');
    const targetValue = methods.getValues('pants-stitchThreadColor');
    if (value === '有' && (targetValue === 'empty' || targetValue === '' || targetValue === '無')) {
      methods.setError('pants-stitchThreadColor', {
        type: 'custom',
        message: `AMFステッチが${value}ため、いづれかを選択してください`,
      });
      errorCounts.pantsErrorCount++;
    }
  }
  //#endregion

  //#region No.136
  {
    const value = methods.getValues('pants-tack');
    if (value === '1本' || value === '2本') {
      const targetValue = methods.getValues('pants-tackSpec');
      if (targetValue !== 'イン' && targetValue !== 'アゥト') {
        methods.setError('pants-tackSpec', {
          type: 'custom',
          message: `タックが${value}ため、インまたはアゥトを選択してください`,
        });
        errorCounts.pantsErrorCount++;
      }
    } else if (value === '0本') {
      const targetValue = methods.getValues('pants-tackSpec');
      if (targetValue === 'イン' || targetValue === 'アゥト') {
        methods.setError('pants-tackSpec', {
          type: 'custom',
          message: `タックが${value}ため、空白を選択してください`,
        });
        errorCounts.pantsErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.147
  {
    const value = methods.getValues('pants-loopCount');
    if (value.includes('アジャスタ')) {
      const targetValue = methods.getValues('pants-sidePocket');
      if (targetValue !== 'ナナメ') {
        methods.setError('pants-sidePocket', {
          type: 'custom',
          message: `ループ数が${value}ため、ナナメを選択してください`,
        });
        errorCounts.pantsErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.148
  {
    const value = methods.getValues('pants-loopCount');
    if (value === '脇尾錠(ループ無）') {
      const targetValue = methods.getValues('pants-qiLoop');
      if (targetValue !== '無') {
        methods.setError('pants-qiLoop', {
          type: 'custom',
          message: `ループ数が${value}ため、無を選択してください`,
        });
        errorCounts.pantsErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.152
  {
    const value = methods.getValues('pants-loopCount');
    if (value === '脇尾錠(ループ無）') {
      const targetValue = methods.getValues('pants-plushLoop');
      if (targetValue !== '無') {
        methods.setError('pants-plushLoop', {
          type: 'custom',
          message: `ループ数が${value}ため、無を選択してください`,
        });
        errorCounts.pantsErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.153
  {
    const tests = ['P', 'CT', 'X', 'PT', 'ENKC'];
    const ngs = ['ATJ1709', 'ATJ1710', 'ATJ1711', 'ATJ1712'];

    const value = methods.getValues('basis-fabricProductNo');
    if (tests.some((s) => value.startsWith(s)) || ngs.some((s) => value === s)) {
      const targetValue = methods.getValues('pants-setFinishing');
      if (targetValue !== '無') {
        methods.setError('pants-setFinishing', {
          type: 'custom',
          message: `生地品番が${value}ため、無を選択してください`,
        });
        errorCounts.pantsErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.154
  {
    const value = methods.getValues('pants-setFinishing');
    if (value === '有') {
      const targetValue = methods.getValues('pants-creaseWire');
      if (targetValue !== '有') {
        methods.setError('pants-creaseWire', {
          type: 'custom',
          message: `セット加工が${value}ため、有を選択してください`,
        });
        errorCounts.pantsErrorCount++;
      }
    }
  }
  //#endregion

  return errorCounts;
};

export const validateOrderVest = (methods: UseFormReturn<FieldValues, any, undefined>) => {
  const errorCounts = {
    basisErrorCount: 0,
    jaketErrorCount: 0,
    pantsErrorCount: 0,
    vestErrorCount: 0,
  };
  const { getValues } = methods;

  //#region 必須入力チェック
  {
    const requiredFields = [
      'vest-selectPattern1',
      'vest-selectPattern2',
      'vest-selectPattern3',
      'vest-backLength',
      'vest-bustTop',
      'vest-waistTop',
      'vest-collar',
      'vest-chestPocket',
      'vest-frontButton',
      'vest-waistPocket',
      'vest-backSide',
      'vest-buckle',
      'vest-holeThreadColor',
      'vest-stitch',
      'vest-hole',
      // 'vest-uchiai',
      // 'vest-hanmi',
      // 'vest-kutsumi',
      // 'vest-squareShoulderLeft',
      // 'vest-squareShoulderRight',
      // 'vest-slopingShoulderLeft',
      // 'vest-slopingShoulderRight',
      // 'vest-sickleRaising',
      // 'vest-shoulderWidth',
      // 'vest-buttonPosition',
      // 'vest-frontLength',
    ];
    requiredFields.forEach((field) => {
      if (!getValues(field) || getValues(field) === 'empty') {
        methods.setError(field, {
          type: 'custom',
          message: '必須入力です',
        });
        errorCounts.vestErrorCount++;
      }
    });
    if (0 < errorCounts.vestErrorCount) return errorCounts;
  }
  //#endregion

  //#region No.169
  {
    const value = methods.getValues('vest-frontButton');
    if (value.charAt(0) === 'Ｗ') {
      const targetValue = methods.getValues('vest-collar');
      if (targetValue === 'empty' || targetValue === '衿付き') {
        methods.setError('vest-collar', {
          type: 'custom',
          message: `前ボタンが${value}のため、衿付き以外を選択してください`,
        });
        errorCounts.vestErrorCount++;
      }
    }
    if (value.charAt(0) === 'Ｓ') {
      const targetValue = methods.getValues('vest-collar');
      if (targetValue === 'empty' || targetValue === 'ショールカラー') {
        methods.setError('vest-collar', {
          type: 'custom',
          message: `前ボタンが${value}のため、ショールカラー以外を選択してください`,
        });
        errorCounts.vestErrorCount++;
      }
    }
  }
  //#endregion

  //#region No.176
  {
    const value = methods.getValues('vest-frontButtonHolePosition');
    if (value !== '無') {
      const targetValue = methods.getValues('vest-holeThreadColor');
      if (targetValue === 'empty' || targetValue === '無') {
        methods.setError('vest-holeThreadColor', {
          type: 'custom',
          message: `前ボタン穴配色位置が${value}ではないため、いづれかを選択してください`,
        });
        errorCounts.vestErrorCount++;
      }
    }
  }
  //#endregion

  return errorCounts;
};
