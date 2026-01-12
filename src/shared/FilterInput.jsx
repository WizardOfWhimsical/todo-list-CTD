export function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <>
      <label htmlFor="filterInput">Search Todo's:</label>
      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="search todos here..."
      />
    </>
  );
}
