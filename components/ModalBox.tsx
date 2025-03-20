import React from "react";
import Modal from "@mui/material/Modal";
import NewPlaceForm from "./NewPlaceForm";
import Box from "@mui/material/Box";

type ModalBoxProps = {
  modalOpen: boolean;
  handleCloseModal: () => void;
};

export default function ModalBox({
  modalOpen,
  handleCloseModal,
}: ModalBoxProps) {
  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          maxHeight: "80%",
          overflowY: "scroll",
        }}
      >
        <NewPlaceForm />
      </Box>
    </Modal>
  );
}
