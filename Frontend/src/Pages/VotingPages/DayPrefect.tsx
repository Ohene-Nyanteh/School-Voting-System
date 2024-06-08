import { Route, Routes } from 'react-router-dom'
import GirlsDayPrefect from './DayPrefect/GirlsDayPrefect'
import BoysDayPrefect from './DayPrefect/BoysDayPrefect'

export default function DayPrefect() {
  return (
    <Routes>
      <Route path='/' element={<BoysDayPrefect />}/>
      <Route path='/Girls' element={<GirlsDayPrefect />}/>
    </Routes>
  )
}
