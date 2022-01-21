import React, {useState} from 'react'
import axios from 'axios'
import './App.css';


export default function App() {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ birthday, setBirthday ] = useState('')
  const [ checked, setChecked ] = useState(false)
  const [ form, setForm ] = useState({})
  const [ submitted, setSubmitted ] = useState(false)


  const handleToggle = () => {
    setChecked(!checked)
  }

  const handleClick = e => {
    e.preventDefault()
    setName('')
    setEmail('')
    setBirthday('')
    setChecked(false)
  }

  const handleChange = e => {
    if (e.target.type === 'text') {
      setName(e.target.value)
    } else if (e.target.type === 'email') {
      setEmail(e.target.value)
    } else {
      setBirthday(e.target.value)
  }
}

  const handleSubmit = e => {
    e.preventDefault()
    setForm({name, email, birthday, checked})
    axios.post('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', form)
      .then(() => {
        setForm({})
        setSubmitted(!submitted)
      })
      .catch(err => {
        alert(err)
      })

  }

  return (
    <div className="App">
      { submitted ? <><h1>Thanks for your response</h1></> :<>
      <h1>Contact Us</h1>
      <form id='form' onSubmit={handleSubmit}>
        <label>Name</label>
        <input required
          type='text'
          placeholder='name'
          value={name}
          onChange={handleChange}
        />
        <label>Email</label>
        <input required
          type='email'
          placeholder='email'
          value={email}
          onChange={handleChange}
        />
        <label>Birthday</label>
        <input 
          type='date'
          placeholder='date'
          value={birthday}
          onChange={handleChange}
        />
        <div className="check">
        <label>I agree to be contacted via email</label>
          <input required
          type='checkbox'
          onChange={handleToggle}
          name='checkbox'
          checked={checked}
        />
        </div>
        <div className='buttons'>
        <button onClick={handleClick}>Clear</button>
        <button onSubmit={handleSubmit}>Submit</button>
        </div>
      </form>
      </>
}
    </div>
  );
}