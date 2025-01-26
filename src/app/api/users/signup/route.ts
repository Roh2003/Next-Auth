import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";




connect();
export async function POST(req: NextRequest) {
    try {
      const reqBody = await req.json();
  
      const { username, phone, email, password, con_password } = reqBody;

  
      if (!username || !email || !password || !con_password) {
        return NextResponse.json(
          { error: "All fields are required" },
          { status: 400 }
        );
      }
  
      if (password !== con_password) {
        return NextResponse.json(
          { error: "Passwords do not match" },
          { status: 400 }
        );
      }

      const alreadyUser = await User.findOne({ email });
      if (alreadyUser) {

        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        );
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
    
      const savedUser = await newUser.save();
      console.log("User saved:", savedUser);
  
      const { password: _, ...userData } = savedUser._doc;
  
      return NextResponse.json({
        message: "User Created Successfully",
        success: true,
        user: userData,
      });
    } catch (error: any) {
      console.error("Error in signup route:", error);
      return NextResponse.json(
        { error: "Internal Server Error", details: error.message },
        { status: 500 }
      );
    }
  }
  