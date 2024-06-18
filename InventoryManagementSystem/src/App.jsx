import React from 'react'
import './App.css'
import  Button  from './components/Button'
import  Header  from './components/Header/Header'
import  Home  from './components/Home/Home'
import  Footer  from './components/Footer/Footer'
import  SideBar  from './components/sideBar/SideBar'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
      <Home/>
      <SideBar/>
      <Footer/>
    </div>
  )
}

export default App
