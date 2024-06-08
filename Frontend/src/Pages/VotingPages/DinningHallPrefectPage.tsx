import { Route, Routes } from 'react-router-dom'
import BoysDiningHallPrefect from './DiningHallPrefect/BoysDiningHallPrefect'
import GrilsDiningHallPrefect from './DiningHallPrefect/GirlsDiningHallPrefect'

export default function SchoolPrefectPage() {
  return (
    <Routes>
      <Route path='/' element={<BoysDiningHallPrefect />}/>
      <Route path='/Girls' element={<GrilsDiningHallPrefect />}/>
    </Routes>
  )
}
