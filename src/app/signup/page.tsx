"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

console.log("Environment Test - MONGO_URI:", process.env.MONGO_URI);


export default function Signup() {
  const router = useRouter();
  const [User, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    con_password: "",
  });

  // This effect will only run in the browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // You can safely interact with the window object or any client-specific logic here
      console.log("This runs on the client-side.");
    }
  }, []);

  const onSignup = async (e:any) => {
    e.preventDefault(); // Prevent form default submission behavior
    if (User.password !== User.con_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/users/signup", User);
      toast.success(`Welcome ${User.username} - Registered Successfully`);
      router.push("/login");
    } catch (error:any) {
      toast.error(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex justify-center items-center text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center">
        <div className="bg-slate-700 rounded-lg p-8 hover:[perspective:1000px] transition duration-500">
          <h1 className="text-center mb-3 text-3xl font-bold">SignUp</h1>
          <form onSubmit={onSignup}>
            <div className="mb-4">
              <label className="text-[15px] font-serif py-2">Username</label>
              <input
                className="w-full bg-slate-600 py-2 px-1 rounded-lg text-white focus:outline-none"
                type="text"
                placeholder="Username"
                value={User.username}
                onChange={(e) => setUser({ ...User, username: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-[15px] font-serif py-2">Phone</label>
              <input
                className="w-full bg-slate-600 py-2 px-1 rounded-lg text-white focus:outline-none"
                type="tel"
                placeholder="Phone Number"
                value={User.phone}
                onChange={(e) => setUser({ ...User, phone: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-[15px] font-serif py-2">Email</label>
              <input
                className="w-full bg-slate-600 py-2 px-1 rounded-lg text-white focus:outline-none"
                type="email"
                placeholder="Email"
                value={User.email}
                onChange={(e) => setUser({ ...User, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-[15px] font-serif py-2">Password</label>
              <input
                className="w-full bg-slate-600 py-2 px-1 rounded-lg text-white focus:outline-none"
                type="password"
                placeholder="Password"
                value={User.password}
                onChange={(e) => setUser({ ...User, password: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-[15px] font-serif py-2">Confirm Password</label>
              <input
                className="w-full bg-slate-600 py-2 px-1 rounded-lg text-white focus:outline-none"
                type="password"
                placeholder="Confirm Password"
                value={User.con_password}
                onChange={(e) => setUser({ ...User, con_password: e.target.value })}
                required
              />
            </div>

            <button
              className="w-full bg-blue-800 rounded-md py-2 text-[18px] hover:bg-blue-600"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
