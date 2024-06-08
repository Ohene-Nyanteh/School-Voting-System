import SchoolPrefectStats from "./Stats/SchoolPrefectStats";
import EntertainmentPrefect from "./Stats/EntertainmentPrefectStats";
import CompoundPrefectStats from "./Stats/CompoundPrefectStats";
import DinningPrefect from "./Stats/DinningPrefectStats";
import pb from "../../Utils/Pocketbase";
import { useState } from "react";
import DayPrefectStats from "./Stats/DayPrefectStats";
import PrepPrefectStats from "./Stats/PrepPrefectStats";

export default function Statistics() {
  const [votedStudents, setVotedStudents]: any = useState([]);

  const totalVotesCalculator = async() => {
    const stuRec = await pb.collection("Students").getFullList({
      sort: "-created",
    });
  
    const votedStudents: any = stuRec.filter(
      (record) => record.voted === true
    );
    setVotedStudents(votedStudents);
  }

  totalVotesCalculator()
  
  return (
    <div className="w-full h-full overflow-auto p-6">
      <div className="w-full flex justify-between p-2">
        <span className="text-3xl font-bold">STATISTICS</span>
        <span className="p-2 rounded bg-green-400">TOTAL NUMBER OF VOTES: {votedStudents.length}</span>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto">
        <div>
          <h1 className="text-xl m-2 font-bold">SCHOOL PREFECTS</h1>
          <SchoolPrefectStats/>
        </div>
        <div>
          <h1 className="text-xl m-2 font-bold">Compound Prefects</h1>
          <CompoundPrefectStats/>
        </div>
        <div>
          <h1 className="text-xl m-2 font-bold">Entertainmnent Prefects</h1>
          <EntertainmentPrefect/>
        </div>
        <div>
          <h1 className="text-xl m-2 font-bold">Dining Prefects</h1>
          <DinningPrefect/>
        </div>
        <div>
          <h1 className="text-xl m-2 font-bold">Day Prefects</h1>
          <DayPrefectStats/>
        </div>
        <div>
          <h1 className="text-xl m-2 font-bold">Prep Prefects</h1>
          <PrepPrefectStats/>
        </div>
      </div>
    </div>
  );
}
