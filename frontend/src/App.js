import { useState } from 'react';

function App() {

  const [data, setData] = useState({
    name: '',
    username: '',
    password: ''
  });

  const handleRegister = () => {
    if (!data.name || !data.username || !data.password) {
      return alert("All fields are required");
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/v1/user-register", requestOptions)
      .then(response => alert("Saved"))
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}>
        <input type="text" id="name" placeholder='name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} ></input>
        <br></br>
        <input type="text" id="username" placeholder='username' value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} ></input>
        <br></br>
        <input type="text" id="password" placeholder='password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} ></input>
        <button>Register</button>
      </form>
    </div>
  );
}

export default App;
