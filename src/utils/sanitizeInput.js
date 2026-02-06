import { DomPlatform } from 'chart.js';
import DOMPurify from 'dompurify';

export default function sanitizeInput(input) {
  const cleanInput = DOMPurify(input.trim(), {
    ALLOWED_TAG: [],
    ALLOWED_ATTR: [],
  });
  if (cleanInput === '' || cleanInput === ' ') {
    return 'Cant be an empty string and only have non-malious chracters';
  }
  return cleanInput;
}
