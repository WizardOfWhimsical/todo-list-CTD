import { useState } from 'react';
import './App.css';
import ToDoList from './todolist';
import ToDoForm from './ToDoForm';
import inventoryData from './data.json';
// import ListItemCard from './ListItemCard';
import { Product } from './Product';
import { ProductList } from './ProductList';
import { Field } from './Field';

// unique numbers id- react form library
// console.log(window.crypto.randomUUID());

function App() {
  const [inventory, setInventory] = useState(inventoryData.inventory);
  // const [count, setCount] = useState(0);
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
        <Field name="baseName" labelText="Item Name" />
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
      <ProductList>
        {/* <Product baseName="cool kat" baseDescription="Calming" id="001" /> */}
        {/* <Product location="EARTH" /> */}
        {inventory.map(({ baseName, baseDescription, id }) => {
          const userFacingInfo = {
            baseName,
            baseDescription,
          };
          return <Product {...userFacingInfo} key={id} />;
        })}
      </ProductList>
    </main>
  );
}

export default App;
