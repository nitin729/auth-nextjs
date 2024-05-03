import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import sendMail from "@/utils/mailer";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    if (!email) {
      return NextResponse.json({ error: "Email is missing" }, { status: 401 });
    }
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 402 });
    }
    sendMail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json(
      { message: "Mail sent successfully", success: true },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
