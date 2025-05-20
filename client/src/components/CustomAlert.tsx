import React, { useEffect, useState } from "react";
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface CustomAlertProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, open, onClose }) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="font-inter max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#1e293b] text-xl">Information</AlertDialogTitle>
          <AlertDialogDescription className="text-[#64748b] text-base">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white">
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const useCustomAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showAlert = (alertMessage: string) => {
    setMessage(alertMessage);
    setIsOpen(true);
  };

  const closeAlert = () => {
    setIsOpen(false);
  };

  return {
    alert: showAlert,
    AlertComponent: <CustomAlert 
      message={message} 
      open={isOpen} 
      onClose={closeAlert} 
    />
  };
};

export default CustomAlert;