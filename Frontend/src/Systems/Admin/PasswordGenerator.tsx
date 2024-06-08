import { useState } from "react";
import pb from "../../Utils/Pocketbase";
import { createStudentInfo } from "./BackendElements";

export default function PasswordGenerator() {
  const [name, setName] = useState("");
  const [Grade, setGrade] = useState("");
  const [Course, SetCourse] = useState("");
  const [error, setError] = useState("");
  const [class_, setClass_] = useState("");
  const [saved, setSaved] = useState("");
  const [res, setRes]: any = useState(null);
  const [loading, setLoading] = useState(false);

  let data = {
    Name: "",
    password: "",
    voted: false,
    class: "",
  };

  async function CreateAndUpdate(refresh: any) {
    setLoading(true);
    data = {
      Name: name && name,
      password: "",
      voted: false,
      class: Grade && Course && class_ ? `${Grade} ${Course} ${class_}` : "",
    };

    await createStudentInfo(data, setRes, refresh, setError);
    setLoading(false);
  }

  return (
    <div className="w-full h-full flex p-4 gap-4 bg-gray-100">
      <div className="w-full bg-white shadow rounded">
        <form onSubmit={(e) => e.preventDefault()} className="p-4">
          <div className="w-full h-full flex flex-col gap-6">
            <h1 className="text-2xl text-center font-semibold">
              Password Generator
            </h1>
            {error && <span className="p-2 bg-red-500">{error}</span>}
            <div className="flex flex-col gap-4 justify-center">
              <span className="text-xl">Enter Student Name: </span>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="border rounded p-4"
              />
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <span className="text-xl">Enter Student Class: </span>
              <div className="flex gap-4">
                <div className="w-full">
                  <span>Grade: </span>
                  <select
                    name=""
                    id=""
                    className="p-2 w-full border-2"
                    onChange={(e) => setGrade(e.target.value)}
                  >
                    <option value="">Grade</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div className="w-full">
                  <span>Course</span>
                  <select
                    name=""
                    id=""
                    className="p-2 w-full border-2"
                    onChange={(e) => SetCourse(e.target.value)}
                  >
                    <option value="">Course</option>
                    <option value="Science">Science</option>
                    <option value="General Arts">General Arts</option>
                    <option value="Visual Arts">Visual Arts</option>
                    <option value="Business">Business</option>
                    <option value="Home Economics">Home Economics</option>
                  </select>
                </div>

                <div className="w-full">
                  <span>Class</span>
                  <select
                    name=""
                    id=""
                    className="p-2 w-full border-2"
                    onChange={(e) => setClass_(e.target.value)}
                  >
                    <option value="">Class</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="p-2 bg-green-500 w-full rounded"
                onClick={() => CreateAndUpdate(false)}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="w-full bg-white shadow rounded">
        <div>
          <div className="w-full h-full p-4 rounded flex gap-6 flex-col">
            <h1 className="text-2xl text-center font-semibold">Details</h1>
            {saved && (
              <span className="w-full bg-green-400 p-2 rounded">{saved}</span>
            )}
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="loader">Loading...</div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold">Name</span>
                  <span className="text-lg opacity-65">
                    {res ? res?.Name : "Surname Firstname Othernames"}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold">Class</span>
                  <span className="text-lg opacity-65">
                    {res ? res.class : "X Course X"}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold">Password</span>
                  <span className="text-lg opacity-65">
                    {res ? res.password : "***************"}
                  </span>
                </div>
                <button
                  className="w-full bg-green-500 p-2 rounded"
                  onClick={() => CreateAndUpdate(true)}
                  disabled={loading}
                >
                  {loading ? "Refreshing..." : "Refresh"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
