import { Formik, Field, ErrorMessage } from "formik";

const textAreaMax = 255;

interface ITextField {
  type: "text" | "password" | "textarea";
  required?: boolean;
  label: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  maxLength?: number;
}

const TextField = ({
  type,
  required,
  label,
  name,
  placeholder,
  disabled,
  maxLength,
}: ITextField) => {
  return (
    <>
      {type !== "textarea" ? (
        <>
          <label>{label}</label>
          {required && <span className="text-red-600 ml-1">*</span>}
          <Field name={name}>
            {({ field, meta }: any) => (
              <div>
                <input
                  type={type}
                  {...field}
                  disabled={disabled}
                  maxLength={maxLength}
                  // autoFocus="true"
                  autoComplete="false"
                  placeholder={placeholder}
                  className={`mt-2 block w-full rounded-md border-0 py-2 px-3 ${
                    meta.touched && meta.error && "ring-red-600"
                  } text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6 `}
                />
                {meta.touched && meta.error && (
                  <div className="text-sm text-red-600">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
        </>
      ) : (
        <>
          <label>{label}</label>
          {required && <span className="text-red-600 ml-1">*</span>}
          <Field name={name}>
            {({ field, meta }: any) => (
              <div>
                <textarea
                  {...field}
                  disabled={disabled}
                  maxLength={textAreaMax}
                  rows={5}
                  autoComplete="false"
                  placeholder={placeholder}
                  className={`mt-2 block w-full rounded-md border-0 py-2 px-3 ${
                    meta.touched && meta.error && "ring-red-600"
                  } text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6 `}
                />
                <p className="text-gray-400">{`${field.value?.length}/${textAreaMax}`}</p>
              </div>
            )}
          </Field>
        </>
      )}
    </>
  );
};

export default TextField;
