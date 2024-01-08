import Product from "../productsModel";
import dbMongoConnect from "@/app/api/dbMongoConnect";
import { NextResponse } from "next/server";

export async function GET(req: any) {
    await dbMongoConnect();
    const gettedProducts = await Product.find();
    const { searchParams } = new URL(req.url);
    const query = searchParams?.get("q");

    const products = query ? gettedProducts.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())) : gettedProducts;

    return NextResponse.json(products);
}

export async function DELETE(req: any) {
    await dbMongoConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const response = await Product.deleteOne({ id: id });

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
