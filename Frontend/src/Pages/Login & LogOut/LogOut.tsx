import { useNavigate } from "react-router-dom"
import { useGlobalStudentData } from "../../Utils/GlobalStudentData"
import pb from "../../Utils/Pocketbase";

export default function LogOut() {
    let navigate = useNavigate()
    const {globalData} = useGlobalStudentData()

    async function logOut() {
      try{
        const record = await pb.collection('Students').getOne(globalData);

        const data = {
          "Name": record.Name,
          "password": record.password,
          "voted": true,
          "class": record.class
      };
      
      const recordr = await pb.collection('Students').update(record.id, data);
      navigate('/')
      }catch(e){
        console.log(e)
      } 
    }
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-16'>
            <h1 className="text-6xl">Thanks for Voting</h1>
            <button className='p-2 bg-green-500 rounded shadow text-xl' onClick={()=> logOut()}>Log Out</button>
        </div>
    </div>
  )
}
