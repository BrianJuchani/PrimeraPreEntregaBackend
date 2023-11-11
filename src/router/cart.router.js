import { Router } from "express";
import { ProductManager } from "../manager/productManager.js";
const router =Router()

import { CartManager } from "../manager/cartManager.js";
const cartManager = new CartManager("./src/data/cart.json")
const productManager=new ProductManager('./src/data/products.json')


router.post('/', async(req, res)=>{
    try {
        const carrrito=req.query
        console.log(carrrito)
        const añadir = await cartManager.createCart();
        res.status(200).send(añadir)
    } catch (error) {
        console.log(error.message)
    }
});



router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);

        if (cart) {
            const cartWithQuantity = {
                ...cart,
                products: cart.products.map((product) => ({
                    ...product,
                    quantity: product.quantity || 1,
                })),
            };
            res.status(200).json(cartWithQuantity);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/:idCart/product/:idProd', async (req, res) => {
    try {
        const { idProd, idCart } = req.params;
        const cart = await cartManager.getCartById(Number(idCart));
        const product = await productManager.getProductById(Number(idProd)); 
        if (cart && product) {
            const updatedCart = await cartManager.saveProductToCart(Number(idCart), Number(idProd));
            const addedProduct = updatedCart.products.find(p => p.product === Number(idProd));
            res.status(201).json({ message: 'Product added to cart successfully', addedProduct, cart: updatedCart });
        } else {
            res.status(404).json({ error: 'Cart or Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router
