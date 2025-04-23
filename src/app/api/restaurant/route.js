import { connectionStr } from "@/app/lib/db";
import { restaurantsSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr);
  const data = await restaurantsSchema.find();
  return NextResponse.json({ result: data });
}

export async function POST(request) {
  let payload = await request.json();
  let result;
  let success= false;
  await mongoose.connect(connectionStr);
  if (payload.login) {
    result = await restaurantsSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
    if(result){
      success=true
    }
  } else {
    let restaurant = new restaurantsSchema(payload);
    result = await restaurant.save();
    if(result){
      success=true
    }
  }
  return NextResponse.json({ result, success });
}
