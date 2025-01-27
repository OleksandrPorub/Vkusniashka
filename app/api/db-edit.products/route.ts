import Product from "../productsModel";
import dbMongoConnect from "@/app/api/dbMongoConnect";
import { NextResponse } from "next/server";


export async function DELETE(req?: any) {
    await dbMongoConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const response = id ? await Product.deleteOne({ id: id }) : await Product.deleteMany({});

    return NextResponse.json(response);
}

export async function POST(req: any) {
    await dbMongoConnect();
    const body = await req.json();
    let response;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");  

    if (id) {
        response = await Product.updateOne({ id: id }, body);
    } else {
        const newProductItem = new Product(body);
        response = newProductItem.save();
    }

    return NextResponse.json(response);
}
