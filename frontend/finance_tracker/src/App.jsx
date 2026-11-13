import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
    import Signup from './pages/Signup'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </>
  )
}

export default App
