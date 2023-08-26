import Modal from "@/components/modalTemplate/Modal";
import TextField from "@/components/textfield";
import { FormikProvider } from "formik";
import React from "react";

const CategoryModal = ({ show, setShow, onBlur, formik }: any) => {
  return (
    <Modal show={show} setShow={setShow} onBlur={onBlur}>
      <FormikProvider value={formik}>
        <TextField
          type={"text"}
          label={"Category Name"}
          name={"categoryName"}
          placeholder={"Category Name"}
        />
        <button
          type="submit"
          onClick={(e: any) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          Create
        </button>
      </FormikProvider>
    </Modal>
  );
};

export default CategoryModal;
