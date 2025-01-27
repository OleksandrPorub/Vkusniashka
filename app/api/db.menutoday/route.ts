import ProductToday from "./../productTodayModel";
import dbMongoConnect from "@/app/api/dbMongoConnect";
import { NextResponse } from "next/server";

export async function GET(req: any) {
    await dbMongoConnect();
    const gettedProducts = await ProductToday.find().sort({name:1}).collation({locale:"uk", strength:2});
    const { searchParams } = new URL(req.url);
    const query = searchParams?.get("q");

    const products = query ? gettedProducts.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())) : gettedProducts;

    return NextResponse.json(products);
}
