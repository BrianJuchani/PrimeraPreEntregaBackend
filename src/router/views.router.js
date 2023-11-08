import { Router } from "express";
const router = Router()
import { ProductManager } from "../manager/productManager.js";
// import { CartManager } from "../manager/cartManager.js";
const productManager =new ProductManager("./src/data/products.Json")
// const cartManager = new CartManager("./src/data/cart.Json")




router.get('/home',async(req,res)=>{
    const products =await productManager.getProducts()
    // const cart = await cartManager.getCarts()

    res.render('home',{products})
})


export default router