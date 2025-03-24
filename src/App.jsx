import { useState } from 'react'
import Chat from './components/Chat.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen'>
      <Chat />
    </div>
  )
}

export default App
