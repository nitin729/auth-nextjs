import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/utils/getDataFromToken";
import User from "@/models/user.model";
import { error } from "console";
connectDB();

export async function GET(request: NextRequest) {
  try {
    // extract data from token
    const id = await getDataFromToken(request);
    if (!id) {
      return NextResponse.json({ error: "User Id not found" }, { status: 400 });
    }
    const userDetails = await User.findById(id).select("-password");
    if (!userDetails) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    return NextResponse.json(
      {
        message: "userDetails fetched successfully",
        success: true,
        userDetails,
      },

      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
