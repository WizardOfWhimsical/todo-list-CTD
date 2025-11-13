import { useState } from 'react';
import './App.css';
import ToDoList from './todolist';
import ToDoForm from './ToDoForm';
import inventoryData from './data.json';
import ListItemCard from './ListItemCard';

// console.log(inventoryData.inventory);

// function App() {
//   return (
//     <>
//       <h1>My Todos</h1>
//       <ToDoForm />
//       <ToDoList />
//     </>
//   );
// }

// unique numbers id- react form library
// console.log(window.crypto.randomUUID());
function App() {
  const [inventory, setInventory] = useState(inventoryData.inventory);
  const [count, setCount] = useState(0);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  console.log(itemDescription);
  const handleButtonClick = (e) => {
    e.preventDefault();
    setInventory((prev) => {
      const newItem = {
        id: window.crypto.randomUUID(),
        baseName: itemName,
        variantName: 'Black',
        price: 22.99,
        baseDescription: itemDescription,
        variantDescription: 'Black with an orange logo',
        image: 'coolBucket-hat-black.png',
        inStock: 'TRUE',
      };
      // prev.push(newItem);
      // return prev;
      return [...prev, newItem];
    });
  };

  return (
    <main>
      <div className="coming-soon">
        <h1>CTD Swag</h1>
        <div style={{ height: 100, width: 100 }}>
          {/* <img src={ctdLogo} alt="Code The Dream Logo" /> */}
        </div>
      </div>

      <form onSubmit={handleButtonClick}>
        <label htmlFor="inputField">Item Name</label>
        <input
          type="text"
          id="inputField"
          value={itemName}
          onChange={(evt) => {
            setItemName(evt.target.value);
          }}
        />
        <label htmlFor="another">description</label>
        <textarea
          id="another"
          value={itemDescription}
          onChange={(evt) => {
            setItemDescription(evt.target.value);
          }}
        />
        {/* when passing a funtion to setBlah it will take the previous value of state */}
        <button type="submit">add</button>
      </form>

      <ul>
        <ListItemCard props={inventory} />
        {/* {inventory.map((item) => {
          return (
            <li key={item.id}>
              <div className="itemCard">
                <h2>{item.baseName}</h2>
                <p>{item.baseDescription}</p>
              </div>
            </li>
          );
        })} */}
      </ul>
    </main>
  );
}

export default App;
