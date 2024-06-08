import { useGlobalStudentData } from "../../Utils/GlobalStudentData";
import pb from "../../Utils/Pocketbase";
import {NavigateFunction} from "react-router-dom"

type ValidationProps = {
  password: string;
  setError: Function;
  navigate: NavigateFunction,
  setglobalData: Function
};

export default async function validation({password, setError, navigate, setglobalData}: ValidationProps) {
  try {
    // you can also fetch all records at once via getFullList
    const records = await pb.collection("Students").getFullList({
     filter: `password = "${password}"`,
    });

    console.log(records)


    if (records.length !== 0 && records[0]?.voted === false){
      setglobalData(`${records[0]?.id}`)
      navigate("/schoolPrefectPage")
    }
    else if(records[0]?.voted === true){
      setError("You Have Already Voted");
      setTimeout(()=> setError(), 2000)
    }
    else{
      setError("Invalid Credentials. Enter Details Again");
      setTimeout(()=> setError(), 2000)
    }

  } catch (error) {
    setError(error);
  }
  
}
