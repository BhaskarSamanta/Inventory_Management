import React from 'react'
import { DashBoard } from './components'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <div className="App">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-3xl">Inventory Management System</h1>
            </header>
            <main className="p-4">
                <DashBoard />
            </main>
        </div>
    </div>
  )
}

export default App
