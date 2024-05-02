"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function Me() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const getMyProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      console.log(response);
      if (response.data.userDetails) {
        setData(response.data.userDetails);
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const logout = async () => {
    await axios.get("/api/users/logout");
    router.push("/login");
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div>
      <div className="h-screen w-screen flex flex-col justify-center items-center gap-2">
        <h1 className="text-3xl">Me</h1>
        <h2>User Name : {data?.username}</h2>
        <h2>Email : {data?.email}</h2>
        <h2>Status: {data?.isVerified && "true"}</h2>
        <button className="p-2 bg-white rounded text-black" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Me;
