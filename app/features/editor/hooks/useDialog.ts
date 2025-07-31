import { useRef } from 'react';

function useDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return {
    dialogRef,
    openDialog,
    closeDialog,
  };
}

export default useDialog;
