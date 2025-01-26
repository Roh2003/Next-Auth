import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { log } from "node:console";
import jwt from 'jsonwebtoken';


connect();

export async function POST(req:NextRequest) {

   try {

    const reqbody = await req.json()
    const {email, password} = reqbody
    console.log(reqbody);

    const user = await User.findOne({email})
    if(!user) {
        return NextResponse.json(
            {error: "User not found"},
            {status: 404}
        )
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) {
        return NextResponse.json(
            {error: "Invalid Password"},
            {status: 400}
        )
    }
    
    const tokenData = {
        id: user._id,
        email: user.email,
        username: user.username
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: "1d"})
    const response =  NextResponse.json({
        message: "Login Successful",
        success: true,
        token
    })

    response.cookies.set("token", token, {
        httpOnly: true,
    })

    return response;
    
   } catch (error: any) {
       return NextResponse.json({ error: error.message }, { status: 500 });
    
   }

    
    
}