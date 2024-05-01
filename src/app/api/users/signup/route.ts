import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import sendMail from "@/utils/mailer";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json(); // request.json() is a promise
    const { username, email, password } = requestBody;
    if (!(username && email && password)) {
      return NextResponse.json(
        { error: "Username, email or password is missing" },
        { status: 400 },
      );
    }
    // Check for the existingUser
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 401 },
      );
    }

    //encrypt the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create a new user in db
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser, "new user");
    const savedUser = await newUser.save();
    //Send verify email
    sendMail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      user: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
