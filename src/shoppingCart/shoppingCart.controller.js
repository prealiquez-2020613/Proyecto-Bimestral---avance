import ShoppingCart from './shoppingCart.model.js';
import Product from '../products/product.model.js';

// AGREGAR PRODUCTO AL CARRITO
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).send({ success: false, message: "Product not found" });

        if (quantity <= 0 || quantity > product.stock) {
            return res.status(400).send({ success: false, message: `Product do not have enough stock: (${product.stock}) | Quantity must be positive.` });
        }

        let cart = await ShoppingCart.findOne({ user: userId });

        if (!cart) {
            cart = new ShoppingCart({ user: userId, items: [], subtotalAmount: 0 });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {

            const num1 = existingItem.quantity * 1;
            const num2 = quantity * 1;
            const newQuantity = num1 + num2;

            if (newQuantity > product.stock) {
                return res.status(400).send({ success: false, message: `Product do not have enough stock: (${product.stock}).` });
            }

            existingItem.quantity = num1 + num2;

        } else {
            cart.items.push({ product: productId, quantity });
        }

        cart.subtotalAmount += product.price * quantity;
        await cart.save();

        return res.send({ success: true, message: "Product added to cart", cart });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: "General error adding product to cart", error });
    }
};

// ELIMINAR PRODUCTO DEL CARRITO
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { productId } = req.body;

        const cart = await ShoppingCart.findOne({ user: userId }).populate("items.product");
        if (!cart) return res.status(404).send({ success: false, message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.product._id.toString() === productId);
        if (itemIndex === -1) return res.status(404).send({ success: false, message: "Product not found in cart" });

        const item = cart.items[itemIndex];
        cart.subtotalAmount -= item.product.price * item.quantity;
        cart.items.splice(itemIndex, 1);

        await cart.save();
        return res.send({ success: true, message: "Product removed from cart", cart });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: "General error removing product from cart", error });
    }
};

// OBTENER CARRITO DEL USUARIO
export const getCart = async (req, res) => {
    try {
        const userId = req.user.uid;
        const cart = await ShoppingCart.findOne({ user: userId }).populate("items.product");

        if (!cart) return res.status(404).send({ success: false, message: "Cart not found" });

        return res.send({ success: true, message: "Cart retrieved successfully", cart, subtotal: cart.subtotalAmount });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: "General error retrieving cart", error });
    }
};
