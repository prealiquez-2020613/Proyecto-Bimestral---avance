import { Schema, model } from 'mongoose';

const receiptSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User reference is required']
        },
        nit: {
            type: String,
            required: [true, 'NIT is required'],
            min: [8, 'NIT cannot be less than 8 characters'],
            max: [9, 'NIT cannot be more than 9 characters'],
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
        },
        receiptStatus: {
            type: String,
            required: [true, 'Status is required'],
            uppercase: true,
            enum: ['PAID', 'ANNULLED']
        }
    }
);

export default model('Receipt', receiptSchema);
