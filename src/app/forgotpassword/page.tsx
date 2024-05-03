"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Reset() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setError(false);
    setSuccess(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken!);

    // const { query } = router;
    // const urlToken = query.token;
    // setToken(urlToken || "");
  }, []);

  const handlePassword = async () => {
    try {
      const response = await axios.post("/api/users/forgotpassword", {
        token,
        password,
      });
      if (response) {
        setSuccess(true);
        setError(false);
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="bg-black h-screen w-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-2xl text-white font-bold">Reset your password</h1>
      <input
        type="password"
        className="p-2 w-[20rem] rounded text-black"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="bg-white text-black w-[20rem] rounded p-2"
        onClick={handlePassword}
      >
        Reset Password
      </button>
      {error && (
        <h1 className="text-2xl text-white font-bold p-2 bg-red-200">
          Something went wrong. Try again.
        </h1>
      )}
      {success && (
        <h1 className="text-2xl text-white font-bold p-2 bg-green-200">
          Password changed successfully
        </h1>
      )}
    </div>
  );
}

export default Reset;
