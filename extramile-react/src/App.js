import './App.css';
import {useState } from 'react';
import SearchForm from './components/SearchForm';

function App() {
  const [state, setState] = useState("Not successful");
  var renderData = (data)=>{
    setState(data);
  }
  return (
    <div className="App">
      <h1>Extra Mile Website</h1>
      <SearchForm renderData = {renderData}/>
      <p>{JSON.stringify(state)}</p> 
    </div>
  );
}

export default App;
