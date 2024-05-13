import { DialogContent, DialogTitle, Modal,ModalDialog,CircularProgress} from "@mui/joy";

interface loadingModalProps {
  open: boolean;
  onClose: () => void;
}

const LoadingModal: React.FC<loadingModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <DialogTitle>Loading</DialogTitle>
        <DialogContent>
        <CircularProgress size="lg" />
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default LoadingModal;