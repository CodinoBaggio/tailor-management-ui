import { useState } from 'react';

export const useMessageDialog = () => {
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageDialogMessage, setMessageDialogMessage] = useState('');

  const handleClick = () => {
    setMessageDialogOpen(false);
  };

  const showMessage = (formatOrObject: any) => {
    setMessageDialogOpen(true);
    const errorMessage =
      formatOrObject instanceof Error ? formatOrObject.message : formatOrObject;
    setMessageDialogMessage(errorMessage);
  };

  return { messageDialogOpen, messageDialogMessage, handleClick, showMessage };
};
