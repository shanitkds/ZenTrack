import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginScreen from './component/LoginScreen'
import Message from './component/Message'
import Resours from "./component/ResourcesPage"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LoginScreen/>
    <Message/>
    <Resours/>
    
     {/* <div>hello</div> */}
    </>
  )
}

export default App
