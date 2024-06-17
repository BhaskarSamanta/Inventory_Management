import React from 'react'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Button
          type="submit"
          variant="default" // Change to any variant you need
          size="default"   // Change to any size you need
          className="mt-4"
        >
          Log In
        </Button>
    </div>
  )
}

export default App
