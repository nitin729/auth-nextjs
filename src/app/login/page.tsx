"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response && response.data) {
        router.push("/me");
        toast.success("Logged In successfully");
        setError(false);
      }
    } catch (error: any) {
      console.log("Login Failed");
      setLoading(false);
      setError(true);
      toast.error("Login Failed");
    }
  };

  useEffect(() => {
    if (emailRef?.current && passwordRef?.current) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="h-screen w-screen bg-black flex justify-center items-center">
        <div className="p-4 border-white rounded flex flex-col items-center justify-center">
          <h2>Log in</h2>
          {loading && <h2>{loading ? "Processing" : "Success"}</h2>}

          {error && <h2>Login Failed !!!</h2>}
          <div className="mb-3 flex flex-col w-full">
            <label htmlFor="email">Email :</label>
            <input
              className="p-2 rounded text-black"
              placeholder="Email"
              ref={emailRef}
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
              ref={passwordRef}
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="mb-3 flex flex-col w-full ">
            <a href="/reset">Forgot Password ?</a>
          </div>

          <div className="mb-3 flex flex-col w-full ">
            <button
              className="rounded bg-white text-black p-2"
              disabled={btnDisabled}
              onClick={onLogin}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
