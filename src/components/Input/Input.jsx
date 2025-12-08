import "./Input.scss";

function Input({
  label,
  type,
  customClass,
  name,
  handleChange,
  defaultValue,
  disabled,
  maxLength,
}) {
  const inputId = name || label.toLowerCase();
  // ÄNDRING: Lade till 'customClass' för att kunna återanvända Input-komponenten
  return (
    <section className="input">
      <label className="input__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        type={type}
        className={`input__field ${customClass ? customClass : ""}`}
        name={name}
        id={inputId}
        onChange={handleChange}
        defaultValue={defaultValue ? defaultValue : ""}
        maxLength={maxLength}
        disabled={disabled}
      />
    </section>
  );
}

export default Input;
