import React from 'react'
import { DashBoard, AddItems, Header } from './components'
// import { Provider } from 'react-redux'
function App() {
  // const [count, setCount] = useState(0)
  return (
    <div>
      <div className="App">
            <main className="p-4">
                <AddItems />
            </main>
        </div>
    </div>
  )
}
export default App
