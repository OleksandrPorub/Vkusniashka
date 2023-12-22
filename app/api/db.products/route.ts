import Product, { Products } from "../../lib/productsModel";
import dbMongoConnect from "@/app/lib/dbMongoConnect";
import { NextResponse } from "next/server";

export async function GET(req: any) {
    console.log("========================================================");
    console.log("========================================================");
    await dbMongoConnect();
    const gettedProducts = await Product.find();
    const { searchParams } = new URL(req.url);
    const query = searchParams?.get("q");
    // const gettedProductsFiltered = gettedProducts.filter((item)=>(item.name.includes(query)));
    // if (query) {
    //     gettedProducts = gettedProducts.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
    // }
    const products = query ? gettedProducts.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())) : gettedProducts;
    // gettedProducts = query ? gettedProducts.filter((item)=>(item.name.includes(query))) : gettedProducts;
    // console.log(gettedProducts);
    return NextResponse.json(products);
}

export async function DELETE(req: any) {
    await dbMongoConnect();

    // let gettedProducts = await Product.updateOne();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const response = await Product.deleteOne({ id: id });

    // const gettedProductsFiltered = gettedProducts.filter((item)=>(item.name.includes(query)));

    // gettedProducts = query ? gettedProducts.filter((item)=>(item.name.includes(query))) : gettedProducts;
    console.log("function DELETE done !!___!!-- "+id);
    return NextResponse.json(response);
}

export async function POST(req: any) {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log(body);
    console.log(id);
    const response = await Product.updateOne({ id: id }, body);
    return NextResponse.json(response);
}


