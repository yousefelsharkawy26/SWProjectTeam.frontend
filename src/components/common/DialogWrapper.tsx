
import React, { createContext, useContext, useState } from 'react';

type DialogType = 
  | 'createInvoice'
  | 'addStaff'
  | 'newTreatmentPlan'
  | 'newAppointment'
  | 'addPatient'
  | 'connectDatabase';

interface DialogContextType {
  openDialog: (dialog: DialogType) => void;
  closeDialog: (dialog: DialogType) => void;
  isDialogOpen: (dialog: DialogType) => boolean;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openDialogs, setOpenDialogs] = useState<DialogType[]>([]);

  const openDialog = (dialog: DialogType) => {
    setOpenDialogs(prev => [...prev, dialog]);
  };

  const closeDialog = (dialog: DialogType) => {
    setOpenDialogs(prev => prev.filter(d => d !== dialog));
  };

  const isDialogOpen = (dialog: DialogType) => {
    return openDialogs.includes(dialog);
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, isDialogOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
