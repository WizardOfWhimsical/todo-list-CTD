export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <>
      {/* <label for="hr-select">Your favorite food</label> <br /> */}
      <label htmlFor="sortBy">Sort By</label>
      <select id="sortBy">
        <option value="creationDate">Creation Date</option>
        <option value="title">Title</option>
      </select>
      <label htmlFor="order">Order</label>
      <select id="order">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </>
  );
}
