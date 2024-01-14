import { useState } from 'react';

export const useSearchPanel = () => {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [dateType, setDateType] = useState<string>('inputDate');
  const [orderStatausType, setOrderStatausType] = useState<string>('all');
  const [orderId, setOrderId] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');

  return {
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    dateType,
    setDateType,
    orderStatausType,
    setOrderStatausType,
    orderId,
    setOrderId,
    customerName,
    setCustomerName,
  };
};