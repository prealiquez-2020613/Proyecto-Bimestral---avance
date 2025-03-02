import ShoppingCart from '../shoppingCart/shoppingCart.model.js';
import Receipt from '../receipt/receipt.model.js';
import Product from '../products/product.model.js';

// GENERAR FACTURA
export const generateReceipt = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { nit } = req.body;
        const cart = await ShoppingCart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).send({ success: false, message: "Cart is empty or not found" });
        }

        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                return res.status(400).send({ success: false, message: `Insufficient stock for ${item.product.name}` });
            }
        }

        const itemList = cart.items;

        for (const item of cart.items) {
            item.product.soldUnits += (item.quantity * 1);
            item.product.stock -= item.quantity;
            await item.product.save();
        }

        const receipt = new Receipt({
            user: userId,
            nit,
            shoppingCart: cart._id,
            items : itemList,
            totalAmount: cart.subtotalAmount,
            receiptStatus: "PAID"
        });

        await receipt.save();
        cart.items = [];
        cart.subtotalAmount = 0;
        await cart.save();

        return res.send({ success: true, message: "Receipt generated successfully", receipt });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: "General error generating receipt", error });
    }
};

// LISTAR FACTURAS POR USUARIO
export const getReceiptsByUser = async (req, res) => {
    try {
        const userId = req.user.uid;
        const receipts = await Receipt.find({ user: userId }).populate("shoppingCart");

        if (!receipts.length) {
            return res.status(404).send({ success: false, message: "No receipts found for this user" });
        }

        return res.send({ success: true, message: "Receipts retrieved successfully", receipts });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: "General error retrieving receipts", error });
    }
};

// ACTUALIZAR ESTADO DE LA FACTURA
export const updateReceiptStatus = async (req, res) => {
    try {
        const {receiptId} = req.body;
        console.log(receiptId);

        const receipt = await Receipt.findById(receiptId);
        if (!receipt) {
            return res.status(404).send({ success: false, message: "Receipt not found" });
        }

        receipt.receiptStatus = 'ANNULLED';
        await receipt.save();

        return res.send({ success: true, message: "Receipt status anulled successfully", receipt });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: "General error updating receipt status", error });
    }
};