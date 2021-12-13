import { useState } from 'react'
import axios from 'axios'

function App() {
  const [obj, setObj] = useState({ name: "", age: "", country: "", position: "", wage: "" })

  const handleChange = e => setObj({ ...obj, [e.target.id]: e.target.value })

  const addEmployee = () => {
    axios.post('http://localhost:5000/create', obj);
  }

  return (
    <div className="App">
      <div className="information">
        <label htmlFor="name">Name:</label>
        <input onChange={ handleChange } value={ obj.name } type="text" id="name" />
        <label htmlFor="age">Age:</label>
        <input onChange={ handleChange } value={ obj.age } type="number" id="age" />
        <label htmlFor="country">Country:</label>
        <input onChange={ handleChange } value={ obj.country } type="text" id="country" />
        <label htmlFor="position">Position:</label>
        <input onChange={ handleChange } value={ obj.position } type="text" id="position" />
        <label htmlFor="wage">Wage(year):</label>
        <input onChange={ handleChange } value={ obj.wage } type="number" id="wage" />
        <button onClick={ addEmployee }>Add employee</button>
      </div>
    </div>
  );
}

export default App;
