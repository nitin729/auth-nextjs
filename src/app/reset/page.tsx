"use client";
import React, { useState } from "react";
import axios from "axios";

function Reset() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEmail = async () => {
    try {
      const response = await axios.post("/api/users/reset", { email });
      if (response) {
        setSuccess(true);
        setError(false);
      }
    } catch (error: any) {
      console.log("error", error.message);

      console.log(error);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="bg-black h-screen w-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-2xl text-white font-bold">Reset your password</h1>
      <input
        type="text"
        className="p-2 w-[20rem] rounded text-black"
        placeholder="Enter your mail"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button
        className="bg-white text-black w-[20rem] rounded p-2"
        onClick={handleEmail}
      >
        Reset Password
      </button>
      {error && (
        <h1 className="text-2xl text-white font-bold p-2 bg-red-200">
          Mail was not sent
        </h1>
      )}
      {success && (
        <h1 className="text-2xl text-white font-bold p-2 bg-green-200">
          Mail was sent successfully
        </h1>
      )}
    </div>
  );
}

export default Reset;
