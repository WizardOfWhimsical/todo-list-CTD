function ListItemCard(props) {
  props.map((prop) => {
    return (
      <li key={prop.id}>
        <div className="itemCard">
          <h2>{prop.baseName}</h2>
          <p>{prop.baseDescription}</p>
        </div>
      </li>
    );
  });
}
export default ListItemCard;
// {inventory.map((item) => {
//           return (
//             <li key={item.id}>
//               <div className="itemCard">
//                 <h2>{item.baseName}</h2>
//                 <p>{item.baseDescription}</p>
//               </div>
//             </li>
//           );
//         })}
