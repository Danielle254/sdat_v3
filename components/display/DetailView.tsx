import React, { useState } from "react";
import ModalBox from "./ModalBox";
import DetailViewContent from "./DetailViewContent";
import EditPlace from "../form/EditPlace";

type DetailViewProps = {
  modalOpen: boolean;
  handleCloseModal: () => void;
  placeId: string;
  closeInfoWindow: () => void;
};

export default function DetailView({
  modalOpen,
  handleCloseModal,
  placeId,
  closeInfoWindow,
}: DetailViewProps) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <ModalBox modalOpen={modalOpen} handleCloseModal={handleCloseModal}>
        {!editMode && (
          <DetailViewContent
            placeId={placeId}
            enableEditMode={() => setEditMode(true)}
            handleCloseModal={handleCloseModal}
            closeInfoWindow={closeInfoWindow}
          />
        )}
        {editMode && (
          <EditPlace placeId={placeId} disableEdit={() => setEditMode(false)} />
        )}
      </ModalBox>
    </>
  );
}
