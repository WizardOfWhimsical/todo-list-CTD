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
        <option value="">Choose a food</option>
        <hr />
        <optgroup label="Fruit">
          <option value="apple">Apples</option>
          <option value="banana">Bananas</option>
          <option value="cherry">Cherries</option>
          <option value="damson">Damsons</option>
        </optgroup>
        <hr />
        <optgroup label="Vegetables">
          <option value="artichoke">Artichokes</option>
          <option value="broccoli">Broccoli</option>
          <option value="cabbage">Cabbages</option>
        </optgroup>
        <hr />
        <optgroup label="Meat">
          <option value="beef">Beef</option>
          <option value="chicken">Chicken</option>
          <option value="pork">Pork</option>
        </optgroup>
        <hr />
        <optgroup label="Fish">
          <option value="cod">Cod</option>
          <option value="haddock">Haddock</option>
          <option value="salmon">Salmon</option>
          <option value="turbot">Turbot</option>
        </optgroup>
      </select>
    </>
  );
}
