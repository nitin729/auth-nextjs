"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function ForgotPassword() {
  const [password, setPassword] = useState();
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setError(false);
    setSuccess(false);
    const urlToken = window.location.search.split("=")[1] || "";
    setToken(urlToken);
  }, [token]);

  const handlePasswordChange = async () => {
    try {
      setPassword(inputRef.current);
      const response = await axios.post("/api/users/forgotpassword", {
        token,
        password,
      });
      if (response) {
        setSuccess(true);
      }
    } catch (error: any) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div className="bg-black h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl text-white font-bold">Reset your password</h1>
      <input
        type="text"
        className="p-2 w-[20rem] rounded"
        placeholder="Enter your new password"
        value={password}
        ref={inputRef}
      />
      <button
        className="bg-white text-black w-[20rem] rounded p-2"
        onClick={handlePasswordChange}
      >
        Reset
      </button>
      {error && (
        <h1 className="text-2xl text-white font-bold p-2 bg-red-200">
          Password reset failed
        </h1>
      )}
      {success && (
        <h1 className="text-2xl text-white font-bold p-2 bg-green-200">
          Password reset successfully
        </h1>
      )}
    </div>
  );
}

export default ForgotPassword;
