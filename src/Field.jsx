import { useId } from 'react';

export function Field({ name, labelText }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input type="text" name={name} id={id} />
    </>
  );
}

//  <label htmlFor="another">description</label>
//         <textarea
//           id="another"
//           value={itemDescription}
//           onChange={(evt) => {
//             setItemDescription(evt.target.value);
//           }}
//         />
