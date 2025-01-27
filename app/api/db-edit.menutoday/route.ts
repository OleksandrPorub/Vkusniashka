import ProductToday from "../productTodayModel";
import dbMongoConnect from "@/app/api/dbMongoConnect";
import { NextResponse } from "next/server";


export async function DELETE(req: any) {
    await dbMongoConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const response = id ? await ProductToday.deleteOne({ id: id }) : await ProductToday.deleteMany({}); 

    return NextResponse.json(response);
}

export async function POST(req: any) {
    await dbMongoConnect();
    const body = await req.json();
    let response;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
        response = await ProductToday.updateOne({ id: id }, body);
    } else {
        const newProductItem = new ProductToday(body);
        response = newProductItem.save();
    }

    return NextResponse.json(response);
}
