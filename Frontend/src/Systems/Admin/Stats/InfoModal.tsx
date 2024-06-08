import { RecordModel } from "pocketbase";
import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

type Props = {
  show: boolean;
  data: RecordModel[];
  onClose: () => void;
};

const InfoModal = React.memo((props: Props) => {
  const [value, setValue] = useState(props.show);

  useEffect(() => {
    setValue(props.show);
  }, [props.show]);

  return (
    <div
      className={`${
        value ? "translate-y-0" : "translate-y-[-100%]"
      } bg-white fixed inset-0 z-50 flex items-center justify-center transition-transform duration-1000 ease-in-out border-b-4 border-b-black`}
    >
      <div className="flex flex-col w-full h-full">
        <div className="w-full flex justify-end h-fit p-4">
          <CgClose
            size={40}
            className="border rounded"
            onClick={props.onClose}
          />
        </div>
        <div className="w-full h-full flex flex-col gap-10 bg-gray-50 justify-center items-center p-2 overflow-y-auto">
          <div className="w-4/6 bg-white h-full rounded overflow-y-auto flex flex-col gap-8">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Votes</th>
                </tr>
              </thead>
              <tbody>
                {props.data.map((student, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 flex items-center justify-center">
                      <img
src={`http://127.0.0.1:8090/api/files/${student.collectionId}/${student.id}/${student.image}`}
                        alt={`${student.name}'s avatar`}
                        className="w-[200px] h-[200px] object-cover rounded border"
                      />
                    </td>
                    <td className="p-2 text-center">{student.name}</td>
                    <td className="p-2 text-center">{student.number_of_votes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h1 className="text-3xl font-bold text-center">Data In Graph</h1>
            <BarChart
              width={800}
              height={500}
              className="bg-white"
              data={props.data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="number_of_votes" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
});

export default InfoModal;
