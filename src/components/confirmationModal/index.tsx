import React from "react";
import Modal from "../modalTemplate/Modal";
import DeleteButton from "../deleteButton";
import PrimaryButton from "../primaryButton";

interface IModal {
  show: boolean;
  setShow: (state: boolean) => void;
  onBlur?: boolean;
  onClick: any;
}

const ConfirmationModal = ({ show, setShow, onBlur, onClick }: IModal) => {
  return (
    <Modal
      show={show}
      onBlur={onBlur || false}
      setShow={setShow}
      size="smallSize"
    >
      <div>
        <p className="text-3xl text-red-600">Delete Confirmation</p>
        <p className="text-xl mt-2">Are you sure you want to delete ?</p>
        <div className="flex items-center justify-around mt-4">
          <PrimaryButton text={"Cancel"} onClick={() => setShow(false)} />
          <DeleteButton text={"Confirm"} onClick={() => onClick()} />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
