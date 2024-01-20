import mongoose from "mongoose";

export interface NewsType extends mongoose.Document {
    id: string,
    date: number,
    title?: string,
    text?: string,
}

const newsSchema = new mongoose.Schema<NewsType>({  
    id: {
        type: String,
        required: [true, 'Please provide an id for this news.'],
        unique: true,
    },
    date: {
        type: Number,
        required: [true, 'Please provide a date for this news.'],
        unique: true,
    },
    title: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: false,
    },
});

export default mongoose.models.News || mongoose.model<NewsType>('News', newsSchema)