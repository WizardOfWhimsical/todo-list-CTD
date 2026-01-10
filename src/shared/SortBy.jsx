export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <>
      <label htmlFor="sortBy">Sort By</label>
      <select name="sortBy" id="sortBy">
        <option value="creationDate" selected>
          Creation Date
        </option>
        <option value="title">Title</option>
      </select>
      <label htmlFor="order">Order</label>
      <select name="order" id="order">
        <option value="asc" selected>
          Ascending
        </option>
        <option value="desc">Descending</option>
      </select>
    </>
  );
}
