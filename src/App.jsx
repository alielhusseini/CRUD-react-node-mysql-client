import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [obj, setObj] = useState({ name: "", age: "", country: "", position: "", wage: "" })
  const [employeeList, setEmployeeList] = useState([])

  const handleChange = e => setObj({ ...obj, [e.target.id]: e.target.value })

  const addEmployee = () => {
    axios.post('http://localhost:5000/create', obj)
      .then(res => setEmployeeList([...employeeList, obj]))
    setObj({ name: "", age: "", country: "", position: "", wage: "" })
  }

  const getEmployees = () => {
    axios.get('http://localhost:5000/employees')
      .then(res => setEmployeeList(res.data))
  }

  const deleteEmployee = e => {
    axios.delete(`http://localhost:5000/employees/${e.target.dataset.id}`)
    .then(res => console.log(res))
  }
  
  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(res => setEmployeeList(res.data))
  }, [employeeList])

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
      <div className="underline"></div>
      <div className="employees">
        <button onClick={getEmployees}>Show employees</button>
        { employeeList && employeeList.map(emp => {
          const { id, name, position, country } = emp;
          return (
            <div key={ id } className='container'>
              <div className='employee'>
                <h2>{ name }</h2>
                <h3>{ position }</h3>
                <h4>{ country }</h4>
              </div>
              <button data-id={ id } onClick={ deleteEmployee } className='delete'>Delete</button>
            </div>
          )
        }) }
      </div>
    </div>
  );
}

export default App;
