import { useId } from 'react';
import Form from 'react-bootstrap/Form';
// import sanitizeInput from '../utils/sanitizeInput';

export default function TextInputWithLabel({
  className = 'flex-column',
  labelText,
  ...controlProps
}) {
  const id = useId();
  return (
    <Form.Group className={className}>
      <Form.Label htmlFor={id}>{labelText}</Form.Label>
      <Form.Control
        minLength="3"
        maxLength="40"
        type="text"
        id={id}
        {...controlProps}
        required
      />
    </Form.Group>
  );
}
