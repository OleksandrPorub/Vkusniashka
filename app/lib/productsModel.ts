import mongoose from "mongoose";

export interface Products extends mongoose.Document {
    id: string,
    name: string,
    quantity: string,
    description?: string,
    price?: number,
}

const assortmentSchema = new mongoose.Schema<Products>({  
    id: {
        type: String,
        required: [true, 'Please provide an id for this product.'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for this product.'],
    },
    quantity: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
});

export default mongoose.models.Product || mongoose.model<Products>('Product', assortmentSchema)
