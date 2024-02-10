import { confirmDialog } from 'primereact/confirmdialog';
import { locale, addLocale } from 'primereact/api';

export const confirmYesNo = (message: string, accept: any) => {
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
    acceptClassName: 'p-button p-component p-confirm-dialog-accept',
  });
};
