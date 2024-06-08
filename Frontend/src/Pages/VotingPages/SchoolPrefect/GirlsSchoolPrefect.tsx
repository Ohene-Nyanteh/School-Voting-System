import { useEffect, useState } from "react";
import pb from "../../../Utils/Pocketbase";
import GhanassLogo from "../../../assets/ghanass_logo.jfif";
import { useNavigate } from "react-router-dom";

export default function GirlsSchoolPrefect() {
  const[record, setRecord]: any = useState()
  const [voted, setVoted] = useState(false)
  let navigate = useNavigate()

  /* Get list of Female Girl Prefects */
  const getSchoolPrefectData = async () => {
    const records = await pb.collection("Prefects").getFullList({
      sort: "-created",
      filter: `type = "School Prefect" && Gender="Female"`,
    });
    // console.log(records)
     setRecord(records);
    console.log(record);
  };

  type prop = {
    id: string,
    name: string,
    info: string,
    Gender: string,
    type: string
    number_of_votes: number
  }

  // Voting Function
  const AddVote = async({id,name, info, Gender, type, number_of_votes}: prop) =>{
    setVoted(true)
    const data = {
      "Name": name,
      "Info": info,
      "number_of_votes": number_of_votes + 1,
      "Gender": Gender,
      "type": type
  };
  
  const record = await pb.collection('Prefects').update(id, data);
  console.log(record)
  } 





useEffect(() => {
  getSchoolPrefectData();
}, [])

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-fit p-6 rounded shadow flex flex-col justify-center border">
        <div className="flex items-center w-full text-2xl font-semibold">
          <img src={GhanassLogo} className="w-[60px] h-[60px]" />
          <span>Ghana Senior High School Voting Portal</span>
          <img src={GhanassLogo} className="w-[60px] h-[60px]" />
        </div>
          <span className="text-xl text-center">School Prefect</span>
          <span className="text-lg text-center font-bold">Girls</span>
        <div className="p-2 flex flex-col gap-2 overflow-y-auto">
          {record &&           
          <div className="flex flex-col gap-4">
            {record.map((r: any) => (
              <div className="flex bg justify-between items-center hover:bg-gray-200 hover:shadow-sm p-4 rounded px-3">
                <img   src={`http://127.0.0.1:8090/api/files/${r.collectionId}/${r.id}/${r.Image}`} className="rounded " width={100} height={100} alt="" />
                <span>{r.Name}</span>
                <button disabled={voted} className={`px-4 py-2 bg-green-500 h-fit w-fit rounded ${voted && 'opacity-70 cursor-not-allowed'}`} onClick={()=> AddVote({id: r.id, name: r.Name, Gender: r.Gender, type: r.type, info: r.info, number_of_votes: r.number_of_votes})}>
                    Vote
                  </button>
              </div>
            ))}
          </div>}

        </div>
        <button
        disabled={voted ? false : true}

          className={`w-full p-2 bg-green-500 shadow rounded ${!voted && 'opacity-70 cursor-not-allowed'}`}
          onClick={() => navigate("/CompoundPrefectPage")}
        >
          Next
        </button>
      </div>
    </div>
  );
}
