import React, { FC } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { grey, pink, blueGrey, green } from '@mui/material/colors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type Props = {
  order: any;
  handleEdit: (orderId: string) => void;
};

export const OrderCard: FC<Props> = (props) => {
  const { order, handleEdit } = props;

  return (
    <>
      <div className="mb-3">
        <Card sx={{ boxShadow: 3 }}>
          <CardActionArea
            onClick={() =>
              order.orderStatus === '保存'
                ? handleEdit(order.orderId)
                : handleEdit(order.orderId)
            }
          >
            <CardHeader
              avatar={
                order.orderStatus === '保存' ? (
                  <Tooltip title="保存" arrow>
                    <SaveIcon fontSize="large" sx={{ color: green[500] }} />
                  </Tooltip>
                ) : (
                  <Tooltip title="発注済み" arrow>
                    <CloudUploadIcon
                      fontSize="large"
                      sx={{ color: pink[500] }}
                    />
                  </Tooltip>
                )
              }
              // action={
              //   <IconButton aria-label="settings">
              //     <MoreVertIcon />
              //   </IconButton>
              // }
              title={`オーダーID：${order.orderId}`}
              subheader={<Box>{`入力日：${order.inputDate}`}</Box>}
              titleTypographyProps={{ variant: 'body1', color: grey[700] }}
              sx={{ bgcolor: blueGrey[50] }}
            />
            <CardContent>
              <Box className="flex justify-around">
                <Typography
                  variant="h6"
                  color={grey[700]}
                >{`${order.customerName} 様`}</Typography>
                <Box>
                  <Typography variant="body2" color={grey[700]}>
                    {order.productName}
                  </Typography>
                  <Typography variant="body2" color={grey[700]}>
                    {order.fabricMaker}
                  </Typography>
                  <Typography variant="body2" color={grey[700]}>
                    {order.fabricProductNo}
                  </Typography>
                </Box>
              </Box>
              <Box className="my-3">
                <Divider />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color={grey[700]}>{`発注日時：${
                  order.orderDateTime || '-'
                }`}</Typography>
                <Typography variant="body2" color={grey[700]}>{`工場出荷日：${
                  order.shipDate || '-'
                }`}</Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
};
