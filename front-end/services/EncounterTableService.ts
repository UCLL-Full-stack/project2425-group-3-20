import { EncounterTable } from "@types";

const getEncounterTables = async () => {
    const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    throw new Error("No logged-in user found");
  }

  const user = JSON.parse(loggedInUser);
  const token = user.token;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/encounterTables/`, {
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

const getEncounterTableById = async (id: number) => {
    const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    throw new Error("No logged-in user found");
  }

  const user = JSON.parse(loggedInUser);
  const token = user.token;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/encounterTables/${id}`, {
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

const deleteMonsterFromEncounterTable = async (encounterTableId:number, monsterId:number) =>{
    const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    throw new Error("No logged-in user found");
  }

  const user = JSON.parse(loggedInUser);
  const token = user.token;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/encounterTables/${encounterTableId}/${monsterId}`, {
    method: "PUT",
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

export default { getEncounterTables, getEncounterTableById, deleteMonsterFromEncounterTable };