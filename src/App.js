import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://3f32b7bc.ngrok.io/users", {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        // saveEventDataLocally(data.data)
        setData(data.data);
      });
  }, []);

  const addUser = () => {
    const data = {
      name: "Dung",
      age: 20,
      gender: 1
    };
    fetch("http://3f32b7bc.ngrok.io/users", {
      method: "POST",
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => console.log("thanh cong"));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              style={{ padding: "10px 5px", backgroundColor: "blue" }}
            >
              {item.name}
            </div>
          );
        })}
        <button onClick={addUser}>AddUser 11 </button>
      </header>
    </div>
  );
}

export default App;
