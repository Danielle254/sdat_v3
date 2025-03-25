import React from "react";
import { useState } from "react";
import ModalBox from "./ModalBox";
import DetailViewContent from "./DetailViewContent";
import EditPlace from "../form/EditPlace";
import { PlaceType } from "../../types/place";

type DetailViewProps = {
  modalOpen: boolean;
  handleCloseModal: () => void;
  place: PlaceType;

  closeInfoWindow: () => void;
};

export default function DetailView({
  modalOpen,
  handleCloseModal,
  place,

  closeInfoWindow,
}: DetailViewProps) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <ModalBox modalOpen={modalOpen} handleCloseModal={handleCloseModal}>
        {!editMode && (
          <DetailViewContent
            place={place}
            enableEditMode={() => setEditMode(true)}
            handleCloseModal={handleCloseModal}
            closeInfoWindow={closeInfoWindow}
          />
        )}
        {editMode && (
          <EditPlace place={place} disableEdit={() => setEditMode(false)} />
        )}
      </ModalBox>
    </>
  );
}
