import { useEffect, useState } from 'react';
import './reset.css';
import Login from './components/login/login';
import axios from 'axios';
import Index from './components/index';
import acat from './req/requests';


function App() {
  let [isLogin, setLogin] = useState(false);
  let canSet = true;
  useEffect(() => {
    if (!canSet) {
      return;
    }
    canSet = false;
    
    let token: string = localStorage.getItem('access_token') as string;
    if (token) {
      axios.defaults.headers = Object.assign(axios.defaults.headers, {
        'access_token': token
      });
      setLogin(true);
    }
    acat.getEvaluate();
  }, [])

  if (isLogin) {
    return (
      <div className="App">
        <Index setLogin={setLogin} />
      </div>
    )
  }

  return (
    <div className="App">
      <Login setLogin={setLogin} />
    </div>
  )
}

export default App;
