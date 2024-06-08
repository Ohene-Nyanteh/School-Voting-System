import { Route, Routes } from "react-router-dom";
import GhanassLogo from "../../assets/ghanass_logo.jpg";
import PasswordGenerator from "./PasswordGenerator";
import Statistics from "./Statistics";
import { useNavigate } from "react-router-dom";
import pb from "../../Utils/Pocketbase";
import { useState } from "react";
import { useGlobalAdminData } from "../../Utils/GlobalAdminData";
import { TbPasswordUser } from "react-icons/tb";
import { ImStatsDots } from "react-icons/im";

export default function AdminPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [isEc, setEC] = useState(false);
  const { adminData } = useGlobalAdminData();

  const Callme = async () => {
    const record = await pb.collection("users").getOne(adminData);

    if (record.isEc) {
      setEC(true);
    }
  };

  Callme();

  return (
    <div className="w-screen h-screen flex">
      {/* Menu */}
      <div className="w-2/12 flex flex-col gap-4 border-r  bg-green-400">
        <div className="flex gap-3 justify-center w-full p-2">
          <div className="w-[70px] h-[70px]">
            <img src={GhanassLogo} />
          </div>
          <h1 className="font-bold text-lg">ADMINISTRATION PORTAL</h1>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center pl-1 cursor-pointer hover:bg-green-300">
            <TbPasswordUser />
            <span
              onClick={() => navigate("")}
              className={`p-2 ${isEc && "hidden"}`}
            >
              Password Generator
            </span>
          </div>
          <div onClick={() => navigate("Stats/")} className="flex gap-2 items-center pl-1 cursor-pointer hover:bg-green-300">
            <ImStatsDots />
            <span className="p-2" >
              Statistics
            </span>
          </div>
        </div>
      </div>

      {/* Main Page */}
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-fit p-4 flex justify-end border-b">
          <div
            className="rounded-full cursor-pointer  border-2 w-fit h-fit border-green-500"
            onClick={() => setShow(!show)}
          >
            <img
              src={GhanassLogo}
              className="rounded-full"
              width={40}
              height={40}
            />

            {show && (
              <div className="absolute bg-green top-14 right-0 hover:bg-gray-100 cursor-pointer bg-white rounded shadow border px-10 py-4 h-fit w-fit">
                <div
                  className=""
                  onClick={() => {
                    pb.authStore.clear();
                    navigate("/Admin");
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>

        {/*Passvvord Gen */}
        <Routes>
          <Route path="/" element={<PasswordGenerator />} />
          <Route path="/Stats" element={<Statistics />} />
        </Routes>
      </div>
    </div>
  );
}

// <div className="w-full h-screen bg-white">
// {pb.authStore.isValid ? (
//   <div className="h-screen">
//     {" "}
//     <div className="bg-white w-full p-2 flex h-fit shadow border-b justify-between items-center">
//       <div className="flex gap-4 items-center">
//         <img src={GhanassLogo} width={60} height={60} />
//         <span className="text-2xl font-bold">{isEc ? "Electoral Commission Portal": "ADMINISTRATION PORTAL"}</span>
//       </div>
//       <div className="rounded-full cursor-pointer  border-2 w-fit h-fit border-green-500" onClick={()=> setShow(!show)}>
//         <img
//           src={GhanassLogo}
//           className="rounded-full"
//           width={40}
//           height={40}
//         />

//         {show && <div className="absolute bg-green top-14 right-0 hover:bg-gray-100 cursor-pointer bg-white rounded shadow border px-10 py-4 h-fit w-fit">
//           <div className="" onClick={()=> {
//             pb.authStore.clear();
//             navigate('/Admin')
//           }}>Logout</div>
//         </div>
//           }
//       </div>
//     </div>
//     <main className="p-2 h-full">
//       <div className="h-full border flex gap-2 bg-white w-full rounded-lg shadow">
//         <div className="h-full bg-white border-r-2 rounded-l flex flex-col gap-4 p-2 w-1/6 ">
//           <h1 className="text-2xl font-sans font-bold p-2">Menu</h1>
//           <div className="w-full flex flex-col gap-4 pl-2">

//           </div>
//         </div>
//         <div className="w-full p-2 ">
//           <Routes>
//             <Route path="/" element={<PasswordGenerator />} />
//             <Route path="/Stats" element={<Statistics />} />
//           </Routes>
//         </div>
//       </div>
//     </main>
//   </div>
// ):
// <div className="flex flex-col h-screen w-full justify-center items-center gap-6">
//   <h1 className="text-3xl"> Please Login Before Accessing the Interface</h1>
//   <button className="w-auto px-10 py-4 bg-green-500 rounded" onClick={()=> navigate('/Admin')}>Login</button>
// </div>}
// </div>
