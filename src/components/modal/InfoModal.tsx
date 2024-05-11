import { DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from "@mui/joy";
import { useState } from "react";
interface InfoModalProps {
    infoMessage: string;
    infoTitle: string;
    open: boolean;
    onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ infoMessage, infoTitle,open,onClose }) => {

    return (
        <Modal open={open} onClose={onClose}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>{infoTitle}</DialogTitle>
          <DialogContent>
            <p>{infoMessage}</p>
          </DialogContent>
        </ModalDialog>
      </Modal>
    );
};

export default InfoModal;