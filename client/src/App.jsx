import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/Signin'
import SignOut from './pages/SignOut'
import About from './pages/About'
import Header from './components/Header'

function App() {

  return (
    <BrowserRouter>

      <Header />
      <div  className='text-[#b91c1c]'>mern estate</div>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-out' element={<SignOut/>} />
        <Route path='/about' element={<About/>} />
      </Routes>

    </BrowserRouter>
    
  )
}

export default App
