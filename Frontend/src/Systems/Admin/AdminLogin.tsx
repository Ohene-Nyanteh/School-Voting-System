import { useState } from "react";
import GhanassLogo from "../../assets/ghanass_logo.jfif";
import Modals from "../../Components/Modals/Modals";
import { useNavigate } from "react-router-dom";
import pb from "../../Utils/Pocketbase";
import { useGlobalAdminData } from "../../Utils/GlobalAdminData";

export default function AdminLogIn() {
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const {setAdminData} = useGlobalAdminData()


    const AdminLoginFunction = async() => {
        try{
            const authData = await pb.collection('users').authWithPassword(
                name,
                password,
             );

             
             const record = await pb.collection('users').getOne(authData.record.id);




             if (record.isEc){
                 setAdminData(record.id)
                navigate('AdminPage/Stats/')
             }
             else{
                 setAdminData(authData.record.id)
                navigate('AdminPage/')
             }



        }catch(e){
            console.log(e)
            setError('Credentials Are InCorrect. Try Again')
        }

    }

  return (
    <section>
    <Modals/>
    <div className="w-full h-screen flex bg-green-2 justify-center items-center">
        <div className="bg-white rounded p-4 flex gap-8 flex-col shadow-md border border-green-400">
        <div className="flex items-center w-full text-2xl font-semibold">
            <img src={GhanassLogo} className="w-[60px] h-[60px]"/>
            <span>Ghana Senior High School Voting Portal</span>
            <img src={GhanassLogo} className="w-[60px] h-[60px]"/>
        </div>
        <div className="flex flex-col gap-3">
        <span className="text-xl text-center">Administration Interface</span>
            {error && <span className="p-1 rounded text-white bg-red-600">{error}</span>}
            <div className="w-full flex flex-col gap-2">
                <span className="text-xl">Username: </span>
                <input type="text" placeholder='Username' onChange={(e)=> setName(e.target.value)} className='border-green-500 border p-3 rounded'/>
            </div>
            <div className="w-full flex flex-col gap-2">
                <span className="text-xl">Password: </span>
                <input type="password" placeholder='************' onChange={(e)=> setPassword(e.target.value)} className='border-green-500 border p-3 rounded'/>
            </div>
            <button className="bg-green-500 p-2 rounded" onClick={()=> AdminLoginFunction()}>Submit</button>
        </div>
        </div>

    </div>
  </section>
  )
}
