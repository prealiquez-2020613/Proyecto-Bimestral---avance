import { Schema, model } from 'mongoose';

const receiptSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User reference is required']
        },
        shoppingCart: {
            type: Schema.Types.ObjectId,
            ref: 'ShoppingCart',
            required: [true, 'Shopping cart reference is required']
        },
        totalAmount: {
            type: Number,
            required: [true, 'Total amount is required'],
            min: [0, 'Total amount cannot be negative']
        },
        purchaseDate: {
            type: Date,
            default: Date.now
        }
    }
);

export default model('Receipt', receiptSchema);
