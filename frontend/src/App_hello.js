// src/App.js
import React, { useEffect, useState } from 'react';
import axios from './axiosConfig'; // 引入配置好的Axios实例

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('hello/') // 只需指定相对路径
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;