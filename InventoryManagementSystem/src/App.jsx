import React from 'react'
import './App.css'
import Signup from './components/SignupAndLogin/Signup'
import Login from './components/SignupAndLogin/Login'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
    {/* <Provider>  */}
      <Signup/>
      <Login/>
    {/* </Provider> */}
    </div>
  )
}

export default App
