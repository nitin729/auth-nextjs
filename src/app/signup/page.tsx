"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("res data", response);
      if (response && response.data) {
        router.push("/login");
        toast.success("Signed up Successfully");
      }
      setLoading(false);
    } catch (error: any) {
      console.log("Signup Failed");
      toast.error("Signup Failed");
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      <div className="h-screen w-screen bg-black flex justify-center items-center">
        <div className="p-4 border-white rounded flex flex-col items-center justify-center">
          <h2>Sign up</h2>
          {loading && <h2>{loading ? "Processing" : "Success"}</h2>}
          <div className="m-4 flex flex-col w-full">
            <label htmlFor="username">User Name :</label>
            <input
              className="p-2 rounded text-black"
              placeholder="User name"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="mb-3 flex flex-col w-full">
            <label htmlFor="email">Email :</label>
            <input
              className="p-2 rounded text-black"
              placeholder="Email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-3 flex flex-col w-full">
            <label htmlFor="password">Password :</label>
            <input
              className="p-2 rounded text-black"
              placeholder="Password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="mb-3 flex flex-col w-full ">
            <button
              className="rounded bg-white text-black p-2 disabled: bg-gray-100"
              onClick={onSignup}
              disabled={btnDisabled}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
