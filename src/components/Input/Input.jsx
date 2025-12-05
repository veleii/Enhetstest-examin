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
  return (
    <section className="input">
      {/* Ändrat här för att koppla ihop label och input*/}
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className={`input__field ${customClass ? customClass : ""}`}
        name={name}
        // Och här
        id={name}
        onChange={handleChange}
        defaultValue={defaultValue ? defaultValue : ""}
        maxLength={maxLength}
        disabled={disabled}
      />
    </section>
  );
}

export default Input;
