import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Token not found or expired" },
        { status: 402 },
      );
    }
    //encrypt the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Password changed successfully", success: true },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
