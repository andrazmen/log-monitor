import Wrapper from "../assets/wrappers/Forms";

const FormSelect = ({ label, name, list, value, onChange }) => {
  return (
    <Wrapper>
      <div className="select">
        <label htmlFor={name} className="label">
          <span>{label}</span>
        </label>
        <select name={name} id={name} value={value} onChange={onChange}>
          {list.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </Wrapper>
  );
};

export default FormSelect;
