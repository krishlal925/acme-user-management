import React, {useState, useEffect} from 'react';
import './App.css';
import qs from 'qs';
import axios from 'axios';

const API = 'https://acme-users-api-rev.herokuapp.com/api';

const Nav = ({ view, setView, users })=> {
  return (
    <nav>
      <a href={`#${qs.stringify({view: 'home'})}`} className={ view === 'home' ? 'selected': ''} >
        Home
      </a>
      <a href={`#${qs.stringify({view: 'users'})}`} className={ view === 'users' ? 'selected': ''} >
        Users ({ users.length })
      </a>
    </nav>
  );
}

const Users = ({users, params}) => {

  console.log({users})
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                {/* <a href={`#${qs.stringify({view: "users", id: user.id})}`}> { user.fullName } </a> */}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

//{`#${qs.stringify({view: "user", id: user.id})}`}

const getHash = ()=> {
  return window.location.hash.slice(1);
}




function App() {
  const [ params, setParams ] = useState(qs.parse(getHash()));
  const [users, setUsers] = useState([])

  useEffect(()=> {
    window.addEventListener('hashchange', ()=> {
      setParams(qs.parse(getHash()));
    });
    setParams(qs.parse(getHash()));
  }, []);

  useEffect(()=> {
    axios.get(`${API}/users`)
      .then( response => setUsers( response.data ))
  }, []);


  return (
    <div className="App">
      <Nav
        users = {users}
        view = {params}
        setView = {setParams}
        />
      <main>
        { params.view === 'users' && <Users users={ users } params = {params}/> }
      </main>
    </div>
  );
}

export default App;
