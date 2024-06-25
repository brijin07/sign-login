import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Otp from './pages/Otp'


function App() {

  return (
    <> 
    <Routes>
    <Route path='/sign' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/otp' element={<Otp/>}/>


    </Routes>

    </>
  )
}

export default App
