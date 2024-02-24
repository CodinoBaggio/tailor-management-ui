import { FieldValues, UseFormReturn } from 'react-hook-form';
import {
  OrderBasisType,
  OrderJaketType,
  OrderPantsType,
  OrderVestType,
} from '../types/order';
import dayjs from 'dayjs';

export const bindOrderBasisValues = (
  methods: UseFormReturn<FieldValues, any, undefined>,
  order: OrderBasisType
) => {
  methods.setValue('basis-orderId', order.orderId || '');
  methods.setValue('basis-shopId', order.shopId || '');
  methods.setValue('basis-seq', order.seq || NaN);
  methods.setValue('basis-orderStatus', order.orderStatus || '');
  methods.setValue('basis-inputDate', dayjs(order.inputDate) || dayjs());
  methods.setValue(
    'basis-orderDateTime',
    dayjs(order.orderDateTime) || dayjs()
  );
  methods.setValue('basis-shipDate', dayjs(order.shipDate) || dayjs());
  methods.setValue('basis-customerName', order.customerName || '');
  methods.setValue('basis-productName', order.productName || '');
  methods.setValue('basis-fabricMaker', order.fabricMaker || '');
  methods.setValue('basis-fabricProductNo', order.fabricProductNo || '');
  methods.setValue('basis-yield', order.yield || NaN);
  methods.setValue('basis-blendRateFabric1', order.blendRateFabric1 || '');
  methods.setValue('basis-blendRate1', order.blendRate1 || NaN);
  methods.setValue('basis-blendRateFabric2', order.blendRateFabric2 || '');
  methods.setValue('basis-blendRate2', order.blendRate2 || NaN);
  methods.setValue('basis-blendRateFabric3', order.blendRateFabric3 || '');
  methods.setValue('basis-blendRate3', order.blendRate3 || NaN);
  methods.setValue('basis-blendRateFabric4', order.blendRateFabric4 || '');
  methods.setValue('basis-blendRate4', order.blendRate4 || NaN);
  methods.setValue('basis-inputUserId', order.inputUserId || '');
  methods.setValue('basis-isDelete', order.isDelete || false);
  methods.setValue(
    'basis-createDateTime',
    dayjs(order.createDateTime) || dayjs()
  );
  methods.setValue('basis-createUserId', order.createUserId || '');
  methods.setValue(
    'basis-updateDateTime',
    dayjs(order.updateDateTime) || dayjs()
  );
  methods.setValue('basis-updateUserId', order.updateUserId || '');
};

export const bindOrderJaketValues = (
  methods: UseFormReturn<FieldValues, any, undefined>,
  order: OrderJaketType
) => {
  methods.setValue('jaket-jaketOrderId', order.jaketOrderId || '');
  methods.setValue('jaket-orderId', order.orderId || '');
  methods.setValue('jaket-selectPattern1', order.selectPattern1 || 'TR1');
  methods.setValue('jaket-selectPattern2', order.selectPattern2 || '');
  methods.setValue('jaket-selectPattern3', order.selectPattern3 || '');
  methods.setValue('jaket-totalLength', order.totalLength || NaN);
  methods.setValue('jaket-jaketLength', order.jaketLength || NaN);
  methods.setValue('jaket-shoulderWidth', order.shoulderWidth || NaN);
  methods.setValue('jaket-sleeveLengthLeft', order.sleeveLengthLeft || NaN);
  methods.setValue('jaket-sleeveLengthRight', order.sleeveLengthRight || NaN);
  methods.setValue('jaket-bust', order.bust);
  methods.setValue('jaket-waist', order.waist || NaN);
  methods.setValue('jaket-bustTop', order.bustTop || NaN);
  methods.setValue('jaket-waistTop', order.waistTop || NaN);
  methods.setValue('jaket-canvas', order.canvas || '');
  methods.setValue('jaket-shoulderType', order.shoulderType || '');
  methods.setValue('jaket-collarType', order.collarType || '');
  methods.setValue('jaket-frontButton', order.frontButton || '');
  methods.setValue('jaket-collarWidth', order.collarWidth || '');
  methods.setValue('jaket-sleeveButton', order.sleeveButton || '');
  methods.setValue('jaket-sleeveOpening', order.sleeveOpening || '');
  methods.setValue('jaket-chestPocket', order.chestPocket || '');
  methods.setValue('jaket-sewingMethod', order.sewingMethod || '');
  methods.setValue('jaket-frontCut', order.frontCut || '');
  methods.setValue('jaket-labelSatinFabric', order.labelSatinFabric || '');
  methods.setValue('jaket-stitch', order.stitch || '');
  methods.setValue('jaket-stitchLocation', order.stitchLocation || '');
  methods.setValue('jaket-pinpointStitch', order.pinpointStitch || '');
  methods.setValue(
    'jaket-pinpointStitchThreadColor',
    order.pinpointStitchThreadColor || ''
  );
  methods.setValue(
    'jaket-chestBoxSatinFabric',
    order.chestBoxSatinFabric || ''
  );
  methods.setValue('jaket-waistPocket', order.waistPocket || '');
  methods.setValue('jaket-flapWidth', order.flapWidth || NaN);
  methods.setValue('jaket-changePocket', order.changePocket || '');
  methods.setValue('jaket-secretPocket', order.secretPocket || '');
  methods.setValue('jaket-backSpec', order.backSpec || '');
  methods.setValue('jaket-daiba', order.daiba || '');
  methods.setValue('jaket-insidePocket', order.insidePocket || '');
  methods.setValue('jaket-penPocket', order.penPocket || '');
  methods.setValue('jaket-ticketPocket', order.ticketPocket || '');
  methods.setValue('jaket-pat', order.pat || NaN);
  methods.setValue('jaket-lining', order.lining || '');
  methods.setValue('jaket-collarBack', order.collarBack || '');
  methods.setValue('jaket-vents', order.vents || '');
  methods.setValue('jaket-inName', order.inName || '');
  methods.setValue('jaket-nameFont', order.nameFont || '');
  methods.setValue('jaket-namePosition', order.namePosition || '');
  methods.setValue('jaket-nameColor', order.nameColor || '');
  methods.setValue('jaket-name', order.name || '');
  methods.setValue('jaket-labelHole', order.labelHole || '');
  methods.setValue('jaket-stitchThreadColor', order.stitchThreadColor || '');
  methods.setValue('jaket-labelThreadColor', order.labelThreadColor || '');
  methods.setValue(
    'jaket-frontButtonThreadColor',
    order.frontButtonThreadColor || ''
  );
  methods.setValue(
    'jaket-sleeveButtonThreadColor',
    order.sleeveButtonThreadColor || ''
  );
  methods.setValue('jaket-brandName', order.brandName || '');
  methods.setValue('jaket-fabricMark', order.fabricMark || '');
  methods.setValue('jaket-buttonProductNo', order.buttonProductNo || '');
  methods.setValue('jaket-sleeveOpeningTape', order.sleeveOpeningTape || '');
  methods.setValue('jaket-sleeveElbowPatch', order.sleeveElbowPatch || '');
  methods.setValue('jaket-hole', order.hole || '');
  methods.setValue(
    'jaket-sleeveButtonHoleColor',
    order.sleeveButtonHoleColor || ''
  );
  methods.setValue('jaket-uchiai', order.uchiai || NaN);
  methods.setValue('jaket-hanmi', order.hanmi || NaN);
  methods.setValue('jaket-kutsumi', order.kutsumi || NaN);
  methods.setValue('jaket-squareShoulderLeft', order.squareShoulderLeft || NaN);
  methods.setValue('jaket-squareShoulderRight', order.squareShoulderRight || NaN);
  methods.setValue('jaket-slopingShoulderLeft', order.slopingShoulderLeft || NaN);
  methods.setValue(
    'jaket-slopingShoulderRight',
    order.slopingShoulderRight || NaN
  );
  methods.setValue('jaket-totsuRyo', order.totsuRyo || NaN);
  methods.setValue('jaket-hip', order.hip || NaN);
  methods.setValue('jaket-frontLength', order.frontLength || NaN);
  methods.setValue('jaket-frontSleeveHem', order.frontSleeveHem || NaN);
  methods.setValue('jaket-ahFrontOpening', order.ahFrontOpening || NaN);
  methods.setValue('jaket-sleeveOpeningWidth', order.sleeveOpeningWidth || NaN);
  methods.setValue('jaket-collarMitsu', order.collarMitsu || NaN);
  methods.setValue('jaket-collarShift', order.collarShift || NaN);
  methods.setValue('jaket-buttonPosition', order.buttonPosition || NaN);
  methods.setValue('jaket-backCurve', order.backCurve || NaN);
  methods.setValue('jaket-sickleRaising', order.sickleRaising || NaN);
  methods.setValue('jaket-sleeveWidth', order.sleeveWidth || NaN);
  methods.setValue('jaket-backWidth', order.backWidth || NaN);
  methods.setValue('jaket-sleeveBack', order.sleeveBack || '');
  methods.setValue('jaket-isDelete', order.isDelete || false);
  methods.setValue(
    'jaket-createDateTime',
    dayjs(order.createDateTime) || dayjs()
  );
  methods.setValue('jaket-createUserId', order.createUserId || '');
  methods.setValue(
    'jaket-updateDateTime',
    dayjs(order.updateDateTime) || dayjs()
  );
  methods.setValue('jaket-updateUserId', order.updateUserId || '');
};

export const bindOrderPantsValues = (
  methods: UseFormReturn<FieldValues, any, undefined>,
  order: OrderPantsType
) => {
  methods.setValue('pants-pantsOrderId', order.pantsOrderId || '');
  methods.setValue('pants-orderId', order.orderId || '');
  methods.setValue('pants-selectPattern1', order.selectPattern1 || '');
  methods.setValue('pants-selectPattern2', order.selectPattern2 || '');
  methods.setValue('pants-selectPattern3', order.selectPattern3 || '');
  methods.setValue('pants-waist', order.waist || NaN);
  methods.setValue('pants-hip', order.hip || NaN);
  methods.setValue('pants-hipTop', order.hipTop || NaN);
  methods.setValue('pants-rise', order.rise || NaN);
  methods.setValue('pants-inseamLeft', order.inseamLeft || NaN);
  methods.setValue('pants-inseamRight', order.inseamRight || NaN);
  methods.setValue('pants-crossingWidth', order.crossingWidth || NaN);
  methods.setValue('pants-kneeWidth', order.kneeWidth || NaN);
  methods.setValue('pants-hemOpening', order.hemOpening || NaN);
  methods.setValue('pants-tack', order.tack || '');
  methods.setValue('pants-sidePocket', order.sidePocket || '');
  methods.setValue('pants-foldedHem', order.foldedHem || '');
  methods.setValue('pants-secretPocket', order.secretPocket || '');
  methods.setValue('pants-kneeBack', order.kneeBack || '');
  methods.setValue('pants-holeThreadColor', order.holeThreadColor || '');
  methods.setValue('pants-amfStitch', order.amfStitch || '');
  methods.setValue('pants-sideAmf', order.sideAmf || '');
  methods.setValue('pants-stitchThreadColor', order.stitchThreadColor || '');
  methods.setValue('pants-kneepadColor', order.kneepadColor || '');
  methods.setValue('pants-tackSpec', order.tackSpec || '');
  methods.setValue('pants-sideSatinFabric', order.sideSatinFabric || '');
  methods.setValue('pants-pisPocketJadeGreen', order.pisPocketJadeGreen || '');
  methods.setValue('pants-pisPocket', order.pisPocket || '');
  methods.setValue('pants-plaket', order.plaket || '');
  methods.setValue('pants-buttocks', order.buttocks || NaN);
  methods.setValue('pants-flatButt', order.flatButt || NaN);
  methods.setValue('pants-frontRise', order.frontRise || NaN);
  methods.setValue('pants-backRise', order.backRise || NaN);
  methods.setValue('pants-wedgie', order.wedgie || NaN);
  methods.setValue('pants-pancherina', order.pancherina || '');
  methods.setValue('pants-loopCount', order.loopCount || '');
  methods.setValue('pants-qiLoop', order.qiLoop || '');
  methods.setValue('pants-hole', order.hole || '');
  methods.setValue('pants-chic', order.chic || '');
  methods.setValue('pants-loopAdd', order.loopAdd || '');
  methods.setValue('pants-plushLoop', order.plushLoop || '');
  methods.setValue('pants-setFinishing', order.setFinishing || '');
  methods.setValue('pants-creaseWire', order.creaseWire || '');
  methods.setValue('pants-buttholeTape', order.buttholeTape || '');
  methods.setValue('pants-isDelete', order.isDelete || false);
  methods.setValue(
    'pants-createDateTime',
    dayjs(order.createDateTime) || dayjs()
  );
  methods.setValue('pants-createUserId', order.createUserId || '');
  methods.setValue(
    'pants-updateDateTime',
    dayjs(order.updateDateTime) || dayjs()
  );
  methods.setValue('pants-updateUserId', order.updateUserId || '');
};

export const bindOrderVestValues = (
  methods: UseFormReturn<FieldValues, any, undefined>,
  order: OrderVestType
) => {
  methods.setValue('vest-vestOrderId', order.vestOrderId || '');
  methods.setValue('vest-orderId', order.orderId || '');
  methods.setValue('vest-selectPattern1', order.selectPattern1 || '');
  methods.setValue('vest-selectPattern2', order.selectPattern2 || '');
  methods.setValue('vest-selectPattern3', order.selectPattern3 || '');
  methods.setValue('vest-backLength', order.backLength || NaN);
  methods.setValue('vest-bustTop', order.bustTop || NaN);
  methods.setValue('vest-waistTop', order.waistTop || NaN);
  methods.setValue('vest-collar', order.collar || '');
  methods.setValue('vest-chestPocket', order.chestPocket || '');
  methods.setValue('vest-frontButton', order.frontButton || '');
  methods.setValue(
    'vest-frontButtonHolePosition',
    order.frontButtonHolePosition || ''
  );
  methods.setValue('vest-waistPocket', order.waistPocket || '');
  methods.setValue('vest-backSide', order.backSide || '');
  methods.setValue('vest-buckle', order.buckle || '');
  methods.setValue('vest-holeThreadColor', order.holeThreadColor || '');
  methods.setValue('vest-stitch', order.stitch || '');
  methods.setValue('vest-hole', order.hole || '');
  methods.setValue('vest-uchiai', order.uchiai || NaN);
  methods.setValue('vest-hanmi', order.hanmi || NaN);
  methods.setValue('vest-kutsumi', order.kutsumi || NaN);
  methods.setValue('vest-squareShoulderLeft', order.squareShoulderLeft || NaN);
  methods.setValue('vest-squareShoulderRight', order.squareShoulderRight || NaN);
  methods.setValue('vest-slopingShoulderLeft', order.slopingShoulderLeft || NaN);
  methods.setValue(
    'vest-slopingShoulderRight',
    order.slopingShoulderRight || NaN
  );
  methods.setValue('vest-sickleRaising', order.sickleRaising || NaN);
  methods.setValue('vest-shoulderWidth', order.shoulderWidth || NaN);
  methods.setValue('vest-buttonPosition', order.buttonPosition || NaN);
  methods.setValue('vest-frontLength', order.frontLength || NaN);
  methods.setValue('vest-isDelete', order.isDelete || false);
  methods.setValue(
    'vest-createDateTime',
    dayjs(order.createDateTime) || dayjs()
  );
  methods.setValue('vest-createUserId', order.createUserId || '');
  methods.setValue(
    'vest-updateDateTime',
    dayjs(order.updateDateTime) || dayjs()
  );
  methods.setValue('vest-updateUserId', order.updateUserId || '');
};

export const createDefaultOrderValues = (user: any) => {
  // 新規オーダーの場合は、デフォルト値を設定する
  const defaultOrderJaket: OrderJaketType = {
    jaketOrderId: '',
    orderId: '',
    selectPattern1: '',
    selectPattern2: '',
    selectPattern3: '',
    totalLength: NaN,
    jaketLength: NaN,
    shoulderWidth: NaN,
    sleeveLengthLeft: NaN,
    sleeveLengthRight: NaN,
    bust: NaN,
    waist: NaN,
    bustTop: NaN,
    waistTop: NaN,
    canvas: '薄毛芯',
    shoulderType: '正常肩',
    collarType: 'ノッチ',
    frontButton: '',
    collarWidth: '',
    sleeveButton: '袖4釦キッシング',
    sleeveOpening: '開き見せ',
    chestPocket: 'バルカ',
    sewingMethod: 'ラベル毛芯',
    frontCut: 'ユニバーサル',
    labelSatinFabric: '生地',
    stitch: '',
    stitchLocation: '',
    pinpointStitch: '無',
    pinpointStitchThreadColor: '無',
    chestBoxSatinFabric: '生地',
    waistPocket: 'フラップ付き両玉',
    flapWidth: 5.0,
    changePocket: '無',
    secretPocket: '右のみ',
    backSpec: '',
    daiba: '角台場',
    insidePocket: '右三角フタ',
    penPocket: '有',
    ticketPocket: '無',
    pat: 0.5,
    lining: '',
    collarBack: '生地色',
    vents: '',
    inName: '有',
    nameFont: 'ローマ字（筆）',
    namePosition: 'タバコポケット上',
    nameColor: 'M3',
    name: '',
    labelHole: '左側',
    stitchThreadColor: '生地色',
    labelThreadColor: '生地色',
    frontButtonThreadColor: '生地色',
    sleeveButtonThreadColor: '生地色',
    brandName: '',
    fabricMark: '',
    buttonProductNo: '',
    sleeveOpeningTape: '無',
    sleeveElbowPatch: '無',
    hole: 'ミシン',
    sleeveButtonHoleColor: '無',
    uchiai: NaN,
    hanmi: NaN,
    kutsumi: NaN,
    squareShoulderLeft: NaN,
    squareShoulderRight: NaN,
    slopingShoulderLeft: NaN,
    slopingShoulderRight: NaN,
    totsuRyo: NaN,
    hip: NaN,
    frontLength: NaN,
    frontSleeveHem: NaN,
    ahFrontOpening: NaN,
    sleeveOpeningWidth: NaN,
    collarMitsu: NaN,
    collarShift: NaN,
    buttonPosition: NaN,
    backCurve: NaN,
    sickleRaising: NaN,
    sleeveWidth: NaN,
    backWidth: NaN,
    sleeveBack: '',
    remark: '',
    isDelete: false,
    createDateTime: dayjs(),
    createUserId: user.loginId,
    updateDateTime: dayjs(),
    updateUserId: user.loginId,
  };
  const defaultOrderPants: OrderPantsType = {
    pantsOrderId: '',
    orderId: '',
    selectPattern1: 'TR1P',
    selectPattern2: '',
    selectPattern3: '',
    waist: NaN,
    hip: NaN,
    hipTop: NaN,
    rise: NaN,
    inseamLeft: NaN,
    inseamRight: NaN,
    crossingWidth: NaN,
    kneeWidth: NaN,
    hemOpening: NaN,
    tack: '0本',
    sidePocket: 'ナナメ',
    foldedHem: '',
    secretPocket: '右のみ',
    kneeBack: '前膝裏',
    holeThreadColor: '生地色',
    amfStitch: '無',
    sideAmf: '無',
    stitchThreadColor: '',
    kneepadColor: '生地色',
    tackSpec: '',
    sideSatinFabric: '生地',
    pisPocketJadeGreen: '両玉',
    pisPocket: '左ボタン止め',
    plaket: '三角',
    buttocks: NaN,
    flatButt: NaN,
    frontRise: NaN,
    backRise: NaN,
    wedgie: NaN,
    pancherina: '無',
    loopCount: '6本',
    qiLoop: '有',
    hole: 'ミシン',
    chic: '有り',
    loopAdd: 'TOP',
    plushLoop: '有',
    setFinishing: '無',
    creaseWire: '有',
    buttholeTape: '無',
    remark: '',
    isDelete: false,
    createDateTime: dayjs(),
    createUserId: user.loginId,
    updateDateTime: dayjs(),
    updateUserId: user.loginId,
  };
  const defaultOrderVest: OrderVestType = {
    vestOrderId: '',
    orderId: '',
    selectPattern1: 'TR1V',
    selectPattern2: '',
    selectPattern3: '',
    backLength: NaN,
    bustTop: NaN,
    waistTop: NaN,
    collar: 'Ｖカット',
    chestPocket: '無',
    frontButton: '',
    frontButtonHolePosition: '無',
    waistPocket: '腰Ｐ箱',
    backSide: '裏地',
    buckle: '有',
    holeThreadColor: '生地色',
    stitch: '',
    hole: 'ミシン',
    uchiai: NaN,
    hanmi: NaN,
    kutsumi: NaN,
    squareShoulderLeft: NaN,
    squareShoulderRight: NaN,
    slopingShoulderLeft: NaN,
    slopingShoulderRight: NaN,
    sickleRaising: NaN,
    shoulderWidth: NaN,
    buttonPosition: NaN,
    frontLength: NaN,
    remark: '',
    isDelete: false,
    createDateTime: dayjs(),
    createUserId: user.loginId,
    updateDateTime: dayjs(),
    updateUserId: user.loginId,
  };
  const defaultOrderBasis: OrderBasisType = {
    orderId: '',
    shopId: '',
    seq: 0,
    orderStatus: '保存',
    inputDate: dayjs(),
    orderDateTime: dayjs(),
    shipDate: dayjs(),
    customerName: '',
    productName: '',
    fabricMaker: '',
    fabricProductNo: '',
    yield: NaN,
    blendRateFabric1: '',
    blendRate1: NaN,
    blendRateFabric2: '',
    blendRate2: NaN,
    blendRateFabric3: '',
    blendRate3: NaN,
    blendRateFabric4: '',
    blendRate4: NaN,
    inputUserId: user.loginId,
    remark: '',
    isDelete: false,
    createDateTime: dayjs(),
    createUserId: user.loginId,
    updateDateTime: dayjs(),
    updateUserId: user.loginId,
    jaket: defaultOrderJaket,
    pants: defaultOrderPants,
    vest: defaultOrderVest,
  };
  return defaultOrderBasis;
};

export const setOrderObject = (
  methods: UseFormReturn<FieldValues, any, undefined>
): OrderBasisType => {
  return {
    orderId: methods.getValues('basis-orderId'),
    shopId: methods.getValues('basis-shopId'),
    orderStatus: '発注済み',
    inputDate: methods.getValues('basis-inputDate'),
    orderDateTime: methods.getValues('basis-orderDateTime'),
    shipDate: methods.getValues('basis-shipDate'),
    customerName: methods.getValues('basis-customerName'),
    productName: methods.getValues('basis-productName'),
    fabricMaker: methods.getValues('basis-fabricMaker'),
    fabricProductNo: methods.getValues('basis-fabricProductNo'),
    yield: methods.getValues('basis-yield'),
    blendRateFabric1: methods.getValues('basis-blendRateFabric1'),
    blendRate1: methods.getValues('basis-blendRate1'),
    blendRateFabric2: methods.getValues('basis-blendRateFabric2'),
    blendRate2: methods.getValues('basis-blendRate2'),
    blendRateFabric3: methods.getValues('basis-blendRateFabric3'),
    blendRate3: methods.getValues('basis-blendRate3'),
    blendRateFabric4: methods.getValues('basis-blendRateFabric4'),
    blendRate4: methods.getValues('basis-blendRate4'),
    inputUserId: methods.getValues('basis-inputUserId'),
    remark: methods.getValues('basis-remark'),
    isDelete: methods.getValues('basis-isDelete'),
    createDateTime: methods.getValues('basis-createDateTime'),
    createUserId: methods.getValues('basis-createUserId'),
    updateDateTime: methods.getValues('basis-updateDateTime'),
    updateUserId: methods.getValues('basis-updateUserId'),
    jaket: {
      jaketOrderId: methods.getValues('jaket-jaketOrderId'),
      orderId: methods.getValues('jaket-orderId'),
      selectPattern1: methods.getValues('jaket-selectPattern1'),
      selectPattern2: methods.getValues('jaket-selectPattern2'),
      selectPattern3: methods.getValues('jaket-selectPattern3'),
      totalLength: methods.getValues('jaket-totalLength'),
      jaketLength: methods.getValues('jaket-jaketLength'),
      shoulderWidth: methods.getValues('jaket-shoulderWidth'),
      sleeveLengthLeft: methods.getValues('jaket-sleeveLengthLeft'),
      sleeveLengthRight: methods.getValues('jaket-sleeveLengthRight'),
      bust: methods.getValues('jaket-bust'),
      waist: methods.getValues('jaket-waist'),
      bustTop: methods.getValues('jaket-bustTop'),
      waistTop: methods.getValues('jaket-waistTop'),
      canvas: methods.getValues('jaket-canvas'),
      shoulderType: methods.getValues('jaket-shoulderType'),
      collarType: methods.getValues('jaket-collarType'),
      frontButton: methods.getValues('jaket-frontButton'),
      collarWidth: methods.getValues('jaket-collarWidth'),
      sleeveButton: methods.getValues('jaket-sleeveButton'),
      sleeveOpening: methods.getValues('jaket-sleeveOpening'),
      chestPocket: methods.getValues('jaket-chestPocket'),
      sewingMethod: methods.getValues('jaket-sewingMethod'),
      frontCut: methods.getValues('jaket-frontCut'),
      labelSatinFabric: methods.getValues('jaket-labelSatinFabric'),
      stitch: methods.getValues('jaket-stitch'),
      stitchLocation: methods.getValues('jaket-stitchLocation'),
      pinpointStitch: methods.getValues('jaket-pinpointStitch'),
      pinpointStitchThreadColor: methods.getValues(
        'jaket-pinpointStitchThreadColor'
      ),
      chestBoxSatinFabric: methods.getValues('jaket-chestBoxSatinFabric'),
      waistPocket: methods.getValues('jaket-waistPocket'),
      flapWidth: methods.getValues('jaket-flapWidth'),
      changePocket: methods.getValues('jaket-changePocket'),
      secretPocket: methods.getValues('jaket-secretPocket'),
      backSpec: methods.getValues('jaket-backSpec'),
      daiba: methods.getValues('jaket-daiba'),
      insidePocket: methods.getValues('jaket-insidePocket'),
      penPocket: methods.getValues('jaket-penPocket'),
      ticketPocket: methods.getValues('jaket-ticketPocket'),
      pat: methods.getValues('jaket-pat'),
      lining: methods.getValues('jaket-lining'),
      collarBack: methods.getValues('jaket-collarBack'),
      vents: methods.getValues('jaket-vents'),
      inName: methods.getValues('jaket-inName'),
      nameFont: methods.getValues('jaket-nameFont'),
      namePosition: methods.getValues('jaket-namePosition'),
      nameColor: methods.getValues('jaket-nameColor'),
      name: methods.getValues('jaket-name'),
      labelHole: methods.getValues('jaket-labelHole'),
      stitchThreadColor: methods.getValues('jaket-stitchThreadColor'),
      labelThreadColor: methods.getValues('jaket-labelThreadColor'),
      frontButtonThreadColor: methods.getValues('jaket-frontButtonThreadColor'),
      sleeveButtonThreadColor: methods.getValues(
        'jaket-sleeveButtonThreadColor'
      ),
      brandName: methods.getValues('jaket-brandName'),
      fabricMark: methods.getValues('jaket-fabricMark'),
      buttonProductNo: methods.getValues('jaket-buttonProductNo'),
      sleeveOpeningTape: methods.getValues('jaket-sleeveOpeningTape'),
      sleeveElbowPatch: methods.getValues('jaket-sleeveElbowPatch'),
      hole: methods.getValues('jaket-hole'),
      sleeveButtonHoleColor: methods.getValues('jaket-sleeveButtonHoleColor'),
      uchiai: methods.getValues('jaket-uchiai'),
      hanmi: methods.getValues('jaket-hanmi'),
      kutsumi: methods.getValues('jaket-kutsumi'),
      squareShoulderLeft: methods.getValues('jaket-squareShoulderLeft'),
      squareShoulderRight: methods.getValues('jaket-squareShoulderRight'),
      slopingShoulderLeft: methods.getValues('jaket-slopingShoulderLeft'),
      slopingShoulderRight: methods.getValues('jaket-slopingShoulderRight'),
      totsuRyo: methods.getValues('jaket-totsuRyo'),
      hip: methods.getValues('jaket-hip'),
      frontLength: methods.getValues('jaket-frontLength'),
      frontSleeveHem: methods.getValues('jaket-frontSleeveHem'),
      ahFrontOpening: methods.getValues('jaket-ahFrontOpening'),
      sleeveOpeningWidth: methods.getValues('jaket-sleeveOpeningWidth'),
      collarMitsu: methods.getValues('jaket-collarMitsu'),
      collarShift: methods.getValues('jaket-collarShift'),
      buttonPosition: methods.getValues('jaket-buttonPosition'),
      backCurve: methods.getValues('jaket-backCurve'),
      sickleRaising: methods.getValues('jaket-sickleRaising'),
      sleeveWidth: methods.getValues('jaket-sleeveWidth'),
      backWidth: methods.getValues('jaket-backWidth'),
      sleeveBack: methods.getValues('jaket-sleeveBack'),
      remark: methods.getValues('jaket-remark'),
      isDelete: methods.getValues('jaket-isDelete'),
      createDateTime: methods.getValues('jaket-createDateTime'),
      createUserId: methods.getValues('jaket-createUserId'),
      updateDateTime: methods.getValues('jaket-updateDateTime'),
      updateUserId: methods.getValues('jaket-updateUserId'),
    },
    pants: {
      pantsOrderId: methods.getValues('pants-pantsOrderId'),
      orderId: methods.getValues('pants-orderId'),
      selectPattern1: methods.getValues('pants-selectPattern1'),
      selectPattern2: methods.getValues('pants-selectPattern2'),
      selectPattern3: methods.getValues('pants-selectPattern3'),
      waist: methods.getValues('pants-waist'),
      hip: methods.getValues('pants-hip'),
      hipTop: methods.getValues('pants-hipTop'),
      rise: methods.getValues('pants-rise'),
      inseamLeft: methods.getValues('pants-inseamLeft'),
      inseamRight: methods.getValues('pants-inseamRight'),
      crossingWidth: methods.getValues('pants-crossingWidth'),
      kneeWidth: methods.getValues('pants-kneeWidth'),
      hemOpening: methods.getValues('pants-hemOpening'),
      tack: methods.getValues('pants-tack'),
      sidePocket: methods.getValues('pants-sidePocket'),
      foldedHem: methods.getValues('pants-foldedHem'),
      secretPocket: methods.getValues('pants-secretPocket'),
      kneeBack: methods.getValues('pants-kneeBack'),
      holeThreadColor: methods.getValues('pants-holeThreadColor'),
      amfStitch: methods.getValues('pants-amfStitch'),
      sideAmf: methods.getValues('pants-sideAmf'),
      stitchThreadColor: methods.getValues('pants-stitchThreadColor'),
      kneepadColor: methods.getValues('pants-kneepadColor'),
      tackSpec: methods.getValues('pants-tackSpec'),
      sideSatinFabric: methods.getValues('pants-sideSatinFabric'),
      pisPocketJadeGreen: methods.getValues('pants-pisPocketJadeGreen'),
      pisPocket: methods.getValues('pants-pisPocket'),
      plaket: methods.getValues('pants-plaket'),
      buttocks: methods.getValues('pants-buttocks'),
      flatButt: methods.getValues('pants-flatButt'),
      frontRise: methods.getValues('pants-frontRise'),
      backRise: methods.getValues('pants-backRise'),
      wedgie: methods.getValues('pants-wedgie'),
      pancherina: methods.getValues('pants-pancherina'),
      loopCount: methods.getValues('pants-loopCount'),
      qiLoop: methods.getValues('pants-qiLoop'),
      hole: methods.getValues('pants-hole'),
      chic: methods.getValues('pants-chic'),
      loopAdd: methods.getValues('pants-loopAdd'),
      plushLoop: methods.getValues('pants-plushLoop'),
      setFinishing: methods.getValues('pants-setFinishing'),
      creaseWire: methods.getValues('pants-creaseWire'),
      buttholeTape: methods.getValues('pants-buttholeTape'),
      remark: methods.getValues('pants-remark'),
      isDelete: methods.getValues('pants-isDelete'),
      createDateTime: methods.getValues('pants-createDateTime'),
      createUserId: methods.getValues('pants-createUserId'),
      updateDateTime: methods.getValues('pants-updateDateTime'),
      updateUserId: methods.getValues('pants-updateUserId'),
    },
    vest: {
      vestOrderId: methods.getValues('vest-vestOrderId'),
      orderId: methods.getValues('vest-orderId'),
      selectPattern1: methods.getValues('vest-selectPattern1'),
      selectPattern2: methods.getValues('vest-selectPattern2'),
      selectPattern3: methods.getValues('vest-selectPattern3'),
      backLength: methods.getValues('vest-backLength'),
      bustTop: methods.getValues('vest-bustTop'),
      waistTop: methods.getValues('vest-waistTop'),
      collar: methods.getValues('vest-collar'),
      chestPocket: methods.getValues('vest-chestPocket'),
      frontButton: methods.getValues('vest-frontButton'),
      frontButtonHolePosition: methods.getValues(
        'vest-frontButtonHolePosition'
      ),
      waistPocket: methods.getValues('vest-waistPocket'),
      backSide: methods.getValues('vest-backSide'),
      buckle: methods.getValues('vest-buckle'),
      holeThreadColor: methods.getValues('vest-holeThreadColor'),
      stitch: methods.getValues('vest-stitch'),
      hole: methods.getValues('vest-hole'),
      uchiai: methods.getValues('vest-uchiai'),
      hanmi: methods.getValues('vest-hanmi'),
      kutsumi: methods.getValues('vest-kutsumi'),
      squareShoulderLeft: methods.getValues('vest-squareShoulderLeft'),
      squareShoulderRight: methods.getValues('vest-squareShoulderRight'),
      slopingShoulderLeft: methods.getValues('vest-slopingShoulderLeft'),
      slopingShoulderRight: methods.getValues('vest-slopingShoulderRight'),
      sickleRaising: methods.getValues('vest-sickleRaising'),
      shoulderWidth: methods.getValues('vest-shoulderWidth'),
      buttonPosition: methods.getValues('vest-buttonPosition'),
      frontLength: methods.getValues('vest-frontLength'),
      remark: methods.getValues('vest-remark'),
      isDelete: methods.getValues('vest-isDelete'),
      createDateTime: methods.getValues('vest-createDateTime'),
      createUserId: methods.getValues('vest-createUserId'),
      updateDateTime: methods.getValues('vest-updateDateTime'),
      updateUserId: methods.getValues('vest-updateUserId'),
    },
  };
};
