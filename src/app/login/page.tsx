"use client";
import React from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { Axios } from "axios";
import { useRouter } from "next/navigation";




export default function LoginPage() {

    const [User,setUser] = React.useState({
        
            email:"",
            password:"",
            
        })
        const onLogin = async () => {
            toast.success("Login Successfull");
        }


    return(
        <>
        <div className="bg-slate-950 min-h-screen flex justify-center items-center text-white">
        <Toaster position="top-center" reverseOrder={false} />
            <div className=" flex justify-center items-center">
                <div className="bg-slate-700 rounded-lg p-8  hover:[perspective:1000px] transition duration-500">
                    <h1 className="text-center mb-3 text-3xl font-bold">Login</h1>
                    <form action="">
                        <div className="">
                        <label className="text-[15px] font-serif py-2" >Email</label>
                        <input  className="w-full bg-slate-600 py-2 px-1 rounded-lg text-white focus:outline-none  " pattern="@gmail.com" value={User.email} type="email" placeholder="email" id="email" required />
                        
                        </div><br />
                        <div className="">
                            <label className="text-[15px] font-serif py-2" >Password</label>
                            <input className="w-full bg-slate-600 py-2 px-1 rounded-lg text-white focus:outline-white focus:border-none" value={User.password}   type="password" placeholder="password" id="pass" required />
                            
                        </div>
                        <p><span className='text-sm flex justify-end mt-3'>Forgot Password..?</span></p>
                        <br />
                        <button className="w-full bg-blue-800 rounded-md py-1 text-[18px] hover:bg-blue-600" type="submit" onClick={onLogin}>login</button>
                        <p className='text-sm pt-3'>new User..? <span className='text-md text-yellow-200 hover:text-blue-100'>
                        <Link href='/signup'>Register</Link> </span></p>
                    </form>
            
                </div>
    
        
            </div>
 
  
        </div>
        </>
    )
}