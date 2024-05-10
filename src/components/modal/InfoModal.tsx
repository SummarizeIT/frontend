import { DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from "@mui/joy";
import { useState } from "react";

interface InfoModalProps {
    infoMessage: string;
    infoTitle: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ infoMessage, infoTitle }) => {
    const [open, setOpen] = useState(true);

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
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