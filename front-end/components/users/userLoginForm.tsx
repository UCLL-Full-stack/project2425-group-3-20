import UserService from "@services/userService";
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";


const UserLoginForm: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const { t } = useTranslation(); 
  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name.trim()) {
      setNameError(t("login.validate.name")); 
      result = false;
    }

    if (!password.trim()) {
      setPasswordError(t("login.validate.password")); 
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) {
        return;
    }

    try {
        const userPayload = { name: name, password }; 
        const response = await UserService.loginUser(userPayload); 
        const responseData = await response.json(); 

        if (response.ok) {
            const { token, name, role } = responseData;

   
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify({ token, name, role })
            );

            setStatusMessages([
                { message: t("login.success"), type: "success" }, 
            ]);

            setTimeout(() => {
                router.push("/"); 
            }, 2000);
        } else {

            setStatusMessages([
                { message: responseData.message || t("general.error"), type: "error" }, 
            ]);
        }
    } catch (error) {
        console.error("Login failed:", error);

        setStatusMessages([
            { message: t("general.error"), type: "error" }, 
        ]);
    }
};


  return (
    <>
      <table className="w-1/2 border-collapse mx-auto mt-5 rounded-lg">
        <thead>
            <tr>
                <th className="bg-gray-200 text-gray-600 border border-gray-300 px-4 py-2">{t("login.name")}</th>
                <th className="bg-gray-200 text-gray-600 border border-gray-300 px-4 py-2">{t("login.password")}</th>
                <th className="bg-gray-200 text-gray-600 border border-gray-300 px-4 py-2">{t("login.role")}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="border border-gray-300 px-4 py-2">frans </td>
                <td className="border border-gray-300 px-4 py-2">frans123</td>
                <td className="border border-gray-300 px-4 py-2">gameMaster</td>
            </tr>
            <tr>
                <td className="border border-gray-300 px-4 py-2">jan</td>
                <td className="border border-gray-300 px-4 py-2">jan123</td>
                <td className="border border-gray-300 px-4 py-2">guest</td>
            </tr>
            <tr>
                <td className="border border-gray-300 px-4 py-2">admin</td>
                <td className="border border-gray-300 px-4 py-2">admin123</td>
                <td className="border border-gray-300 px-4 py-2">admin</td>
            </tr>
        </tbody>
    </table>
    <div className="flex items-center justify-center h-screen">
      <h3 className="px-0">{t("login.title")}</h3> 
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form className="w-1/2 border-collapse mx-auto my-2 rounded-lg justify-center" onSubmit={handleSubmit}>
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
          {t("login.label.username")} 
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {nameError && <div className="text-red-800">{nameError}</div>}
        </div>
        <div className="mt-2">
          <div>
            <label
              htmlFor="passwordInput"
              className="block mb-2 text-sm font-medium"
            >
              {t("login.label.password")} 
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {passwordError && <div className="text-red-800">{passwordError}</div>}
          </div>
        </div>
        <button
          className="text-black bg-gray-200 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          {t("login.button")} 
        </button>
      </form>
      </div>
    </>
  );
};

export default UserLoginForm;
