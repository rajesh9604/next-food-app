import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { restaurantsSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const id = content.params.id;
  await mongoose.connect(connectionStr);
  let result = await orderSchema.find({ deleveryBoy_id: id });
  let success = false;
  if (result) {
    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await restaurantsSchema.findOne({
          _id: item.resto_id,
        });
        restoInfo.amount = item.amount;
        restoInfo.status = item.status;
        restoInfo._id = item._id;
        return restoInfo;
      })
    );
    result = restoData;
    success = true;
  }
  return NextResponse.json({ result, success });
}
export async function PATCH(request, content) {
  try {
    const id = content.params.id;
    console.log(id);
    const { status } = await request.json();
    console.log(status);
    await mongoose.connect(connectionStr);

    const result = await orderSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("PATCH error:", error); // log the real issue in server console
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
