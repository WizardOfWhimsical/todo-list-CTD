export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <>
      <label htmlFor="sortBy">Sort By</label>
      <select
        name="sortBy"
        id="sortBy"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="creationDate">Creation Date</option>
        <option value="title">Title</option>
      </select>

      <label htmlFor="order">Order</label>
      <select
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value)}
        name="order"
        id="order"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </>
  );
}
