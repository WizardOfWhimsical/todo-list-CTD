import { useSearchParams } from 'react-router';
import { Form } from 'react-bootstrap';

export default function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams('');
  const currentStatus = searchParams.get('status') || 'all';

  function handleStatusChange(status) {
    if (status === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', status);
    }
    setSearchParams(searchParams);
  }

  return (
    <Form.Group className="flex-column">
      <Form.Label htmlFor="statusFilter">Show:</Form.Label>
      <Form.Select
        id="statusFilter"
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="all">All To-Dos</option>
        <option value="active">Active To-Dos</option>
        <option value="completed">Completed To-Dos</option>
      </Form.Select>
    </Form.Group>
  );
}
