import Form from 'react-bootstrap/Form';

export function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <Form.Group className="flex-column">
      <Form.Label htmlFor="filterInput">Search Todo's: </Form.Label>
      <Form.Control
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="search todos here..."
      />
    </Form.Group>
  );
}
