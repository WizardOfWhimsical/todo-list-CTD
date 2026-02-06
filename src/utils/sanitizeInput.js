import DOMPurify from 'dompurify';
import { isValidTodoTitle as isValid } from './todoValidation';

export default function sanitizeInput(input) {
  if (!isValid(input)) {
    return 'can not be empty text input';
  }

  const cleanInput = DOMPurify(input.trim(), {
    ALLOWED_TAG: [],
    ALLOWED_ATTR: [],
  });

  if (cleanInput === '' || cleanInput === ' ') {
    return 'Only non-malious chracters';
  }

  return cleanInput;
}
