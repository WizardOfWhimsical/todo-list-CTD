export default function TextInputWithLabel({
  id,
  labelText,
  value,
  ref,
  onChange,
}) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input type="text" id={id} value={value} ref={ref} onChange={onChange} />
    </>
  );
}
