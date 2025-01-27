import News from "./../newsModel";
import dbMongoConnect from "@/app/api/dbMongoConnect";
import { NextResponse } from "next/server";

export async function GET(req: any) {
    await dbMongoConnect();
    const gettedNewsList = await News.find();
    const { searchParams } = new URL(req.url);
    const query = searchParams?.get("q");

    const newsList = query ? gettedNewsList.filter((item) => (item.title.toLowerCase().includes(query.toLowerCase())||item.text.toLowerCase().includes(query.toLowerCase()))) : gettedNewsList;

    return NextResponse.json(newsList);
}
