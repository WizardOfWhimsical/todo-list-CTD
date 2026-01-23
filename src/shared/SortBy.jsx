import Form from 'react-bootstrap/Form';

export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <Form.Group className="sort-container">
      <Form.Label htmlFor="sortBy">Sort By: </Form.Label>
      <Form.Select
        aria-label="sort by"
        name="sortBy"
        id="sortBy"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="creationDate">Creation Date</option>
        <option value="title">Title</option>
      </Form.Select>

      <Form.Label htmlFor="order">Order: </Form.Label>
      <Form.Select
        arai-label="sort direction"
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value)}
        name="order"
        id="order"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Form.Select>
    </Form.Group>
  );
}
