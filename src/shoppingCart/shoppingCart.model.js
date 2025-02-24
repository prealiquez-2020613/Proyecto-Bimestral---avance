import { Schema, model } from 'mongoose';

const shoppingCartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: [true, 'Product is required']
                },
                quantity: {
                    type: Number,
                    required: [true, 'Quantity is required'],
                    min: [1, 'Minimum quantity is 1'],
                    default: 1
                }
            }
        ]
    }
);

export default model('ShoppingCart', shoppingCartSchema);
