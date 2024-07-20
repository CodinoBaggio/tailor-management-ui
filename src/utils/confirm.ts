import { ConfirmDialogOptions, confirmDialog } from 'primereact/confirmdialog';
import { locale, addLocale } from 'primereact/api';
import { ReactNode } from 'react';

export const confirmYesNo = (message: ReactNode | ((options: ConfirmDialogOptions) => ReactNode), accept: any, reject?: any) => {
  addLocale('ja', {
    accept: 'はい',
    reject: 'いいえ',
  });
  locale('ja');
  confirmDialog({
    message: message,
    header: '確認',
    icon: 'pi pi-exclamation-triangle',
    accept: accept,
    reject: reject,
    acceptClassName: 'border border-blue-500 text-blue-700',
    // className: 'z-40',
    appendTo: 'self',
  });
};
