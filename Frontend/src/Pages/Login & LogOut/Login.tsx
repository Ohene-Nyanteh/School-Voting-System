import { useState } from "react";
import GhanassLogo from "../../assets/ghanass_logo.jfif";
import Modals from "../../Components/Modals/Modals";
import validation from "./Validation";
import { useNavigate } from "react-router-dom";
import { useGlobalStudentData } from "../../Utils/GlobalStudentData";

export default function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const {setglobalData} = useGlobalStudentData()
    const [password, setPassword] = useState('')

  return (
    <section>
    <Modals/>
    <div className="w-full h-screen flex bg-green-2 justify-center items-center">
        <div className="bg-white rounded p-4 flex gap-14 flex-col shadow-md border border-green-400">
        <div className="flex items-center w-full text-2xl font-semibold">
            <img src={GhanassLogo} className="w-[60px] h-[60px]"/>
            <span>Ghana Senior High School Voting Portal</span>
            <img src={GhanassLogo} className="w-[60px] h-[60px]"/>
        </div>
        <div className="flex flex-col gap-10">
            {error && <span className="p-1 rounded text-white bg-red-600">{error}</span>}
            <div className="w-full flex flex-col gap-2">
                <span className="text-xl">Password: </span>
                <input type="password" placeholder='************' onChange={(e)=> setPassword(e.target.value)} className='border-green-500 border p-3 rounded'/>
            </div>
            <button className="bg-green-500 p-2 rounded" onClick={() => validation({password: password, setError: setError, navigate: navigate, setglobalData: setglobalData})}>Submit</button>
        </div>
        </div>

    </div>
  </section>

  );
}
