import { useId } from 'react';
import Form from 'react-bootstrap/Form';

export default function TextInputWithLabel({
  labelText,
  value,
  ref,
  onChange,
  onKeyDown,
}) {
  const id = useId();
  return (
    <Form.Group>
      <Form.Label htmlFor={id}>{labelText}</Form.Label>
      <Form.Control
        type="text"
        id={id}
        value={value}
        ref={ref}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </Form.Group>
  );
}
