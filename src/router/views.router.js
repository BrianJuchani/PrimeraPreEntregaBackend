import { Router } from "express";
const router = Router()
import { ProductManager } from "../manager/productManager.js"
// import { CartManager } from "../manager/cartManager.js";
const productManager =new ProductManager("./src/data/products.json")
// const cartManager = new CartManager("./src/data/cart.Json")




router.get('/',async(req,res)=>{
    const products =await productManager.getProducts()
    res.render('home',{products})
})


export default router