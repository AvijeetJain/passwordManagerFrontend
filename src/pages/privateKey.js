import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PrivateKey(props) {
  const URL = "http://localhost:3300";
  const { setPrivateKey, privateKey } = props;
  const accessToken = sessionStorage.getItem("access");
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["authorization"] = "Bearer " + accessToken;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPrivateKey(e.target.value);
  };

  const checkPrivate = async () => {
    await axios
      .post(`${URL}/key/storeKey`, { privateKey })
      .then((Response) => {
        console.log(Response.data);
        setPrivateKey(privateKey.replace(/\\n/g, "\n"));
        if (Response.data.msg === "Private key stored") {
          console.log(privateKey);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-500">
          Hang In There! <br />
          Enter your Private Key!
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              // for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Private Key
            </label>
            <input
              name="privateKey"
              value={privateKey}
              onChange={handleChange}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6" onClick={checkPrivate}>
            <Link className="w-full flex justify-center px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Continue
            </Link>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Dont have an account?{" "}
          <Link className="font-medium text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
