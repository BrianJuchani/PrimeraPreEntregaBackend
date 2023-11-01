import { Router } from "express";
const router =Router()

import { CartManager } from "../manager/cartManager.js";
const cartManager = new CartManager("./data/cart.Json")


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

router.get('/cid',async(req,res)=>{
    try {
        const {cid} = req.params
        const carts = await await cartManager.getCartById(Number(cid))
        if(!carts)res.status(404).json({message:'id no encontrado'})
        else res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/:idCart/product/:idProd',async(req,res)=>{
    const {idCart}=req.params
    const {idProd}=req.params
    const cart =await cartManager.saveProductToCart(idCart)
    const prod= await cartManager.saveProductToCart(idProd)
    if(prod){
        await cartManager.saveProductToCart(cart,prod)
        send.status(200).json({message:'productos agregado al carrito'})
    }else{
        send.status(500).json({message:'productos no encontrado'})
    }
})

export default router