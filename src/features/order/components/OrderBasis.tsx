import {
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';
import {
  Box,
  Button,
} from '@mui/material';
import 'dayjs/locale/ja';
import FactCheckIcon from '@mui/icons-material/FactCheck';

import { RhfSelect } from '../../../components/ui/RhfSelect';
import { RhfTextField } from '../../../components/ui/RhfTextField';
import { RhfDatePicker } from '../../../components/ui/RhfDatePicker';
import { RhfDateTimePicker } from '../../../components/ui/RhfDateTimePicker';
import { GridContainer } from '../../../components/containers/GridContainer';
import { FC, useState } from 'react';
import orderApi from '../api/orderApi';
import { useMessageDialog } from '../hooks/useMessageDialog';
import { OkOnlyDialog } from '../../../components/ui/OkOnlyDialog';
import { FabricProductNoSearchDialog } from './ui/FabricProductNoSearchDialog';

type Props = {
  methods: UseFormReturn<FieldValues, any, undefined>;
};

const style = {
  boxMargin: 'mb-5',
  blockColor1: 'bg-green-100',
};

export const OrderBasis: FC<Props> = (props) => {
  const { methods } = props;
  const [fabricProductNoSearchDialogOpen, setFabricProductNoSearchDialogOpen] =
    useState(false);
  const [productNos, setProductNos] = useState([]);
  const [loading, setLoading] = useState(false);
  const okOnlyDialog = useMessageDialog();

  const handleFabricProductNoSearchDialogOpen = () => {
    // 配列クリア
    setProductNos([]);

    const productName = methods.getValues('basis-productName');
    if (productName !== 'empty' && productName !== '') {
      setFabricProductNoSearchDialogOpen(true);
    } else {
      okOnlyDialog.showMessage('品名を選択してください。');
    }
  };

  const handleFabricProductNoSearchSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const searchPattern = formJson.searchPattern;

    try {
      setLoading(true);

      const res: any = await orderApi.create({
        endpoint: 'fabric-product-no',
        endpointParams: {
          productName: methods.getValues('basis-productName'),
          searchPattern: searchPattern,
        },
      });
      if (res.status === 'success') {
        setProductNos(res.payload.productNos);
      } else {
        okOnlyDialog.showMessage(res.message);
      }
    } catch (error) {
      okOnlyDialog.showMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleListItemClick = (_: any, index: number) => {
    methods.setValue('basis-fabricProductNo', productNos[index]);
    setFabricProductNoSearchDialogOpen(false);
  };

  return (
    <>
      <Box className={style.boxMargin}>
        <GridContainer>
          <RhfDatePicker label="入力日" name="basis-inputDate" required />
          <RhfDateTimePicker
            label="発注日時"
            name="basis-orderDateTime"
            required
          />
          <RhfDatePicker label="工場出荷日" name="basis-shipDate" required />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer bgColor={style.blockColor1}>
          <RhfSelect
            label="品名"
            name="basis-productName"
            menuItems={[
              { value: 'empty', label: '' },
              { value: '2P', label: '2P：ジャケット+パンツ' },
              { value: 'JK', label: 'JK：ジャケット' },
              { value: 'PT', label: 'PT：パンツ' },
              { value: 'VT', label: 'VT：ベスト' },
              { value: '3P', label: '3P：ジャケット+パンツ+ベスト' },
              { value: '2PP', label: '2PP：ジャケット+パンツ+パンツ' },
              { value: '3PP', label: '3PP：ジャケット+パンツ+パンツ+ベスト' },
            ]}
            width={300}
            required
            validationMessage="品名を選択してください"
          />
          {/* <Controller
            name="select"
            control={control}
            // defaultValue={0}
            render={({ field, formState: { errors } }) => (
              <FormControl fullWidth error={errors.select ? true : false}>
                <InputLabel id="select-label">セレクトボックス</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  label="Select"
                  {...field}
                >
                  <MenuItem value={0}>未選択</MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.select?.message as string}
                </FormHelperText>
              </FormControl>
            )}
          /> */}
          {/* <RhfTextField
            label="生地メーカー"
            name="basis-fabricMaker"
            required
            message="生地メーカーを入力してください"
          /> */}
          <Box>
            <RhfTextField
              label="生地品番"
              name="basis-fabricProductNo"
              required
              validationMessage="生地品番を入力してください"
            />
            <Button
              startIcon={<FactCheckIcon />}
              onClick={handleFabricProductNoSearchDialogOpen}
            >
              生地品番選択
            </Button>
          </Box>
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
          {[
            <RhfTextField
              label="お客様名"
              name="basis-customerName"
              required
              validationMessage="お客様名を入力してください"
              width={300}
              adornment="様"
            />,
            // <RhfTextField
            //   label="要尺"
            //   name="basis-yield"
            //   required
            //   validationMessage="要尺を入力してください"
            //   type="number"
            //   defaultValue={0}
            //   width={70}
            // />,
            // <Controller
            //   name='customerName'
            //   control={control}
            //   // defaultValue={defaultValue}
            //   rules={{
            //     required: {
            //       value: true,
            //       message: 'お客様名を入力してください',
            //     },
            //   }}
            //   render={({ field, formState: { errors } }) => {
            //     // console.log(errors.customerName);
            //     return (
            //       <TextField
            //         id='customerName'
            //         // type={type}
            //         {...field}
            //         label='お客様名'
            //         // required={true}
            //         error={errors.customerName ? true : false}
            //         helperText={errors.customerName?.message as string}
            //         size="small"
            //         inputProps={{ style: { fontSize: '0.8rem' } }}
            //         // sx={{ width: { width } }}
            //         InputLabelProps={{ shrink: true }}
            //         variant="standard"
            //         // placeholder={placeholder}
            //         InputProps={{
            //           endAdornment: (
            //             <InputAdornment position="end">ore</InputAdornment>
            //           ),
            //         }}
            //       />
            //     );
            //   }}
            // />,
          ]}
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
          <RhfSelect
            label="混率生地①"
            name="basis-blendRateFabric1"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'W', label: 'W' },
              { value: 'ポリエステル', label: 'ポリエステル' },
              { value: 'コットン', label: 'コットン' },
              { value: 'シルク', label: 'シルク' },
              { value: 'リネン', label: 'リネン' },
              { value: 'ナイロン', label: 'ナイロン' },
              { value: 'ポリウレタン', label: 'ポリウレタン' },
              { value: 'レーヨン', label: 'レーヨン' },
              { value: 'モヘア', label: 'モヘア' },
              { value: 'ビスコース', label: 'ビスコース' },
            ]}
          />
          <RhfTextField
            label="混率①"
            name="basis-blendRate1"
            required
            validationMessage="混率①を入力してください"
            type="number"
            defaultValue={0}
            width={70}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
          <RhfSelect
            label="混率生地②"
            name="basis-blendRateFabric2"
            menuItems={[
              { value: 'empty', label: '' },
              { value: 'W', label: 'W' },
              { value: 'ポリエステル', label: 'ポリエステル' },
              { value: 'コットン', label: 'コットン' },
              { value: 'シルク', label: 'シルク' },
              { value: 'リネン', label: 'リネン' },
              { value: 'ナイロン', label: 'ナイロン' },
              { value: 'ポリウレタン', label: 'ポリウレタン' },
              { value: 'レーヨン', label: 'レーヨン' },
              { value: 'モヘア', label: 'モヘア' },
              { value: 'ビスコース', label: 'ビスコース' },
            ]}
          />
          <RhfTextField
            label="混率②"
            name="basis-blendRate2"
            required
            validationMessage="混率②を入力してください"
            type="number"
            defaultValue={0}
            width={70}
          />
        </GridContainer>
      </Box>
      <Box className={style.boxMargin}>
        <GridContainer>
          <RhfTextField
            label="混率生地③"
            name="basis-blendRateFabric3"
            required
            validationMessage="混率生地③を入力してください"
            width={200}
          />
          <RhfTextField
            label="混率③"
            name="basis-blendRate3"
            required
            validationMessage="混率③を入力してください"
            type="number"
            defaultValue={0}
            width={70}
          />
        </GridContainer>
      </Box>
      <Box>
        <GridContainer>
          <RhfTextField
            label="混率生地④"
            name="basis-blendRateFabric4"
            required
            validationMessage="混率生地④を入力してください"
            width={200}
          />
          <RhfTextField
            label="混率④"
            name="basis-blendRate4"
            required
            validationMessage="混率④を入力してください"
            type="number"
            defaultValue={0}
            width={70}
          />
        </GridContainer>
      </Box>
      <FabricProductNoSearchDialog
        open={fabricProductNoSearchDialogOpen}
        setOpen={setFabricProductNoSearchDialogOpen}
        loading={loading}
        productNos={productNos}
        handleListItemClick={handleListItemClick}
        handleSubmit={handleFabricProductNoSearchSubmit}
      />
      <OkOnlyDialog
        open={okOnlyDialog.messageDialogOpen}
        message={okOnlyDialog.messageDialogMessage}
        onClick={okOnlyDialog.handleClick}
      />
    </>
  );
};
