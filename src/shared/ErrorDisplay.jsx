import { Button } from 'react-bootstrap';

export default function ErrorDisplay({ error, onClick }) {
  return (
    <div>
      <p>{error}</p>
      <Button type="button" onClick={onClick}>
        Clear Error
      </Button>
    </div>
  );
}
