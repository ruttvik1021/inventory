import { Field } from "formik";
import React from "react";
import Select from "react-select";

interface ISelectField {
  label: string;
  options: Array<any>;
  labelKey: string;
  valueKey: string;
  isDisabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  name: string;
  onChange?: (value: any) => void;
  required?: boolean;
}

const SelectField = ({
  options,
  isDisabled,
  isClearable,
  isSearchable,
  onChange,
  label,
  labelKey,
  valueKey,
  isLoading,
  name,
  isMulti,
  required,
}: ISelectField) => {
  return (
    <>
      <label>{label}</label>
      {required && <span className="text-red-600 ml-1">*</span>}
      <Field name={name}>
        {({ field, meta }: any) => (
          <div>
            <Select
              {...field}
              getOptionLabel={(option: any) => option[labelKey]}
              getOptionValue={(option: any) => option[valueKey]}
              defaultValue={null}
              value={
                field.value
                  ? options.find((item: any) => item[valueKey] === field.value)
                  : null
              }
              isDisabled={isDisabled}
              isLoading={isLoading}
              isClearable={isClearable}
              isSearchable={isSearchable}
              isMulti={isMulti}
              className={`mt-2 border-none rounded-full`}
              name={name}
              onChange={(e: any) =>
                onChange && onChange(e ? e[valueKey] : null)
              }
              options={options}
            />
            {meta.touched && meta.error && (
              <div className="text-sm text-red-600">{meta.error}</div>
            )}
          </div>
        )}
      </Field>
    </>
  );
};

export default SelectField;
