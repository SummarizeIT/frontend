interface GetInfoModalProps {
    infoTitle: string | null;
    onSubmit: (inputValue: string) => void; 
    infoMessage: string | null;
}

import { DialogContent, DialogTitle, Modal, ModalClose, ModalDialog,  Textarea ,Button } from "@mui/joy";
import { useState } from "react";

const GetInfoModal : React.FC<GetInfoModalProps>= ({infoTitle, onSubmit,infoMessage}) => {
    const [open, setOpen] = useState(true);
    const [userInput, setUserInput] = useState("");

    const handleClose = () => {
        setOpen(false);
        onSubmit(userInput); // Call the callback function when closing the modal
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalDialog>
                <ModalClose onClick={() => setOpen(false)} />
                <DialogTitle>{infoTitle!}</DialogTitle>
                <DialogContent>
                    <Textarea placeholder={infoMessage!}  onChange={(e) => setUserInput(e.target.value)}/>
                      <Button onClick={handleClose} sx={{ marginTop: 2 }}>Submit</Button>
                </DialogContent>
            </ModalDialog>
        </Modal>
    );
};

export default GetInfoModal;
