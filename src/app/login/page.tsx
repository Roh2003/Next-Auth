"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [User, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", User);
      console.log(response.data);
      toast.success(response.data.message ,{
          duration: 3000
        });
        setTimeout(() => {
            router.push("/profile");
          }, 3000);
    } catch (error: any) {
      console.error("Error in login route:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-slate-950 min-h-screen flex justify-center items-center text-white">
        <Toaster position="top-center"  reverseOrder={false} />
        <div className="flex justify-center items-center">
          <div className="bg-slate-700 rounded-lg p-8 hover:[perspective:1000px] transition duration-500">
            <h1 className="text-center mb-3 text-3xl font-bold">Login</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onLogin();
              }}
            >
              <div className="">
                <label className="text-[15px] font-serif py-2">Email</label>
                <input
                  className="w-full bg-slate-600 py-2 px-1 rounded-lg text-white focus:outline-none"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
                  value={User.email}
                  onChange={(e) => setUser({ ...User, email: e.target.value })}
                  type="email"
                  placeholder="email"
                  id="email"
                  required
                />
              </div>
              <br />
              <div className="">
                <label className="text-[15px] font-serif py-2">Password</label>
                <input
                  className="w-full bg-slate-600 py-2 px-1 rounded-lg text-white focus:outline-white"
                  value={User.password}
                  onChange={(e) => setUser({ ...User, password: e.target.value })}
                  type="password"
                  placeholder="password"
                  id="pass"
                  required
                />
              </div>
              <p>
                <span className="text-sm flex justify-end mt-3">Forgot Password..?</span>
              </p>
              <br />
              <button
                className="w-full bg-blue-800 rounded-md py-1 text-[18px] hover:bg-blue-600"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="text-sm pt-3">
                New User..?{" "}
                <span className="text-md text-yellow-200 hover:text-blue-100">
                  <Link href="/signup">Register</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
