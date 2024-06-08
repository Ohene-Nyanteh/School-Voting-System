import { Route, Routes } from 'react-router-dom'
import BoysPrepPrefect from './PrepPrefect/BoysPrepPrefect'
import GirlsPrepPrefect from './PrepPrefect/GirlsPrepPrefect'

export default function PrepPrefect() {
  return (
    <Routes>
      <Route path='/' element={<BoysPrepPrefect />}/>
      <Route path='/Girls' element={<GirlsPrepPrefect />}/>
    </Routes>
  )
}
