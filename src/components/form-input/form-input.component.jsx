import "./form-input.styles.scss";

const FormInput = ({ lable, ...inputProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...inputProps}></input>
      {lable && (
        <label
          className={`${
            inputProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {lable}
        </label>
      )}
    </div>
  );
};

export default FormInput;
