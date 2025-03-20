import React from "react";
import Modal from "@mui/material/Modal";
import NewPlaceForm from "./NewPlaceForm";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";

type ModalBoxProps = {
  modalOpen: boolean;
  handleCloseModal: () => void;
  selectedPlace: google.maps.places.PlaceResult | null;
};

export default function ModalBox({
  modalOpen,
  handleCloseModal,
  selectedPlace,
}: ModalBoxProps) {
  return (
    <Modal open={modalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", md: "50%" },
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          maxHeight: "80%",
          overflowY: "scroll",
        }}
      >
        <IconButton
          size="large"
          color="inherit"
          aria-label="close modal"
          onClick={handleCloseModal}
          sx={{
            float: "right",
          }}
        >
          <Close />
        </IconButton>
        <NewPlaceForm place={selectedPlace} />
      </Box>
    </Modal>
  );
}
