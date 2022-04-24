import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleFormSubmit = event => {
    event.preventDefault();
    // taking input data from input fields
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);


    //  now post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST', /* fetch default value is get. As sending so define the method POST */
      headers: { 'Content-type': 'application/json' }, /* didn't understand */
      body: JSON.stringify(user) /* as storage data format is JSON.stringified by default so stringified the  data that is gotten from form */
    })
      .then(res => res.json()) 
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers)
        console.log(data)
      })
  };
  return (
    <div className="App">
      <form onSubmit={handleFormSubmit} >
        <input type="text" name="name" id="" placeholder='name' />
        <input type="email" name="email" id="" placeholder='email' />
        <input type="submit" value="Submit" />
      </form>
      <h1>Total users from self made node data : {users.length}</h1>
      <ul>
        {
          users.map(user => <li key={user.id}>  User id :{user.id}, <br /> User name : {user.name} <br /> Email : {user.email} <br /></li>)
        }
      </ul>
    </div>
  );
}

export default App;
