import { get } from "http";

const getAllMonsters = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+"/monsters",{
      method:"GET",
      headers:{
        "Content-Type" : "application/json"
      }
    })
};

const deleteActions = async (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+`/monsters/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type" : "application/json"
      }
  })
};

const MonsterService = {
    getAllMonsters,
    deleteActions
};
export default MonsterService;
  