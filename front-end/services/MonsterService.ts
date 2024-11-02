import { get } from "http";

const getAllMonsters = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+"/lecturers",{
      method:"GET",
      headers:{
        "Content-Type" : "application/json"
      }
    })
};


const MonsterService = {
    getAllMonsters,
};
export default MonsterService;
  