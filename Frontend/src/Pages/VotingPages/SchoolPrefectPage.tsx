import { Route, Routes } from 'react-router-dom'
import BoysSchoolPrefect from './SchoolPrefect/BoysSchoolPrefect'
import GirlsSchoolPrefect from './SchoolPrefect/GirlsSchoolPrefect'

export default function SchoolPrefectPage() {
  return (
    <Routes>
      <Route path='/' element={<BoysSchoolPrefect />}/>
      <Route path='/Girls' element={<GirlsSchoolPrefect />}/>
    </Routes>
  )
}
