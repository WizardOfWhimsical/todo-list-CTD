/**
 *
 * @param {{baseName: string, baseDescription: string, id:string}} props
 * @returns
 */
export function Product(props) {
  // const { baseName, baseDescription } = props;
  return (
    <li>
      <div className="itemCard">
        <h2>{props.baseName}</h2>
        <p>{props.baseDescription}</p>
      </div>
    </li>
  );
}

// function ListItemCard(props) {
//   props.map((prop) => {
//     return (
//       <li key={prop.id}>
//         <div className="itemCard">
//           <h2>{prop.baseName}</h2>
//           <p>{prop.baseDescription}</p>
//         </div>
//       </li>
//     );
//   });
// }
// export default ListItemCard;
