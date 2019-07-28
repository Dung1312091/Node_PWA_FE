import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    fetch("http://babd8cde.ngrok.io/post",{
      method: 'GET',
    }).then(res => {
      return res.json()
    }).then(data => {
      setData(data)
    })
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {data.map((item,index)=> {
          return <div key={index} style={{padding:"10px 5px", backgroundColor:"blue"}}>{item.title}</div>
        })}
      </header>
    </div>
  );
}

export default App;
