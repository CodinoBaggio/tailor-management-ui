import { FieldValues, UseFormReturn } from 'react-hook-form';

export const validateOrder = (
  methods: UseFormReturn<FieldValues, any, undefined>
) => {
  const basisError = validateOrderBasis(methods);
  const jaketError = validateOrderJaket(methods);
  const pantsError = validateOrderPants(methods);
  const vestError = validateOrderVest(methods);

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
      vestError.basisErrorCount +
        vestError.jaketErrorCount +
        vestError.pantsErrorCount +
        vestError.vestErrorCount ===
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
        basisError.vestErrorCount +
        jaketError.vestErrorCount +
        pantsError.vestErrorCount +
        vestError.vestErrorCount,
    },
  };
};

export const validateOrderBasis = (
  methods: UseFormReturn<FieldValues, any, undefined>
) => {
  const errorCounts = {
    basisErrorCount: 0,
    jaketErrorCount: 0,
    pantsErrorCount: 0,
    vestErrorCount: 0,
  };
  const { getValues } = methods;

  //#region No.9
  {
    const productName = getValues('basis-productName');
    if (productName === 'PT') {
      const brandName = methods.getValues('jaket-brandName');
      if (brandName !== 'empty') {
        methods.setError('jaket-brandName', {
          type: 'custom',
          message: '品名にPTが選択されているため、空白を選択してください。',
        });
        errorCounts.jaketErrorCount++;
      }
      const fabricMark = methods.getValues('jaket-fabricMark');
      if (fabricMark !== 'empty') {
        methods.setError('jaket-fabricMark', {
          type: 'custom',
          message: '品名にPTが選択されているため、空白を選択してください。',
        });
        errorCounts.jaketErrorCount++;
      }
      const inName = methods.getValues('jaket-inName');
      if (inName !== 'empty') {
        methods.setError('jaket-inName', {
          type: 'custom',
          message: '品名にPTが選択されているため、空白を選択してください。',
        });
        errorCounts.jaketErrorCount++;
      }
    }
    if (productName === 'VT') {
      const brandName = methods.getValues('jaket-brandName');
      if (brandName !== 'empty') {
        methods.setError('jaket-brandName', {
          type: 'custom',
          message: '品名にVTが選択されているため、空白を選択してください。',
        });
        errorCounts.jaketErrorCount++;
      }
      const fabricMark = methods.getValues('jaket-fabricMark');
      if (fabricMark !== 'empty') {
        methods.setError('jaket-fabricMark', {
          type: 'custom',
          message: '品名にVTが選択されているため、空白を選択してください。',
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
        if (value !== 'empty') {
          methods.setError('basis-blendRateFabric1', {
            type: 'custom',
            message: '生地品番がTRANDS以外のため、空白を選択してください。',
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
            message: '生地品番がTRANDS以外のため、空白を選択してください。',
          });
          errorCounts.basisErrorCount++;
        }
      }
      // No.15
      {
        const value = methods.getValues('basis-blendRateFabric2');
        if (value !== 'empty') {
          methods.setError('basis-blendRateFabric2', {
            type: 'custom',
            message: '生地品番がTRANDS以外のため、空白を選択してください。',
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
            message: '生地品番がTRANDS以外のため、空白を選択してください。',
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
            message: '生地品番がTRANDS以外のため、空白を選択してください。',
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
            message: '生地品番がTRANDS以外のため、空白を選択してください。',
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
            message: '生地品番がTRANDS以外のため、空白を選択してください。',
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
            message: '生地品番がTRANDS以外のため、空白を選択してください。',
          });
          errorCounts.basisErrorCount++;
        }
      }
    }
  }
  //#endregion

  return errorCounts;
};

export const validateOrderJaket = (
  methods: UseFormReturn<FieldValues, any, undefined>
) => {
  const errorCounts = {
    basisErrorCount: 0,
    jaketErrorCount: 0,
    pantsErrorCount: 0,
    vestErrorCount: 0,
  };
  const { getValues } = methods;

  const totalLength = getValues('jaket-totalLength');
  if (totalLength <= 10) {
    methods.setError('jaket-totalLength', {
      type: 'custom',
      message: '総丈は10以下を入力してください。',
    });
    errorCounts.jaketErrorCount++;
  }

  return errorCounts;
};

export const validateOrderPants = (
  methods: UseFormReturn<FieldValues, any, undefined>
) => {
  const errorCounts = {
    basisErrorCount: 0,
    jaketErrorCount: 0,
    pantsErrorCount: 0,
    vestErrorCount: 0,
  };
  const { getValues } = methods;

  const totalLength = getValues('jaket-totalLength');
  if (totalLength < 10) {
    methods.setError('jaket-totalLength', {
      type: 'custom',
      message: '総丈は10以下を入力してください。',
    });
    errorCounts.pantsErrorCount++;
  }

  return errorCounts;
};

export const validateOrderVest = (
  methods: UseFormReturn<FieldValues, any, undefined>
) => {
  const errorCounts = {
    basisErrorCount: 0,
    jaketErrorCount: 0,
    pantsErrorCount: 0,
    vestErrorCount: 0,
  };
  const { getValues } = methods;

  const totalLength = getValues('jaket-totalLength');
  if (totalLength < 10) {
    methods.setError('jaket-totalLength', {
      type: 'custom',
      message: '総丈は10以下を入力してください。',
    });
    errorCounts.vestErrorCount++;
  }

  return errorCounts;
};
