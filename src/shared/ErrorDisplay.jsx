import { Button } from 'react-bootstrap';

export default function ErrorDisplay({ error, onClick }) {
  return (
    <div>
      <p>{error}</p>
      <Button type="button" onClick={() => onClick()}>
        Clear Error
      </Button>
    </div>
  );
  // <div className="error-container">
  //   <h2>Error:</h2>
  //   <p>
  //     <em>{error}</em>
  //   </p>
  //   <Button type="button" onClick={onClick}>
  //     Clear
  //   </Button>
  // </div>
}
