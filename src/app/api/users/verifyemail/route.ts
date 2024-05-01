import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token, "token");
    if (!token) {
      return NextResponse.json({ error: "invalid token" }, { status: 401 });
    }
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Token did not match" },
        { status: 401 },
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();
    console.log(user);
    return NextResponse.json(
      {
        message: "User verified successfully",
        success: true,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
