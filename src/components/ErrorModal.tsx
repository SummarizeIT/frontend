
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface ErrorModalProps {
  errorMessage: string; 
  errorTitle:string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage ,errorTitle}) => {
  const { onOpenChange } = useDisclosure();
  const [open,setOpen]=useState(true);

  return (
    <>
      <Modal isOpen={open} onOpenChange={onOpenChange} onClose={() => setOpen(false)}> {}
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {errorTitle}
          </ModalHeader>
          <ModalBody>
            <p>{errorMessage}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ErrorModal;
