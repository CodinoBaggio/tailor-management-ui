import { OrderBasisType } from './order';

export type GetOrdersResponSeType = {
  status: string;
  message: string;
  payload: {
    orders: OrderBasisType[];
  };
};
