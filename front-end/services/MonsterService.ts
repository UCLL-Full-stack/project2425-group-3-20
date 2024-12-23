import { Monster } from "@types";
import { get } from "http";

const getAllMonsters = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+"/monsters/all",{
      method:"GET",
      headers:{
        "Content-Type" : "application/json"
      }
    })
};
const createMonster = async(monster:Monster)=>{
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    throw new Error("No logged-in user found");
  }

  const user = JSON.parse(loggedInUser);
  const token = user.token;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/monsters/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(monster),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch monsters: ${response.statusText}`);
  }

  return response;
};

const getAllMonstersByUser = async () => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    throw new Error("No logged-in user found");
  }

  const user = JSON.parse(loggedInUser);
  const token = user.token;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/monsters/own`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch monsters: ${response.statusText}`);
  }

  return response;
};
const deleteActions = async (id: number) => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    throw new Error("No logged-in user found");
  }

  const user = JSON.parse(loggedInUser);
  const token = user.token;
    return fetch(process.env.NEXT_PUBLIC_API_URL+`/monsters/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`,
      }
  })
};

const MonsterService = {
    getAllMonsters,
    deleteActions,
    getAllMonstersByUser,
    createMonster
};
export default MonsterService;
  