
import './App.css';
import {useState, useEffect,useRef} from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(()=>{
    fetch("http://localhost:5000/users")
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[]);

  const handleAddUser =(e)=>{
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = {name, email};
    //handle data to server =>

    fetch('http://localhost:5000/users',{
      method:'post',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newUser)
    })
    .then(res=>res.json())
    .then(data=>{
      const addedUser = data;
      const newUsers = [...users, addedUser];
      setUsers(newUsers);
      console.log(data)
    })

    nameRef.current.value= '';
    emailRef.current.value = '';

  }
  return (
    <div className="App">


      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} placeholder="Name"/>
        <br />
        <input type="email" ref={emailRef} name="" id="" placeholder="Email" />
        <input type="submit" value="Submit" />
      </form>

      <ul>
        {
          users.map(user=><li key={user.id}>{user.name} {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
