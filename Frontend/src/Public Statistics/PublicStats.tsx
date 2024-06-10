import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import GhanassLogo from "../assets/ghanass_logo.jpg";
import pb from "../Utils/Pocketbase";
import { RecordModel } from "pocketbase";

interface Prefect {
  id: string;
  name: string;
  number_of_votes: number;
  Gender: string;
  type: string;
}

export default function PublicStats() {
  const [type, setType] = useState<string>("");
  const [Voted, setVoted] = useState<number>(0);
  const [votesCasted, setVotesCasted] = useState<number>(0);
  const [diff, setDiff] = useState<number>(0);
  const [time, setTime] = useState<number>(3600); // Initial time in seconds (e.g., 1 hour)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prefects, setPrefects] = useState<Prefect[]>([]);

  const type_array: string[] = [
    "Timer",
    "School Prefect",
    "Compound Prefect",
    "Dining Prefect",
    "Entertainment Prefect",
    "Prep Prefect",
    "Day Prefect",
  ];

  const changeElement = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % type_array.length;
      setType(type_array[nextIndex]);
      return nextIndex;
    });
  };

  const fetchVotes = async () => {
    try {
      const records = await pb.collection("Students").getFullList({
        sort: "-created",
        filter: "voted = True",
      });
      setDiff(records.length - Voted);
      setVoted(records.length);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchVotesCast = async () => {
    try {
      const records = await pb.collection("Prefects").getFullList({
        sort: "-created",
      });
      setVotesCasted(
        records.reduce((acc, record) => acc + record.number_of_votes, 0)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPrefectsByType = async (type: string) => {
    try {
      const records: RecordModel[] = await pb
        .collection("Prefects")
        .getFullList({
          filter: `type = "${type}"`,
          sort: "-created",
        });
      const fetchedPrefects: Prefect[] = records.map((record, index) => ({
        id: record.id,
        name: `Candidate ${index+1}`,
        number_of_votes: record.number_of_votes,
        Gender: record.Gender,
        type: record.type,
      }));
      setPrefects(fetchedPrefects);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Timer
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Set the initial type
    setType(type_array[currentIndex]);

    // Change element every 10 seconds
    const interval = setInterval(changeElement, 10000);

    // Fetch votes initially
    fetchVotes();
    fetchVotesCast();

    // Clean up intervals on component unmount
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    fetchPrefectsByType(type);
  }, [type]);

  useEffect(() => {
    const voteInterval = setInterval(fetchVotes, 3000); // Update votes every 3 seconds
    return () => clearInterval(voteInterval);
  }, [Voted]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(time);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
  ];

  const sortedPrefects = prefects.sort((a, b) =>
    a.Gender.localeCompare(b.Gender)
  );

  return (
    <div className="w-full flex flex-col h-screen p-2">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex gap-4 items-center">
          <img src={GhanassLogo} alt="Ghanass Logo" width={60} height={60} />
          <h1 className="text-2xl font-bold">Ghana Senior High School</h1>
          <img src={GhanassLogo} alt="Ghanass Logo" width={60} height={60} />
        </div>
        <h1 className="text-xl">Temporal Statistics</h1>
      </div>
      {type === "Timer" ? (
        <div className="w-full flex flex-col gap-6 h-full p-4 items-center">
          <div className="w-4/6 bg-purple-500 h-full rounded shadow">
            <div className="flex flex-col justify-between p-16 items-center h-full">
              <h1 className="text-3xl font-bold">
                TIME LEFT TILL END OF VOTING
              </h1>
              <div className="text-4xl font-mono flex space-x-2">
                <div className="p-4 bg-gray-200 rounded-lg">{hours}</div>
                <div className="p-4">:</div>
                <div className="p-4 bg-gray-200 rounded-lg">{minutes}</div>
                <div className="p-4">:</div>
                <div className="p-4 bg-gray-200 rounded-lg">{seconds}</div>
              </div>
            </div>
          </div>
          <div className="w-4/6 bg-white h-full flex gap-4">
            <div className="w-full bg-green-500 h-full rounded shadow flex items-center justify-around p-12 flex-col">
              <h1 className="text-2xl">Total Number Of Votes:</h1>
              <h1 className="text-5xl">{Voted}</h1>
            </div>
            <div className="w-full bg-green-500 h-full rounded shadow flex items-center p-12 justify-around flex-col">
              <h1 className="text-2xl">Total Number Of Votes Cast:</h1>
              <h1 className="text-5xl">{votesCasted}</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-2xl">{type}</h1>
          <div className="w-full h-full p-4 flex gap-4 items-center">
            <div className="bg-white w-full h-full rounded shadow p-4">
              <h2 className="text-xl font-bold mb-2">Votes Distribution</h2>
              <PieChart width={400} height={400}>
                <Pie
                  data={sortedPrefects}
                  dataKey="number_of_votes"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {sortedPrefects.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
            <div className="bg-white w-full h-full rounded shadow p-4">
              <h2 className="text-xl font-bold mb-2">
                List of Prefects and Their Votes
              </h2>
              <ul className="list-disc pl-5">
                {sortedPrefects.map((prefect, index) => (
                  <li key={index} className="text-lg p-5">
                    Candidate {index + 1} ({prefect.Gender}): {prefect.number_of_votes}{" "}
                    votes
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
