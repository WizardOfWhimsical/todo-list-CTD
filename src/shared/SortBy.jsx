export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <>
      <label for="hr-select">Your favorite food</label> <br />
      <select name="foods" id="hr-select">
        <option value="">Sort</option>
        <hr />
        <optgroup label="Sort By">
          <option value="creationDate">Creation Date</option>
          <option value="title">Title</option>
        </optgroup>
        <hr />
        <optgroup label="Order">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </optgroup>
      </select>
    </>
  );
}
