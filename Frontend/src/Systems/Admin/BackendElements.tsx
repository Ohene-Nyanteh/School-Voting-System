import { RecordModel } from "pocketbase";
import pb from "../../Utils/Pocketbase";

// Types
type Data = {
    Name: string;
    password?: string;
    voted: boolean;
    class: string;
};

export async function createStudentInfo(data: Data, res: (data: RecordModel) => void, refresh: boolean, setError: Function) {
    try {
        if (refresh) {
            null
        } else {
            const records = await pb.collection('Students').getFullList({
                sort: '-created',
                filter: `Name="${data.Name}" && class="${data.class}"`
            });
            console.log(records)
            if(records.length == 0){
                const record = await pb.collection('Students').create(data);
                await generatePassword(record);
                const updatedData = await pb.collection('Students').getOne(record.id);
                res(updatedData);
            }
            else{
                setError("Student Already created")
            }


        }
    } catch (e) {
        console.error("Error creating student info:", e);
    }
}

export async function generatePassword(record: RecordModel) {
    let numbers = "";

    for (let i = 0; i < 4; i++) {
        const randomNumber = Math.floor(Math.random() * 10);
        numbers += randomNumber.toString();
    }

    const updatedData = {
        Name: record.Name,
        password: numbers,
        voted: false,
        class: record.class
    };

    try {
        await pb.collection('Students').update(record.id, updatedData);
    } catch (error) {
        console.error("Error generating password:", error);
    }
}

export async function showDetails(record: RecordModel) {
    try {
        const data = await pb.collection('Students').getOne(record.id);
        return data;
    } catch (error) {
        console.error("Error showing details:", error);
    }
}
