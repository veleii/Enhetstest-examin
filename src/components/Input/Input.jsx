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
  // LÖSNING: Vi genererar ett unikt ID.
  // Om 'name' saknas (som i Confirmation.jsx), använder vi 'label' som ID istället.
  // Motivering: För att göra komponenten tillgänglig och testbar med getByLabelText måste label och input kopplas ihop via id/for.
  const inputId = name || label.toLowerCase();

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
