import { useState } from "react";
import AutoComplete from "./components/autoComplete/AutoComplete.tsx";
import './App.css'

function App() {
  const [search, setSearch] = useState('');

  const fetchData = async (input: string): Promise<string[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const items = ['apple','strawberry', 'banana', 'grapes', 'orange', 'pear', 'pineapple'];
        const filtered = items.filter(item => item.toLowerCase().includes(input.toLowerCase()));
        resolve(filtered);
      }, 500);
    });
  };

  return (
    <>
      <div className="centered-container">
        <h1>My auto complete component</h1>
        <AutoComplete fetchData={fetchData} onSelect={setSearch}/>
        <p>{`You try to find: ${search}`}</p>
      </div>
    </>
  )
}

export default App
