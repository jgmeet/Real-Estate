import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path='/' element={<Home/>} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/about' element={<About/>} />
      </Routes>

    </BrowserRouter>
    
  )
}

export default App
