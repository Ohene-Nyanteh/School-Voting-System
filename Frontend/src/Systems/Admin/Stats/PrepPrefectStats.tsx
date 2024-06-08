import { useEffect, useState } from "react";
import pb from "../../../Utils/Pocketbase";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { FaUser } from "react-icons/fa";
import InfoModal from "./InfoModal";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA00FF",
  "#FF00AA",
  "#00FFAA",
];

export default function DiningPrefect() {
  const [PieDataBoys, setPieDataBoys]: any = useState([]);
  const [DisplayDataBoys, setDisplayDataBoys]: any = useState([]);
  const [DisplayDataGirls, setDisplayDataGirls]: any = useState([]);
  const [PieDataGirls, setPieDataGirls]: any = useState([]);
  const [votedStudents, setVotedStudents]: any = useState([]);
  const [openModalBoys, setOpenModalBoys]: any = useState(false);
  const [openModalGirls, setOpenModalGirls]: any = useState(false);

  const getPrefectsStatistics = async () => {
    try {
      const stuRec = await pb.collection("Students").getFullList({
        sort: "-created",
      });

      const votedStudents = stuRec.filter((record) => record.voted === true);
      setVotedStudents(votedStudents);

      const schoolPrefects = await pb.collection("Prefects").getFullList({
        sort: "-created",
        filter: `type="Prep Prefect"`,
      });

      const boysData = schoolPrefects
        .filter((prefect) => prefect.Gender === "Male")
        .map((prefect, index) => ({
          title: "Boys School Prefect",
          name: prefect.Name,
          value: Math.floor(
            (prefect.number_of_votes / votedStudents.length) * 100
          ),
          number_of_votes: prefect.number_of_votes,
          id: prefect.id,
          collectionId: prefect.collectionId,
          image: prefect.Image,
          fill: COLORS[index % COLORS.length], // Assign a color from the predefined set
        }));

      const girlsData = schoolPrefects
        .filter((prefect) => prefect.Gender === "Female")
        .map((prefect, index) => ({
          name: prefect.Name,
          value: Math.floor(
            (prefect.number_of_votes / votedStudents.length) * 100
          ),
          number_of_votes: prefect.number_of_votes,
          id: prefect.id,
          collectionId: prefect.collectionId,
          image: prefect.Image,
          fill: COLORS[index % COLORS.length], // Assign a color from the predefined set
        }));

      setPieDataBoys(boysData);
      setPieDataGirls(girlsData);
      setDisplayDataBoys(boysData);
      setDisplayDataGirls(girlsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrefectsStatistics();
  }, []);

  return (
    <div className="flex gap-4 w-full">

        <InfoModal
          show={openModalBoys}
          data={DisplayDataBoys}
          onClose={() => setOpenModalBoys(false)}
        />

        <InfoModal
          show={openModalGirls}
          data={DisplayDataGirls}
          onClose={() => setOpenModalGirls(false)}
        />


      <div
        className="w-full shadow border p-2 hover:cursor-pointer hover:bg-gray-50"
        onClick={() => setOpenModalBoys(true)}
      >
        <h1 className="text-lg font-bold">Boys</h1>
        <div className="w-full hover:cursor-pointer hover:bg-gray-50 items-center rounded-md flex gap-4 overflow-y-auto">
          <div className="w-full">
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={PieDataBoys}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {PieDataBoys.map((entry:any, index:any) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div className="flex flex-col w-full gap-2">
            {DisplayDataBoys.map((data:any) => (
              <span className="flex gap-2 items-center" key={data.id}>
                <FaUser /> {data.name} -- {data.number_of_votes} Votes
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="w-full shadow border p-2 hover:cursor-pointer hover:bg-gray-50"
        onClick={() => setOpenModalGirls(true)}
      >
        <h1 className="text-lg font-bold">Girls</h1>
        <div className="w-full hover:cursor-pointer hover:bg-gray-50 items-center rounded-md flex gap-4 overflow-y-auto">
          <div className="w-full">
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={PieDataGirls}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {PieDataGirls.map((entry: any, index: any) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div className="flex flex-col w-full gap-2">
            {DisplayDataGirls.map((data: any) => (
              <span className="flex gap-2 items-center" key={data.id}>
                <FaUser /> {data.name} -- {data.number_of_votes} Votes
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
