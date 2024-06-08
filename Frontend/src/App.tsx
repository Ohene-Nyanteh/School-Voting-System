import './App.css'
import Login from './Pages/Login & LogOut/Login'
import { Route, Routes } from 'react-router-dom'
import SchoolPrefectPage from './Pages/VotingPages/SchoolPrefectPage'
import EntertainmentPrefectPage from './Pages/VotingPages/EntertainmentPrefectPage'
import CompondPrefectPage from './Pages/VotingPages/CompondPrefectPage'
import DinningHallPrefectPage from './Pages/VotingPages/DinningHallPrefectPage'
import ErrorPage from './Pages/ErrorPage'
import LogOut from './Pages/Login & LogOut/LogOut'
import Admin from './Systems/Admin'
import DayPrefect from './Pages/VotingPages/DayPrefect'
import PrepPrefect from './Pages/VotingPages/PrepPrefect'


function App() {
  return (
<Routes>
  <Route path='/' element={<Login />}/>
  <Route path='/Admin/*' element={<Admin />}/>
  <Route path='/Logout' element={<LogOut />}/>
  <Route path='/schoolPrefectPage/*' element={<SchoolPrefectPage />}/>
  <Route path='/EntertainmentPrefectPage/*' element={<EntertainmentPrefectPage />}/>
  <Route path='/DayPrefect/*' element={<DayPrefect />}/>
  <Route path='/PrepPrefect/*' element={<PrepPrefect />}/>
  <Route path='/CompoundPrefectPage/*' element={<CompondPrefectPage />}/>
  <Route path='/DiningPrefectPage/*' element={<DinningHallPrefectPage />}/>
  <Route path='*' element={<ErrorPage />}/>
</Routes>

  )
}

export default App
