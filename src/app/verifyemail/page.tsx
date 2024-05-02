"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);

    // const { query } = router;
    // const urlToken = query.token;
    // setToken(urlToken || "");
  }, []);

  const handleVerifyToken = async () => {
    try {
      setError(false);
      const response = await axios.post("api/users/verifyemail", { token });
      console.log(response);
      if (response) {
        setVerified(true);
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <button className="rounded p-2 w-[20rem]" onClick={handleVerifyToken}>
        Click to verify
      </button>
      {verified && (
        <h1 className="text-2xl bg-green text-white p-2 rounded">Verified</h1>
      )}
      {error && (
        <h1 className="text-2xl bg-red text-white p-2 rounded">
          Verification Failed
        </h1>
      )}
    </div>
  );
}

export default VerifyEmail;
