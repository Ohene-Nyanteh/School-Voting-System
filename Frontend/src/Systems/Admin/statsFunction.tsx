import { RecordModel } from "pocketbase";
import pb from "../../Utils/Pocketbase";

let voted_students: RecordModel[] = [];
let GirlsSchoolPrefect: RecordModel[] = [];
let BoysSchoolPrefect: RecordModel[] = [];
let BoysDinningPrefect: RecordModel[] = [];
let GirlsDinningPrefect: RecordModel[] = [];
let BoysCompoundPrefect: RecordModel[] = [];
let GirlsCompoundPrefect: RecordModel[] = [];
let GirlsEntertainmentPrefect: RecordModel[] = [];
let BoysEntertainmentPrefect: RecordModel[] = [];

export default async function statsFunction() {
  try {
    // fetch total number of people in data base
    const records = await pb.collection("Students").getFullList({
      sort: "-created",
    });

    records.map((record) => {
      if (record.voted == true) {
        voted_students.push(record);
      }
    });

    SetPrefects(records);

    return {
      BoysSchoolPrefect,
      GirlsSchoolPrefect,
      BoysCompoundPrefect,
      GirlsCompoundPrefect,
      BoysEntertainmentPrefect,
      GirlsEntertainmentPrefect,
      BoysDinningPrefect,
      GirlsDinningPrefect
    };
  } catch (e) {
    console.log(e);
  }
}

function SetPrefects(records: RecordModel[]) {
  records.map((record) => {
    if (record.type == "School Prefect" && record.Gender == "Male") {
      BoysSchoolPrefect.push(record);
    } else if (record.type == "School Prefect" && record.Gender == "Female") {
      GirlsSchoolPrefect.push(record);
    } else if (record.type == "Compound Prefect" && record.Gender == "Male") {
      BoysCompoundPrefect.push(record);
    } else if (record.type == "Compound Prefect" && record.Gender == "Female") {
      GirlsCompoundPrefect.push(record);
    } else if (
      record.type == "Entertainment Prefect" &&
      record.Gender == "Male"
    ) {
      BoysEntertainmentPrefect.push(record);
    } else if (
      record.type == "Entertainment Prefect" &&
      record.Gender == "Female"
    ) {
      GirlsEntertainmentPrefect.push(record);
    } else if (record.type == "Dinning Prefect" && record.Gender == "Male") {
      BoysDinningPrefect.push(record);
    } else if (record.type == "Dinning Prefect" && record.Gender == "Female") {
      GirlsDinningPrefect.push(record);
    }
  });
}
