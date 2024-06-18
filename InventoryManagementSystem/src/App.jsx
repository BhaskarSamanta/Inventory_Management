import React from 'react'
import './App.css'
import  Header  from './components/Header/Header'
import  Home  from './components/Home/Home'
import  Footer  from './components/Footer/Footer'
import  SideBar  from './components/sideBar/SideBar'
import  Signup from './components/SignupAndLogin/Signup'
import { Provider } from 'react-redux'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
    {/* <Provider>  */}
      <Signup/>
    {/* </Provider> */}
    </div>
  )
}

export default App
