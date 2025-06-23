import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Login, SignUp } from './components/Login_SignUp'
import { MainPage } from './components/Main_Page'
import './App.css'

function App() {
  const [authorized, setAuthorization] = useState(false)
  
  const updateAuthorization = () => {
    setAuthorization(!authorized)
  }

  return (
    <div className="App">  
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login authorized={authorized} updateAuthorization={updateAuthorization} />} />
          <Route path="/signup" element={<SignUp authorized={authorized} updateAuthorization={updateAuthorization} />} />
          <Route path="/home" element={<MainPage authorized={authorized} updateAuthorization={updateAuthorization} />} />
          <Route path="*" element={<h1 className="error">Error 404: Page not found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
