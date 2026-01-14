import { useId } from 'react';

export default function TextInputWithLabel({
  labelText,
  value,
  ref,
  onChange,
}) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input type="text" id={id} value={value} ref={ref} onChange={onChange} />
    </>
  );
}
