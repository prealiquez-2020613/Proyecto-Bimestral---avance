import Product from "../products/product.model.js";
import Category from "../category/category.model.js";

//AGREGAR PRODUCTO
export const addProduct = async (req, res) => {
    try {
        const data = req.body;

        const categoryExists = await Category.findById(data.category);
        if (!categoryExists) {
            return res.status(404).send({ succes : false, message: 'Category not found'});
        }

        if (data.soldUnits){
            return res.status(403).send({message : 'You cannot add sold units amount'});
        }

        const newProduct = Product(data);
        await newProduct.save();

        return res.send({success : true, message: 'Product added successfully'});
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'General error saving the product', error});
    }
};

//LISTAR PRODUCTOS
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        return res.send({ success: true, products });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General error getting products', error });
    }
};

//BUSCAR PRODUCTO
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('category');
        if (!product) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }
        return res.send({ success: true, product });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General error getting the product', error });
    }
};

//EDITAR PRODUCTO
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (data.category) {
            const categoryExists = await Category.findById(data.category);
            if (!categoryExists) {
                return res.status(404).send({ success: false, message: 'Category not found' });
            }
        }

        if (data.soldUnits){
            return res.status(403).send({message : 'You cannot edit sold units amount'});
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        if (!updatedProduct) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }
        return res.send({ success: true, message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General error updating the product', error });
    }
};

//ELIMINAR PRODUCTO
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }
        
        return res.send({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General error deleting the product', error });
    }
};

//LISTAR PRODUCTOS AGOTADOS
export const getOutOfStockProducts = async (req, res) => {
    try {
        const products = await Product.find({ stock: 0 });
        return res.send({ success: true, products });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General error getting out-of-stock products', error });
    }
};

//LISTAR MÁS VENDIDOS
export const getBestSellingProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ soldUnits: -1 }).limit(10);
        return res.send({ success: true, products });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General error getting best-selling products', error });
    }
};

//LISTAR PRODUCTOS POR CATEGORIA
export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ category: categoryId }).populate('category');
        return res.send({ success: true, products });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General error getting products by category', error });
    }
};

//BUSCAR PRODUCTO POR NOMBRE
export const searchProductsByName = async (req, res) => {
    try {
        const { name } = req.query;
        const products = await Product.find({ name: { $regex: name, $options: 'i' } });
        return res.send({ success: true, products });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General error searching products', error });
    }
};