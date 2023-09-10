interface ICheckbox {
  formik: any;
  disabled?: boolean;
  label: string;
  name: string;
}

const Checkbox = ({ formik, disabled, label, name }: ICheckbox) => {
  return (
    <>
      <label>{label}</label>
      <div>
        <input
          type="checkbox"
          disabled={disabled}
          checked={formik.values && formik.values[name]}
          onChange={(e) => formik.setFieldValue(name, e.target.checked)}
        />
      </div>
    </>
  );
};

export default Checkbox;
