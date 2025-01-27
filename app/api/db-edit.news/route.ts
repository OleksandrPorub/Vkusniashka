import News from "./../newsModel";
import dbMongoConnect from "@/app/api/dbMongoConnect";
import { NextResponse } from "next/server";


export async function DELETE(req: any) {
    await dbMongoConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const response = await News.deleteOne({ id: id });

    return NextResponse.json(response);
}

export async function POST(req: any) {
    await dbMongoConnect();
    const body = await req.json();
    let response;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
        response = await News.updateOne({ id: id }, body);
    } else {
        const newsItem = new News(body);
        response = newsItem.save();
    }
    return NextResponse.json(response);
}