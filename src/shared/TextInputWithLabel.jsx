export default function TextInputWithLabel({
  elementId,
  labelText,
  value,
  ref,
  onChange,
}) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type="text"
        id={elementId}
        value={value}
        ref={ref}
        onChange={onChange}
      />
    </>
  );
}
