import Wrapper from "../assets/wrappers/Forms";

const FormDateRange = ({ label, name, value, onChange, required }) => {
  return (
    <Wrapper>
      <div className="input">
        <label htmlFor={name} className="label">
          <span>{label}</span>
        </label>
        <input
          type="datetime-local"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </Wrapper>
  );
};

export default FormDateRange;
