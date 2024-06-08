import { Route, Routes } from 'react-router-dom'
import BoysCompoundPrefectPage from './CompoundPrefect/BoysCompoundPrefect'
import GirlsCompoundPrefectPage from './CompoundPrefect/GirlsCompoundPrefect'

export default function SchoolPrefectPage() {
  return (
    <Routes>
      <Route path='/' element={<BoysCompoundPrefectPage />}/>
      <Route path='/Girls' element={<GirlsCompoundPrefectPage />}/>
    </Routes>
  )
}
