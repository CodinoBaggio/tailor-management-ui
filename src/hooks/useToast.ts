import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export const useToast = () => {
  const toast = useRef<Toast>(null);

  const showMessage = (
    summary: string,
    severity: 'success' | 'info' | 'warn' | 'error' = 'info',
    detail: string = ''
  ) => {
    toast.current?.show({
      severity: severity,
      summary: summary,
      detail: detail,
      sticky: true,
      className: 'toast-message',
    });
  };

  return { toast, showMessage };
};
