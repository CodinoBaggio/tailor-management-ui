import { FieldValues, UseFormReturn } from 'react-hook-form';
import {
  OrderBasisType,
  OrderJaketType,
  OrderPantsType,
  OrderVestType,
} from '../types/order';
import dayjs from 'dayjs';
// import { toDateTimeString } from '../../../utils/util';

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
  methods.setValue('basis-inputUserName', order.inputUserName || '');
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
  methods.setValue('jaket-pat', order.pat || '');
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
  methods.setValue(
    'jaket-squareShoulderRight',
    order.squareShoulderRight || NaN
  );
  methods.setValue(
    'jaket-slopingShoulderLeft',
    order.slopingShoulderLeft || NaN
  );
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
  methods.setValue(
    'vest-squareShoulderRight',
    order.squareShoulderRight || NaN
  );
  methods.setValue(
    'vest-slopingShoulderLeft',
    order.slopingShoulderLeft || NaN
  );
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
    orderId: 'new',
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
    frontButton: 'empty',
    collarWidth: 'empty',
    sleeveButton: '袖4釦キッシング',
    sleeveOpening: '開き見せ',
    chestPocket: 'バルカ',
    sewingMethod: 'ラベル毛芯',
    frontCut: 'ユニバーサル',
    labelSatinFabric: '生地',
    stitch: 'empty',
    stitchLocation: 'empty',
    pinpointStitch: '無',
    pinpointStitchThreadColor: '無',
    chestBoxSatinFabric: '生地',
    waistPocket: 'フラップ付き両玉',
    flapWidth: 5.0,
    changePocket: '無',
    secretPocket: '右のみ',
    backSpec: 'empty',
    daiba: '角台場',
    insidePocket: '右三角フタ',
    penPocket: '有',
    ticketPocket: '無',
    pat: '0.5',
    lining: '',
    collarBack: '生地色',
    vents: 'empty',
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
    brandName: 'empty',
    fabricMark: 'empty',
    buttonProductNo: 'empty',
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
    sleeveBack: 'empty',
    remark: '',
    isDelete: false,
    createDateTime: dayjs(),
    createUserId: user.loginId,
    updateDateTime: dayjs(),
    updateUserId: user.loginId,
  };
  const defaultOrderPants: OrderPantsType = {
    pantsOrderId: '',
    orderId: 'new',
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
    foldedHem: 'empty',
    secretPocket: '右のみ',
    kneeBack: '前膝裏',
    holeThreadColor: '生地色',
    amfStitch: '無',
    sideAmf: '無',
    stitchThreadColor: 'empty',
    kneepadColor: '生地色',
    tackSpec: 'empty',
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
    orderId: 'new',
    selectPattern1: 'TR1V',
    selectPattern2: '',
    selectPattern3: '',
    backLength: NaN,
    bustTop: NaN,
    waistTop: NaN,
    collar: 'Ｖカット',
    chestPocket: '無',
    frontButton: 'empty',
    frontButtonHolePosition: '無',
    waistPocket: '腰Ｐ箱',
    backSide: '裏地',
    buckle: '有',
    holeThreadColor: '生地色',
    stitch: 'empty',
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
    orderId: 'new',
    shopId: '',
    seq: 0,
    orderStatus: '保存',
    inputDate: dayjs(),
    orderDateTime: dayjs(),
    shipDate: dayjs(),
    customerName: '',
    productName: 'empty',
    fabricMaker: '',
    fabricProductNo: '',
    yield: 0,
    blendRateFabric1: 'empty',
    blendRate1: NaN,
    blendRateFabric2: 'empty',
    blendRate2: NaN,
    blendRateFabric3: '',
    blendRate3: NaN,
    blendRateFabric4: '',
    blendRate4: NaN,
    inputUserId: user.userId,
    remark: '',
    isDelete: false,
    createDateTime: dayjs(),
    createUserId: user.loginId,
    updateDateTime: dayjs(),
    updateUserId: user.loginId,
    inputUserName: user.userName,
    jaket: defaultOrderJaket,
    pants: defaultOrderPants,
    vest: defaultOrderVest,
  };
  return defaultOrderBasis;
};

export const setOrderObject = (
  orderStatus: string,
  methods: UseFormReturn<FieldValues, any, undefined>
): OrderBasisType => {
  const order: OrderBasisType = {
    orderId: methods.getValues('basis-orderId'),
    shopId: methods.getValues('basis-shopId'),
    seq: methods.getValues('basis-seq'),
    orderStatus: orderStatus,
    inputDate: methods
      .getValues('basis-inputDate')
      .format('YYYY-MM-DDTHH:mm:ss'),
    // inputDate: toDateTimeString(methods.getValues('basis-inputDate')),
    orderDateTime: methods
      .getValues('basis-orderDateTime')
      .format('YYYY-MM-DDTHH:mm:ss'),
    // orderDateTime: toDateTimeString(methods.getValues('basis-orderDateTime')),
    shipDate: methods.getValues('basis-shipDate').format('YYYY-MM-DDTHH:mm:ss'),
    // shipDate: toDateTimeString(methods.getValues('basis-shipDate')),
    customerName: methods.getValues('basis-customerName'),
    productName: methods.getValues('basis-productName'),
    fabricMaker: methods.getValues('basis-fabricMaker'),
    fabricProductNo: methods.getValues('basis-fabricProductNo'),
    yield: toNumericValue(methods.getValues('basis-yield')),
    blendRateFabric1: toValue(methods.getValues('basis-blendRateFabric1')),
    blendRate1: toNumericValue(methods.getValues('basis-blendRate1')),
    blendRateFabric2: toValue(methods.getValues('basis-blendRateFabric2')),
    blendRate2: toNumericValue(methods.getValues('basis-blendRate2')),
    blendRateFabric3: toValue(methods.getValues('basis-blendRateFabric3')),
    blendRate3: toNumericValue(methods.getValues('basis-blendRate3')),
    blendRateFabric4: toValue(methods.getValues('basis-blendRateFabric4')),
    blendRate4: toNumericValue(methods.getValues('basis-blendRate4')),
    inputUserId: methods.getValues('basis-inputUserId'),
    remark: methods.getValues('basis-remark'),
    isDelete: methods.getValues('basis-isDelete'),
    createDateTime: methods
      .getValues('basis-createDateTime')
      .format('YYYY-MM-DDTHH:mm:ss'),
    // createDateTime: toDateTimeString(methods.getValues('basis-createDateTime')),
    createUserId: methods.getValues('basis-createUserId'),
    updateDateTime: methods
      .getValues('basis-updateDateTime')
      .format('YYYY-MM-DDTHH:mm:ss'),
    // updateDateTime: toDateTimeString(methods.getValues('basis-updateDateTime')),
    updateUserId: methods.getValues('basis-updateUserId'),
    inputUserName: methods.getValues('basis-inputUserName'),
    jaket: {
      jaketOrderId: methods.getValues('jaket-jaketOrderId'),
      orderId: methods.getValues('jaket-orderId'),
      selectPattern1: methods.getValues('jaket-selectPattern1'),
      selectPattern2: methods.getValues('jaket-selectPattern2'),
      selectPattern3: methods.getValues('jaket-selectPattern3'),
      totalLength: toNumericValue(methods.getValues('jaket-totalLength')),
      jaketLength: toNumericValue(methods.getValues('jaket-jaketLength')),
      shoulderWidth: toNumericValue(methods.getValues('jaket-shoulderWidth')),
      sleeveLengthLeft: toNumericValue(
        methods.getValues('jaket-sleeveLengthLeft')
      ),
      sleeveLengthRight: toNumericValue(
        methods.getValues('jaket-sleeveLengthRight')
      ),
      bust: toNumericValue(methods.getValues('jaket-bust')),
      waist: toNumericValue(methods.getValues('jaket-waist')),
      bustTop: toNumericValue(methods.getValues('jaket-bustTop')),
      waistTop: toNumericValue(methods.getValues('jaket-waistTop')),
      canvas: toValue(methods.getValues('jaket-canvas')),
      shoulderType: toValue(methods.getValues('jaket-shoulderType')),
      collarType: toValue(methods.getValues('jaket-collarType')),
      frontButton: toValue(methods.getValues('jaket-frontButton')),
      collarWidth: toValue(methods.getValues('jaket-collarWidth')),
      sleeveButton: toValue(methods.getValues('jaket-sleeveButton')),
      sleeveOpening: toValue(methods.getValues('jaket-sleeveOpening')),
      chestPocket: toValue(methods.getValues('jaket-chestPocket')),
      sewingMethod: toValue(methods.getValues('jaket-sewingMethod')),
      frontCut: toValue(methods.getValues('jaket-frontCut')),
      labelSatinFabric: toValue(methods.getValues('jaket-labelSatinFabric')),
      stitch: toValue(methods.getValues('jaket-stitch')),
      stitchLocation: toValue(methods.getValues('jaket-stitchLocation')),
      pinpointStitch: toValue(methods.getValues('jaket-pinpointStitch')),
      pinpointStitchThreadColor: toValue(
        methods.getValues('jaket-pinpointStitchThreadColor')
      ),
      chestBoxSatinFabric: toValue(
        methods.getValues('jaket-chestBoxSatinFabric')
      ),
      waistPocket: toValue(methods.getValues('jaket-waistPocket')),
      flapWidth: toNumericValue(methods.getValues('jaket-flapWidth')),
      changePocket: toValue(methods.getValues('jaket-changePocket')),
      secretPocket: toValue(methods.getValues('jaket-secretPocket')),
      backSpec: toValue(methods.getValues('jaket-backSpec')),
      daiba: toValue(methods.getValues('jaket-daiba')),
      insidePocket: toValue(methods.getValues('jaket-insidePocket')),
      penPocket: toValue(methods.getValues('jaket-penPocket')),
      ticketPocket: toValue(methods.getValues('jaket-ticketPocket')),
      pat: toValue(methods.getValues('jaket-pat')),
      lining: toValue(methods.getValues('jaket-lining')),
      collarBack: toValue(methods.getValues('jaket-collarBack')),
      vents: toValue(methods.getValues('jaket-vents')),
      inName: toValue(methods.getValues('jaket-inName')),
      nameFont: toValue(methods.getValues('jaket-nameFont')),
      namePosition: toValue(methods.getValues('jaket-namePosition')),
      nameColor: toValue(methods.getValues('jaket-nameColor')),
      name: toValue(methods.getValues('jaket-name')),
      labelHole: toValue(methods.getValues('jaket-labelHole')),
      stitchThreadColor: toValue(methods.getValues('jaket-stitchThreadColor')),
      labelThreadColor: toValue(methods.getValues('jaket-labelThreadColor')),
      frontButtonThreadColor: toValue(
        methods.getValues('jaket-frontButtonThreadColor')
      ),
      sleeveButtonThreadColor: toValue(
        methods.getValues('jaket-sleeveButtonThreadColor')
      ),
      brandName: toValue(methods.getValues('jaket-brandName')),
      fabricMark: toValue(methods.getValues('jaket-fabricMark')),
      buttonProductNo: toValue(methods.getValues('jaket-buttonProductNo')),
      sleeveOpeningTape: toValue(methods.getValues('jaket-sleeveOpeningTape')),
      sleeveElbowPatch: toValue(methods.getValues('jaket-sleeveElbowPatch')),
      hole: toValue(methods.getValues('jaket-hole')),
      sleeveButtonHoleColor: toValue(
        methods.getValues('jaket-sleeveButtonHoleColor')
      ),
      uchiai: toNumericValue(methods.getValues('jaket-uchiai')),
      hanmi: toNumericValue(methods.getValues('jaket-hanmi')),
      kutsumi: toNumericValue(methods.getValues('jaket-kutsumi')),
      squareShoulderLeft: toNumericValue(
        methods.getValues('jaket-squareShoulderLeft')
      ),
      squareShoulderRight: toNumericValue(
        methods.getValues('jaket-squareShoulderRight')
      ),
      slopingShoulderLeft: toNumericValue(
        methods.getValues('jaket-slopingShoulderLeft')
      ),
      slopingShoulderRight: toNumericValue(
        methods.getValues('jaket-slopingShoulderRight')
      ),
      totsuRyo: toNumericValue(methods.getValues('jaket-totsuRyo')),
      hip: toNumericValue(methods.getValues('jaket-hip')),
      frontLength: toNumericValue(methods.getValues('jaket-frontLength')),
      frontSleeveHem: toNumericValue(methods.getValues('jaket-frontSleeveHem')),
      ahFrontOpening: toNumericValue(methods.getValues('jaket-ahFrontOpening')),
      sleeveOpeningWidth: toNumericValue(
        methods.getValues('jaket-sleeveOpeningWidth')
      ),
      collarMitsu: toNumericValue(methods.getValues('jaket-collarMitsu')),
      collarShift: toNumericValue(methods.getValues('jaket-collarShift')),
      buttonPosition: toNumericValue(methods.getValues('jaket-buttonPosition')),
      backCurve: toNumericValue(methods.getValues('jaket-backCurve')),
      sickleRaising: toNumericValue(methods.getValues('jaket-sickleRaising')),
      sleeveWidth: toNumericValue(methods.getValues('jaket-sleeveWidth')),
      backWidth: toNumericValue(methods.getValues('jaket-backWidth')),
      sleeveBack: toValue(methods.getValues('jaket-sleeveBack')),
      remark: methods.getValues('jaket-remark'),
      isDelete: methods.getValues('jaket-isDelete'),
      createDateTime: methods
        .getValues('jaket-createDateTime')
        .format('YYYY-MM-DDTHH:mm:ss'),
      // createDateTime: toDateTimeString(methods.getValues('jaket-createDateTime')),
      createUserId: methods.getValues('jaket-createUserId'),
      updateDateTime: methods
        .getValues('jaket-updateDateTime')
        .format('YYYY-MM-DDTHH:mm:ss'),
      // updateDateTime: toDateTimeString(methods.getValues('jaket-updateDateTime')),
      updateUserId: methods.getValues('jaket-updateUserId'),
    },
    pants: {
      pantsOrderId: methods.getValues('pants-pantsOrderId'),
      orderId: methods.getValues('pants-orderId'),
      selectPattern1: methods.getValues('pants-selectPattern1'),
      selectPattern2: methods.getValues('pants-selectPattern2'),
      selectPattern3: methods.getValues('pants-selectPattern3'),
      waist: toNumericValue(methods.getValues('pants-waist')),
      hip: toNumericValue(methods.getValues('pants-hip')),
      hipTop: toNumericValue(methods.getValues('pants-hipTop')),
      rise: toNumericValue(methods.getValues('pants-rise')),
      inseamLeft: toNumericValue(methods.getValues('pants-inseamLeft')),
      inseamRight: toNumericValue(methods.getValues('pants-inseamRight')),
      crossingWidth: toNumericValue(methods.getValues('pants-crossingWidth')),
      kneeWidth: toNumericValue(methods.getValues('pants-kneeWidth')),
      hemOpening: toNumericValue(methods.getValues('pants-hemOpening')),
      tack: toValue(methods.getValues('pants-tack')),
      sidePocket: toValue(methods.getValues('pants-sidePocket')),
      foldedHem: toValue(methods.getValues('pants-foldedHem')),
      secretPocket: toValue(methods.getValues('pants-secretPocket')),
      kneeBack: toValue(methods.getValues('pants-kneeBack')),
      holeThreadColor: toValue(methods.getValues('pants-holeThreadColor')),
      amfStitch: toValue(methods.getValues('pants-amfStitch')),
      sideAmf: toValue(methods.getValues('pants-sideAmf')),
      stitchThreadColor: toValue(methods.getValues('pants-stitchThreadColor')),
      kneepadColor: toValue(methods.getValues('pants-kneepadColor')),
      tackSpec: toValue(methods.getValues('pants-tackSpec')),
      sideSatinFabric: toValue(methods.getValues('pants-sideSatinFabric')),
      pisPocketJadeGreen: toValue(
        methods.getValues('pants-pisPocketJadeGreen')
      ),
      pisPocket: toValue(methods.getValues('pants-pisPocket')),
      plaket: toValue(methods.getValues('pants-plaket')),
      buttocks: toNumericValue(methods.getValues('pants-buttocks')),
      flatButt: toNumericValue(methods.getValues('pants-flatButt')),
      frontRise: toNumericValue(methods.getValues('pants-frontRise')),
      backRise: toNumericValue(methods.getValues('pants-backRise')),
      wedgie: toNumericValue(methods.getValues('pants-wedgie')),
      pancherina: toValue(methods.getValues('pants-pancherina')),
      loopCount: toValue(methods.getValues('pants-loopCount')),
      qiLoop: toValue(methods.getValues('pants-qiLoop')),
      hole: toValue(methods.getValues('pants-hole')),
      chic: toValue(methods.getValues('pants-chic')),
      loopAdd: toValue(methods.getValues('pants-loopAdd')),
      plushLoop: toValue(methods.getValues('pants-plushLoop')),
      setFinishing: toValue(methods.getValues('pants-setFinishing')),
      creaseWire: toValue(methods.getValues('pants-creaseWire')),
      buttholeTape: toValue(methods.getValues('pants-buttholeTape')),
      remark: methods.getValues('pants-remark'),
      isDelete: methods.getValues('pants-isDelete'),
      createDateTime: methods
        .getValues('pants-createDateTime')
        .format('YYYY-MM-DDTHH:mm:ss'),
      // createDateTime: toDateTimeString(methods.getValues('pants-createDateTime')),
      createUserId: methods.getValues('pants-createUserId'),
      updateDateTime: methods
        .getValues('pants-updateDateTime')
        .format('YYYY-MM-DDTHH:mm:ss'),
      // updateDateTime: toDateTimeString(methods.getValues('pants-updateDateTime')),
      updateUserId: methods.getValues('pants-updateUserId'),
    },
    vest: {
      vestOrderId: methods.getValues('vest-vestOrderId'),
      orderId: methods.getValues('vest-orderId'),
      selectPattern1: methods.getValues('vest-selectPattern1'),
      selectPattern2: methods.getValues('vest-selectPattern2'),
      selectPattern3: methods.getValues('vest-selectPattern3'),
      backLength: toNumericValue(methods.getValues('vest-backLength')),
      bustTop: toNumericValue(methods.getValues('vest-bustTop')),
      waistTop: toNumericValue(methods.getValues('vest-waistTop')),
      collar: toValue(methods.getValues('vest-collar')),
      chestPocket: toValue(methods.getValues('vest-chestPocket')),
      frontButton: toValue(methods.getValues('vest-frontButton')),
      frontButtonHolePosition: toValue(
        methods.getValues('vest-frontButtonHolePosition')
      ),
      waistPocket: toValue(methods.getValues('vest-waistPocket')),
      backSide: toValue(methods.getValues('vest-backSide')),
      buckle: toValue(methods.getValues('vest-buckle')),
      holeThreadColor: toValue(methods.getValues('vest-holeThreadColor')),
      stitch: toValue(methods.getValues('vest-stitch')),
      hole: toValue(methods.getValues('vest-hole')),
      uchiai: toNumericValue(methods.getValues('vest-uchiai')),
      hanmi: toNumericValue(methods.getValues('vest-hanmi')),
      kutsumi: toNumericValue(methods.getValues('vest-kutsumi')),
      squareShoulderLeft: toNumericValue(
        methods.getValues('vest-squareShoulderLeft')
      ),
      squareShoulderRight: toNumericValue(
        methods.getValues('vest-squareShoulderRight')
      ),
      slopingShoulderLeft: toNumericValue(
        methods.getValues('vest-slopingShoulderLeft')
      ),
      slopingShoulderRight: toNumericValue(
        methods.getValues('vest-slopingShoulderRight')
      ),
      sickleRaising: toNumericValue(methods.getValues('vest-sickleRaising')),
      shoulderWidth: toNumericValue(methods.getValues('vest-shoulderWidth')),
      buttonPosition: toNumericValue(methods.getValues('vest-buttonPosition')),
      frontLength: toNumericValue(methods.getValues('vest-frontLength')),
      remark: methods.getValues('vest-remark'),
      isDelete: methods.getValues('vest-isDelete'),
      createDateTime: methods
        .getValues('vest-createDateTime')
        .format('YYYY-MM-DDTHH:mm:ss'),
      // createDateTime: toDateTimeString(methods.getValues('vest-createDateTime')),
      createUserId: methods.getValues('vest-createUserId'),
      updateDateTime: methods
        .getValues('vest-updateDateTime')
        .format('YYYY-MM-DDTHH:mm:ss'),
      // updateDateTime: toDateTimeString(methods.getValues('vest-updateDateTime')),
      updateUserId: methods.getValues('vest-updateUserId'),
    },
  };
  return order;
};

const toValue = (value: any) => {
  return value === 'empty' ? '' : value;
};

const toNumericValue = (value: any) => {
  return value === 'empty' ? NaN : Number(value) || NaN;
};
