import { Route, Routes } from 'react-router-dom'
import BoysEntertainmentPrefect from './EntertainmentPrefect/BoysEntertainmentPrefect'
import GirlsEntertainmentPrefect from './EntertainmentPrefect/GirlsEntertainmentPrefect'

export default function SchoolPrefectPage() {
  return (
    <Routes>
      <Route path='/' element={<BoysEntertainmentPrefect />}/>
      <Route path='/Girls' element={<GirlsEntertainmentPrefect />}/>
    </Routes>
  )
}
